package com.siran.autojs.javanative.ajlauncher

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Handler
import android.os.Looper
import android.text.TextUtils
import com.siran.autojs.javanative.AutoJs
import com.stardust.app.GlobalAppContext

import com.stardust.autojs.engine.encryption.ScriptEncryption
import com.stardust.autojs.execution.ExecutionConfig
import com.stardust.autojs.execution.ScriptExecution
import com.stardust.autojs.project.ProjectConfig
import com.stardust.autojs.script.JavaScriptFileSource
import com.stardust.autojs.script.JavaScriptSource
import com.stardust.pio.PFiles
import com.stardust.pio.UncheckedIOException
import com.stardust.util.MD5
import com.xzper.autojs.react.BuildConfig

import java.io.File
import java.io.IOException

/**
 * Created by Stardust on 2018/1/24.
 */

open class AssetsProjectLauncher(private val mAssetsProjectDir: String, private val mActivity: Context) {
    private var mProjectDir: String = File(mActivity.filesDir, "scripts/").path
    private var mProjectConfig: ProjectConfig = ProjectConfig.fromAssets(mActivity, ProjectConfig.configFileOfDir(mAssetsProjectDir))
    //private var mMainScriptFile: File = File(mProjectDir, mProjectConfig.mainScriptFile)
    private var mHandler: Handler = Handler(Looper.getMainLooper())
    private var mScriptExecution: ScriptExecution? = null
    private var mCurrentSciptFile: File? = null

    init {
        prepare()
    }

    fun launch(activity: Activity?, subDir: String) {
        mCurrentSciptFile = File(mProjectDir, subDir + "/index.js")
        runScript(null, subDir);
    }


    fun stopScript() {
        if (mScriptExecution != null && mScriptExecution!!.engine != null &&
                !mScriptExecution!!.engine.isDestroyed) {
            try {
                mScriptExecution!!.engine.forceStop();

            }catch (e: Exception) {
                AutoJs.instance.globalConsole.error(e)
            }
        }
    }

    private fun runScript(activity: Activity?, subDir: String) {
        if (mScriptExecution != null && mScriptExecution!!.engine != null &&
                !mScriptExecution!!.engine.isDestroyed) {
            return
        }
        try {
            //val source = JavaScriptFileSource("main", mMainScriptFile)
            val source = JavaScriptFileSource("index", mCurrentSciptFile)
            val config = ExecutionConfig(workingDirectory = File(mProjectDir, subDir).path)
            if (source.executionMode and JavaScriptSource.EXECUTION_MODE_UI != 0) {
                config.intentFlags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_TASK_ON_HOME
            } else {
                config.intentFlags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_TASK_ON_HOME
                //activity?.finish()
            }
            mScriptExecution = AutoJs.instance.scriptEngineService.execute(source, config)
        } catch (e: Exception) {
            AutoJs.instance.globalConsole.error(e)
        }

    }

    //prepare do two things:1,use key to encrypt.  2,copy files from Assets
    private fun prepare() {
        val projectConfigPath = PFiles.join(mProjectDir, ProjectConfig.CONFIG_FILE_NAME)
        val projectConfig = ProjectConfig.fromFile(projectConfigPath)
        //use project != null to ensure files has been decompressed
        if (!BuildConfig.DEBUG && projectConfig != null &&
                TextUtils.equals(projectConfig.buildInfo.buildId, mProjectConfig.buildInfo.buildId)) {
            initKey(projectConfig)
            return
        }
        initKey(mProjectConfig)
        PFiles.deleteRecursively(File(mProjectDir))
        try {
            PFiles.copyAssetDir(mActivity.assets, mAssetsProjectDir, mProjectDir, null)
        } catch (e: IOException) {
            throw UncheckedIOException(e)
        }
    }

    //if script run error,consider encrypt,could initKey every startUp.
    private fun initKey(projectConfig: ProjectConfig) {
        val key = MD5.md5(projectConfig.packageName + projectConfig.versionName + projectConfig.mainScriptFile)
        val vec = MD5.md5(projectConfig.buildInfo.buildId + projectConfig.name).substring(0, 16)
        try {
            val fieldKey = ScriptEncryption::class.java.getDeclaredField("mKey")
            fieldKey.isAccessible = true
            fieldKey.set(null, key)
            val fieldVector = ScriptEncryption::class.java.getDeclaredField("mInitVector")
            fieldVector.isAccessible = true
            fieldVector.set(null, vec)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}

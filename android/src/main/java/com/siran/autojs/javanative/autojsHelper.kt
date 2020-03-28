package com.siran.autojs.javanative

import android.app.Activity
import android.app.Application
import android.graphics.Bitmap
import android.graphics.drawable.Drawable
import android.net.Uri
import android.view.View
import android.widget.ImageView
import android.widget.Toast
import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.SimpleTarget
import com.bumptech.glide.request.transition.Transition
import com.stardust.app.GlobalAppContext
import com.stardust.autojs.core.ui.inflater.ImageLoader
import com.stardust.autojs.core.ui.inflater.util.Drawables
import com.siran.autojs.javanative.ajlauncher.GlobalProjectLauncher
import com.stardust.autojs.core.storage.LocalStorage

object AutojsHelper {
    fun init(app: Application) {
        GlobalAppContext.set(app)
        AutoJs.initInstance(app)
        GlobalKeyObserver.init()
        Drawables.setDefaultImageLoader(object : ImageLoader {
            override fun loadInto(imageView: ImageView, uri: Uri) {
                Glide.with(app)
                        .load(uri)
                        .into(imageView)
            }

            override fun loadIntoBackground(view: View, uri: Uri) {
                Glide.with(app)
                        .load(uri)
                        .into(object : SimpleTarget<Drawable>() {
                            override fun onResourceReady(resource: Drawable, transition: Transition<in Drawable>) {
                                view.background = resource
                            }
                        })
            }

            override fun load(view: View, uri: Uri): Drawable {
                throw UnsupportedOperationException()
            }

            override fun load(view: View, uri: Uri, drawableCallback: ImageLoader.DrawableCallback) {
                Glide.with(app)
                        .load(uri)
                        .into(object : SimpleTarget<Drawable>() {
                            override fun onResourceReady(resource: Drawable, transition: Transition<in Drawable>) {
                                drawableCallback.onLoaded(resource)
                            }
                        })
            }

            override fun load(view: View, uri: Uri, bitmapCallback: ImageLoader.BitmapCallback) {
                Glide.with(app)
                        .asBitmap()
                        .load(uri)
                        .into(object : SimpleTarget<Bitmap>() {
                            override fun onResourceReady(resource: Bitmap, transition: Transition<in Bitmap>) {
                                bitmapCallback.onLoaded(resource)
                            }
                        })
            }
        })
    }
    fun runScript(activity: Activity, file: String) {
        GlobalProjectLauncher.launch(activity, file)
    }
    fun runShanghaoqi(str_acc:String?, str_pswd:String?) {
        if (str_acc == "" || str_pswd == "" || str_acc == null || str_pswd == null) {
            Toast.makeText(GlobalAppContext.get(),"帐号和密码不能为空",Toast.LENGTH_SHORT).show();
            return;
        }
        var storage = LocalStorage(GlobalAppContext.get(), "test_storage");
        storage.put("acc", "\"" + str_acc + "\"");
        storage.put("pswd", "\"" + str_pswd + "\"");
        GlobalProjectLauncher.launch(null, "shanghaoqi")
    }
    fun runCheckPlaying() {
        GlobalProjectLauncher.launch(null, "checkplaying")
    }
}
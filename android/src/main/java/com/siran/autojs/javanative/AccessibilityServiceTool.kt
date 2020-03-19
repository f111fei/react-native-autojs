package com.siran.autojs.javanative

import android.accessibilityservice.AccessibilityService
import android.content.Context
import android.content.Intent
import android.provider.Settings
import android.text.TextUtils
import com.stardust.app.GlobalAppContext
import com.stardust.autojs.core.util.ProcessShell
import java.util.*

object AccessibilityServiceTool {

    private val cmd = "enabled=$(settings get secure enabled_accessibility_services)\n" +
            "pkg=%s\n" +
            "if [[ \$enabled == *\$pkg* ]]\n" +
            "then\n" +
            "echo already_enabled\n" +
            "else\n" +
            "enabled=\$pkg:\$enabled\n" +
            "settings put secure enabled_accessibility_services \$enabled\n" +
            "fi"

    fun enableAccessibilityServiceByRoot(context: Context, accessibilityService: Class<out AccessibilityService>): Boolean {
        val serviceName = context.packageName + "/" + accessibilityService.name
        return try {
            TextUtils.isEmpty(ProcessShell.execCommand(String.format(Locale.getDefault(), cmd, serviceName), true).error)
        } catch (ignored: Exception) {
            false
        }

    }

    fun enableAccessibilityServiceByRootAndWaitFor(context: Context, timeOut: Long): Boolean {
        if (enableAccessibilityServiceByRoot(context, com.stardust.view.accessibility.AccessibilityService::class.java)) {
            com.stardust.view.accessibility.AccessibilityService.waitForEnabled(timeOut)
            return true
        }
        return false
    }

    fun goToAccessibilitySetting() {
        GlobalAppContext.get().startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
    }

}
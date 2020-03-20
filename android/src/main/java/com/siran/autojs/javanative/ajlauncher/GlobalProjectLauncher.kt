package com.siran.autojs.javanative.ajlauncher

import android.annotation.SuppressLint
import com.stardust.app.GlobalAppContext

@SuppressLint("StaticFieldLeak")
object GlobalProjectLauncher: AssetsProjectLauncher("scripts", GlobalAppContext.get())
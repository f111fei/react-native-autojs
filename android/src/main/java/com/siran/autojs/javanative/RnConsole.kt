package com.siran.autojs.javanative
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext
import android.util.Log
import com.stardust.autojs.core.console.ConsoleImpl
import com.xzper.autojs.react.RNAutojsModule

class RnConsole : ConsoleImpl.LogListener{
    override fun onNewLog(logEntry: ConsoleImpl.LogEntry) {
        //Log.i("MyOwnLogConsole", logEntry.content.toString())
        var params:WritableMap  = Arguments.createMap()
        params.putString("eventProperty", logEntry.content.toString())

        var reactContext: ReactContext = (RNAutojsModule::getmReactContext)()
        sendEvent(reactContext, "EventReminder", params);
    }

    override fun onLogClear() {

    }

    private fun sendEvent(reactContext: ReactContext, eventName:String , params:WritableMap ) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
    }

    companion object {
        var globalRnConsolt:RnConsole = RnConsole()
    }
}
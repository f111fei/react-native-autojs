package com.xzper.autojs.react;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.Promise;
import com.siran.autojs.javanative.ajlauncher.GlobalProjectLauncher;
import com.siran.autojs.javanative.AutojsHelper;

import static java.lang.Thread.sleep;

@ReactModule(name=RNAutojsModule.MODULE_NAME)
public class RNAutojsModule extends ReactContextBaseJavaModule {

  private static int mCheckPlayingResult;
  private static boolean resultMutex;
  public static final String MODULE_NAME = "RNAutojsModule";

  public RNAutojsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return MODULE_NAME;
  }

  @ReactMethod
  public void run(String script) {
    // TODO: 2020/1/5
    GlobalProjectLauncher.INSTANCE.launch(null, script);
    Log.i("run", "get in java:" + script);
  }

  @ReactMethod
  public void shanghao(String username, String password) {
    // TODO: 2020/1/5
    Log.i("run", "get in shanghaoqi call");
    AutojsHelper.INSTANCE.runShanghaoqi(username, password);
  }

  @ReactMethod
  public void checkplaying(Promise promise) {
    // TODO: 2020/1/5
    Log.i("run", "get in checkplaying call");
    //AutojsHelper.INSTANCE.runShanghaoqi();
    try {
      int mCount = 0;
      resultMutex = false;

      //call script;
      AutojsHelper.INSTANCE.runCheckPlaying();

      //script will change result and mutex async

      while(!resultMutex && mCount < 30) {
        sleep(300);
        ++mCount;
      }

      if (resultMutex) {
        promise.resolve(mCheckPlayingResult);
      } else {
        promise.reject("checkplaying", "time out");
      }
    } catch(Exception e) {
      String stacks = "";
      StackTraceElement[] curstack = e.getStackTrace();
      for (int i = 0;i < curstack.length; i++) {
        stacks += curstack[i].toString() + '\n';
      }
      promise.reject( e.getMessage(), stacks);
    }
  }

  public static void setCheckPlayResult(int result) {
    mCheckPlayingResult = result;
    resultMutex = true;

  }

}

package com.xzper.autojs.react;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.siran.autojs.javanative.ajlauncher.GlobalProjectLauncher;
import com.siran.autojs.javanative.AutojsHelper;

import static java.lang.Thread.sleep;

@ReactModule(name=RNAutojsModule.MODULE_NAME)
public class RNAutojsModule extends ReactContextBaseJavaModule {

  private static int mCheckPlayingResult;
  private static boolean resultMutex;
  public static final String MODULE_NAME = "RNAutojsModule";
  private static ReactApplicationContext mReactContext;

  public RNAutojsModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mReactContext = reactContext;
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
    setScriptStat("准备就绪");
  }

  @ReactMethod
  public void stopScript() {
    Log.i("run", "get in stopScript call");
    setScriptStat("脚本已停止");
    AutojsHelper.INSTANCE.stopScript();
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

  @ReactMethod
  public void loginByTokens(String openid,String atoken, String ptoken) {

    getCurrentActivity();

    Intent string2 = getCurrentActivity().getPackageManager().getLaunchIntentForPackage("com.tencent.tmgp.sgame");

    if (string2 == null) {
      Toast.makeText(mReactContext, "未找到游戏，请先安装游戏", Toast.LENGTH_SHORT).show();
      return;
    }
    string2.setFlags(0x10000000 | 0x20000000);
    Bundle bundle = new Bundle();
    bundle.putString("platform", "qq_m");
    //bundle.putString("current_uin", object.getString("current_uin"));
    bundle.putString("current_uin", openid);//same with openid
    bundle.putString("launchfrom", "sq_gamecenter");
    bundle.putString("preAct_time", "");
    bundle.putString("platformdata", "");
    bundle.putString("fling_code_key", "");
    //bundle.putString("ptoken", object.getString("ptoken"));
    bundle.putString("ptoken", ptoken);
    bundle.putString("preAct", "GameCenterActivity");
    //bundle.putString("openid", object.getString("openid"));
    //bundle.putString("atoken", object.getString("atoken"));
    bundle.putString("openid", openid);
    bundle.putString("atoken", atoken);
    bundle.putString("gamedata", "");
    bundle.putString("fling_action_key", "");
    string2.putExtras(bundle);
    getCurrentActivity().startActivity(string2);
  }

  public static void setCheckPlayResult(int result) {
    mCheckPlayingResult = result;
    resultMutex = true;

  }

  public static ReactApplicationContext getmReactContext() {
    return mReactContext;
  }

  public static void setScriptStat(String stat) {
    WritableMap params  = Arguments.createMap();
    params.putString("statProperty", stat);
    mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("EventReminder", params);
  }

}

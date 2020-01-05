package com.xzper.autojs.react;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name=RNAutojsModule.MODULE_NAME)
public class RNAutojsModule extends ReactContextBaseJavaModule {

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
  }
}

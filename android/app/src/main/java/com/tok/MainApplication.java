package com.tok;

import android.app.Application;

import com.example.hotupdate.HotUpdateManager;
import com.facebook.react.ReactApplication;
import com.example.hotupdate.HotUpdatePackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.named.fs.FSPackage;
import com.named.putobject.PutObjectPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;
import com.imagepicker.ImagePickerPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new HotUpdatePackage(),
            new FastImageViewPackage(),
            new FSPackage(),
            new PutObjectPackage(),
            new SplashScreenReactPackage(),
            new RNCameraPackage(),
            new ImagePickerPackage(),
            new RNSpinkitPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Nullable
    @Override
    protected String getJSBundleFile() {
      ReactApplicationContext reactCtx = new ReactApplicationContext(getApplicationContext());
      return new HotUpdateManager(reactCtx).getBundlePath();
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

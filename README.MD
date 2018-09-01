1.制作bundle：
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
2.编译：react-native run-android --variant=release
3.打包：cd android && ./gradlew assembleRelease

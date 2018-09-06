basepath=$(cd `dirname $0`; pwd)
cd "$basepath"
chown -R zeke ../app
rm -f android/app/src/main/assets/index.android.bundle
rm -f android/app/src/main/assets/index.android.bundle.meta
rm -f android/app/build/intermediates/assets/debug/index.android.bundle
rm -f android/app/build/intermediates/assets/debug/index.android.bundle.meta
rm -f android/app/build/intermediates/assets/release/index.android.bundle
rm -f android/app/build/intermediates/assets/release/index.android.bundle.meta
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
#react-native run-android --variant=release
cd android
./gradlew assembleRelease
cd ../
cp android/app/build/outputs/apk/app-release.apk app-release.apk
chown -R zeke ../app

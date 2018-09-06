basepath=$(cd `dirname $0`; pwd)
cd "$basepath"
chown -R zeke ../app
rm -f android/app/src/main/assets/index.android.bundle
rm -f android/app/src/main/assets/index.android.bundle.meta
rm -f android/app/build/intermediates/assets/debug/index.android.bundle
rm -f android/app/build/intermediates/assets/debug/index.android.bundle.meta
rm -f android/app/build/intermediates/assets/release/index.android.bundle
rm -f android/app/build/intermediates/assets/release/index.android.bundle.meta
rm android/app/build/outputs/apk/app-debug.apk 
rm app-debug.apk
rm android/app/build/outputs/apk/app-release.apk 
rm app-release.apk
chown -R zeke ../app

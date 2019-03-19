import firebase from "./firebase";
import "firebase/auth";

import bus from "./bus";

// Signs-in Friendly Chat.
function signIn() {
  bus.$emit("loader.on", "กำลังลงชื่อเข้าใช้");

  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      bus.$emit("loader.off");
    })
    .catch(err => {
      bus.$emit("loader.off");
      switch (err.code) {
        case "auth/popup-closed-by-user":
          bus.$emit(
            "dialog.on",
            "น้องได้ทำการปิดหน้าต่างสำหรับเข้าสู่ระบบด้วย Facebook ไป จึงทำให้ไม่สามารถเข้าใช้ระบบสมัครได้"
          );
          break;
        case "auth/unauthorized-domain":
          bus.$emit(
            "dialog.on",
            "น้องไม่สามารถลงชื่อเข้าใช้ได้จากเว็บนี้ โปรดใช้เว็บ https://reg.cesc.kmi.tl/ แทน เพื่อการลงชื่อเข้าใช้สำหรับสมัตรเข้าค่าย"
          );
          break;
        default:
          console.error(err);
          bus.$emit(
            "dialog.on",
            "พี่ๆขออภัยด้วย ระบบเกิดข้อผิดพลาด  " + err.code
          );
      }
    });
}

function signOut() {
  firebase.auth().signOut();
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    if (typeof window.analytics !== "undefined") {
      window.analytics.identify(user.uid, {
        displayName: user.displayName,
        name: user.displayName,
        email: user.email
      });
    }
  }

  bus.$emit("user.change", !!user);
}

// Initiate firebase auth.
function initFirebaseAuth() {
  bus.$emit("loader.on");

  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);

  // Get result from facebook redirect
  firebase.auth().getRedirectResult();

  bus.$emit("loader.off");
}

// initialize Firebase
initFirebaseAuth();

export { signIn, signOut };

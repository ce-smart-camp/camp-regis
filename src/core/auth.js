import firebase from "./firebase";
import "firebase/auth";

import bus from "./bus";

// Signs-in Friendly Chat.
function signIn(useRedirect) {
  bus.$emit("loader.on", "กำลังลงชื่อเข้าใช้");

  if (useRedirect !== true) {
    useRedirect = navigator.userAgent.indexOf("Line") > -1;
  }

  var provider = new firebase.auth.FacebookAuthProvider();
  var loginM;
  if (useRedirect === true)
    loginM = firebase.auth().signInWithRedirect(provider);
  else loginM = firebase.auth().signInWithPopup(provider);

  loginM
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
        case "auth/popup-blocked":
          signIn(true);
          break;
        default:
          bus.$emit(
            "dialog.on",
            "พี่ๆขออภัยด้วย ระบบเกิดข้อผิดพลาด  " + err.code
          );
          window.Raven.captureException(err);
          throw err;
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

    if (typeof window.gtag !== "undefined") {
      window.gtag("set", {
        user_id: user.uid,
        displayName: user.displayName,
        name: user.displayName,
        email: user.email
      });
    }

    if (typeof window.FS !== "undefined") {
      window.FS.identify(user.uid, {
        displayName: user.displayName,
        email: user.email
      });
    }

    if (typeof window.Sentry !== "undefined") {
      window.Sentry.configureScope(scope => {
        scope.setUser({
          id: user.uid,
          email: user.email
        });
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

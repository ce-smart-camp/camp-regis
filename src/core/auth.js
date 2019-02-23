import firebase from "./firebase";
import "firebase/auth";

import bus from "./bus";

// Signs-in Friendly Chat.
function signIn() {
  bus.$emit("dialogOn", "กำลังลงชื่อเข้าใช้");

  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    bus.$emit("user");

    // eslint-disable-next-line
    FS.identify(user.uid, {
      displayName: user.displayName,
      email: user.email,
      // TODO: Add your own custom user variables here, details at
      // http://help.fullstory.com/develop-js/setuservars
      reviewsWritten_int: 14
    });
  } else {
    signIn();
  }
}

// Initiate firebase auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);

  // Get result from facebook redirect
  firebase.auth().getRedirectResult();
}

// initialize Firebase
initFirebaseAuth();

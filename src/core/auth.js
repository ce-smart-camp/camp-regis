import firebase from "./firebase";

// Signs-in Friendly Chat.
function signIn() {
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithRedirect(provider);
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    console.log("observer", user);
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

// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCwCgOFIuhCD5R6GoY9BW0bMZ7SIhF579c",
  authDomain: "bldr-io.firebaseapp.com",
  projectId: "bldr-io",
  storageBucket: "bldr-io.appspot.com",
  messagingSenderId: "378041336280",
  appId: "1:378041336280:web:82500482faf4e879fe72ad",
  measurementId: "G-ZB2WGJ9QSQ"
};

firebase.initializeApp(config);


// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export const Auth = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [user, setUser] = useState({})

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      setUser(user)
      
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (user &&
    Object.prototype.hasOwnProperty.call(user, 'providerData')
  ) {
    console.log(user.providerData)
  }

  if (!isSignedIn) {
    return (
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }


  return (
    <>
      {props.children}
    </>
  );
}

export default Auth;
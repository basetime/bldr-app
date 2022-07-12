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

export const Auth = (props) => {
    let isSignedIn = false;
    let user;

    firebase.auth().onAuthStateChanged(user => {
      isSignedIn = !!user;
      user = user
    });
    
  if (user &&
    Object.prototype.hasOwnProperty.call(user, 'providerData')
  ) {
    console.log(user.providerData)
    unregisterAuthObserver()

    return {
      isSignedIn,
      user
    }

  } else {
    return {
      isSignedIn
    }
  }

  // if (!isSignedIn) {
  //   return (
  //     <div>
  //       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  //     </div>
  //   );
  // }


  // return (
  //   <>
  //     {props.children}
  //   </>
  // );
}

export default Auth;
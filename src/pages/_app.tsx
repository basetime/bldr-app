import '../../styles/globals.css'
import { AppProps } from 'next/app'
import AuthContext from '../context/AuthContext'
import { useState, useMemo } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({})

  const authContext = useMemo(() => ({ user, setUser }), [user, setUser])

  // TODO move Firebase fetched from serverside
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

  return (
    <AuthContext.Provider value={authContext}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </AuthContext.Provider>
  )
}

export default MyApp

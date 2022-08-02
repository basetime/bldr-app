import '../../styles/globals.css'
import { AppProps } from 'next/app'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { CookiesProvider } from 'react-cookie';
import AuthContext from '../context/AuthContext'
import GlobalContext from '../context/GlobalContext'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const [sessionCookie] = useCookies(['bldr_session']);
  const [user, setUser] = useState({})
  const [global, setGlobal] = useState({
    env: '',
    apiBase: '',
    docVersion: 1
  })

  const authContext = useMemo(() => ({ user, setUser }), [user, setUser])
  const globalContext = useMemo(() => ({ global, setGlobal }), [global, setGlobal])

  // Set Global vars
  // Get Initial Packages
  useEffect(() => {
    let apiBase: string;
    let env: string = process.env.NODE_ENV || 'production';

    if (env === 'development') {
      env = 'development';
      apiBase = 'http://127.0.0.1:5001/bldr-io/us-central1/bldrAPI/api/v1';
    } else {
      env = 'production';
      apiBase = 'https://us-central1-bldr-io.cloudfunctions.net/bldrAPI/api/v1';
    }

    setGlobal((prevState) => {
      return {
        ...prevState,
        env,
        apiBase,
      }
    })

    if(sessionCookie && sessionCookie.bldr_session){
      setUser({
        isLoggedIn: true,
        isNewUser: false,
        profile: sessionCookie.bldr_session
      })
    }
  }, [])


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
    <GlobalContext.Provider value={globalContext}>
      <AuthContext.Provider value={authContext}>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </AuthContext.Provider>
    </GlobalContext.Provider>
  )
}

export default MyApp

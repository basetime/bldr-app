import '../../styles/globals.css'
// import '../../styles/forms.css'

import { AppProps } from 'next/app'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { CookiesProvider } from 'react-cookie';
import AuthContext from '../context/AuthContext'
import GlobalContext from '../context/GlobalContext'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const [sessionCookie] = useCookies(['bldr_session']);
  const [user, setUser] = useState({})
  const [global, setGlobal] = useState({
    env: '',
    apiBase: '',
    pkgs: {}
  })

  const authContext = useMemo(() => ({ user, setUser }), [user, setUser])
  const globalContext = useMemo(() => ({ global, setGlobal }), [global, setGlobal])

  const getPackages = useCallback(async (apiBase: string) => {
    const packageRequest = await axios.get(`${apiBase}/package`)
    return packageRequest.data
  }, [])

  const checkUserCookie = useCallback(() => {
    if (!!sessionCookie.bldr_session) {
      setUser({
        isLoggedIn: true,
        isNewUser: false,
        profile: sessionCookie.bldr_session
      })
      console.log(!!sessionCookie.bldr_session)
    } else {
      
    }
    //@ts-ignore
  }, [user, user.isLoggedIn])

  //@ts-ignore
  useEffect(() => checkUserCookie(), [user, user.isLoggedIn])

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
      apiBase = '/api/v1';
    }

    getPackages(apiBase)
      .then(response => {

        setGlobal({
          env,
          apiBase,
          pkgs: response
        })
      })
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

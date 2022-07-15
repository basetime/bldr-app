import '../../styles/globals.css'
// import '../../styles/forms.css'

import { AppProps } from 'next/app'
import { useState, useMemo, useEffect } from 'react'
import { CookiesProvider } from 'react-cookie';
import AuthContext from '../context/AuthContext'
import GlobalContext from '../context/GlobalContext'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({})
  const [global, setGlobal]= useState({
    env: 'production',
    apiBase: '/api/v1'
  })

  const authContext = useMemo(() => ({ user, setUser }), [user, setUser])
  const globalContext = useMemo(() => ({ global, setGlobal }), [global, setGlobal])

  useEffect(() => {
    if(window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')){
      setGlobal({
        env: 'development',
        apiBase: 'http://127.0.0.1:5001/bldr-io/us-central1/bldrAPI/api/v1'
      })
    } else {
      setGlobal({
        env: 'production',
        apiBase: '/api/v1'
      })
    }
  }, [])


  useEffect(() => {
    const getPackages = async () => await axios.get(`${global.apiBase}/packages`)
  })

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

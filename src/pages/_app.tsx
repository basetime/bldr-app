import '../../styles/globals.css'
import { AppProps } from 'next/app'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { CookiesProvider } from 'react-cookie';
import AuthContext from '../context/AuthContext'
import GlobalContext from '../context/GlobalContext'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useCookies } from 'react-cookie';
import { GoogleAnalytics } from "nextjs-google-analytics";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useRouter } from 'next/router';
import { config } from '../../constants'

function MyApp({ Component, pageProps }: AppProps) {
  const [sessionCookie] = useCookies(['bldr_session']);
  const [user, setUser] = useState({})
  const [global, setGlobal] = useState({
    env: '',
    apiBase: '',
    host: '',
    firebaseConfig: {},
    docVersion: 1,
    mobileDocNav: {
      type: 'item',
      label: 'Getting Started',
      icon: <PlayCircleOutlineIcon />,
      doc: 'getting-started'
    },
    esp: 'sfmc'
  })

  const authContext = useMemo(() => ({ user, setUser }), [user, setUser])
  const globalContext = useMemo(() => ({ global, setGlobal }), [global, setGlobal])
  const router = useRouter();

  // Set Global vars
  // Get Initial Packages
  useEffect(() => {
    let apiBase: string;
    let env: string = process.env.NODE_ENV || 'production';
    let host: string;
    let firebaseConfig: any;

    if (window.location.href.includes('localhost')) {
      env = 'development';
      host = window.location.href;
    } else {
      env = 'production';
      host = window.location.href;
    }

    apiBase = config.apiBase;

    setGlobal((prevState) => {
      return {
        ...prevState,
        env,
        apiBase,
        host
      }
    })

    if (sessionCookie && sessionCookie.bldr_session) {
      setUser({
        isLoggedIn: true,
        isNewUser: false,
        profile: sessionCookie.bldr_session
      })
    }
  }, [])


  //  firebase.initializeApp({
  //     apiKey: "AIzaSyASzIycxpqkZBy00w_8KtO83K1hvA29iSM",
  //     authDomain: "bldr-io-dev.firebaseapp.com",
  //     projectId: "bldr-io-dev",
  //     storageBucket: "bldr-io-dev.appspot.com",
  //     messagingSenderId: "989486265725",
  //     appId: "1:989486265725:web:d673a81aeeec1e34578814"
  //   })
    

  // TODO move Firebase fetched from serverside
  // Configure Firebase
  // const config = {
  //   apiKey: "AIzaSyCwCgOFIuhCD5R6GoY9BW0bMZ7SIhF579c",
  //   authDomain: "bldr-io.firebaseapp.com",
  //   projectId: "bldr-io",
  //   storageBucket: "bldr-io.appspot.com",
  //   messagingSenderId: "378041336280",
  //   appId: "1:378041336280:web:82500482faf4e879fe72ad",
  //   measurementId: "G-ZB2WGJ9QSQ"
  // };

  console.log(config)
  firebase.initializeApp(config.firebase)

  return (
    <GlobalContext.Provider value={globalContext}>
      <AuthContext.Provider value={authContext}>
        <CookiesProvider>
          <GoogleAnalytics />
          <Component {...pageProps} />
        </CookiesProvider>
      </AuthContext.Provider>
    </GlobalContext.Provider>
  )
}

export default MyApp

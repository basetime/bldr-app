import React, { useContext } from 'react'
import {useRouter} from 'next/router'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Layout from '../../layouts/MainLayout'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import AuthContext from '../../../context/AuthContext'

export const Login = () => {
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter();
  const returnURL = router.query && router.query.returnTo;

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
      signInSuccessWithAuthResult: function (authResult: any, returnURL: any) {
        console.log('authResult', authResult)
        if (Object.prototype.hasOwnProperty.call(authResult, 'user')) {
          setUser({
            isLoggedIn: true,
            user: authResult.user._delegate.providerData
          })

          //TODO set session cookie
        }
        return false;
      }
    },
  }

  return (
    <Layout>
      <Box sx={{ marginTop: '10rem' }}>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Box>
    </Layout>
  )

}

import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Layout from '../../layouts/MainLayout'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import AuthContext from '../../../context/AuthContext'
import SectionWrapper from '../../../components/pages/SectionWrapper'
import CircularProgress from '@mui/material/CircularProgress';

export const Login = () => {
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter();

    // Configure FirebaseUI.
    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: function (authResult: any, returnURL: any) {
          console.log('authResult', authResult)

          if (Object.prototype.hasOwnProperty.call(authResult, 'user')) {
            setUser({
              isLoggedIn: true,
              ...authResult.user._delegate.providerData[0],
              uid: authResult.user._delegate.uid
            })
            //TODO set session cookie
          }
          return false;
        }
      },
    }


    return (
      <SectionWrapper elevation={4}>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </SectionWrapper>
    )


}

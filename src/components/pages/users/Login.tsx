import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Layout from '../../layouts/MainLayout'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import AuthContext from '../../../context/AuthContext'
import SectionWrapper from '../../../components/pages/SectionWrapper'
import { useCookies } from 'react-cookie';

export const Login = () => {
  const [cookies, setCookie] = useCookies(['bldr_session']);
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: function (authResult: any, returnURL: any) {
        console.log('authResult', authResult)

        if (Object.prototype.hasOwnProperty.call(authResult, 'user')) {
          let provider = authResult.additionalUserInfo.providerId || '';
          let authUserData = authResult.user.multiFactor.user || {};
          let userObject;
          let profile;

          // console.log(authUserData.uid)
          switch (provider) {
            case 'google.com':
              userObject = {
                uid: authUserData.uid,
                photoURL: authUserData.photoURL,
                provider
              }
              break;
            case 'github.com':
              profile = authResult.additionalUserInfo.profile;

              userObject = {
                uid: authUserData.uid,
                github: {
                  url: profile.html_url,
                  repos: profile.repos_url,
                  gists: profile.gists_url
                },
                provider
              }
              break;
            case 'password':
              userObject = {
                uid: authUserData.uid,
                photoURL: '',
                provider
              }
              break;
          }

          setUser({
            isLoggedIn: true,
            profile: userObject
          })

          let date = new Date();
          date.setDate(date.getDate() + 3);

          //@ts-ignore
          setCookie('bldr_session', JSON.stringify(userObject), { 
            path: '/',
            expires: date,
            secure: true,
            sameSite: true
          });
          //TODO set session cookie
        }
        return false;
      }
    },
  }


  return (
    <>
      {!user.isLoggedIn &&
        <SectionWrapper elevation={4}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </SectionWrapper>
      }
    </>
  )


}

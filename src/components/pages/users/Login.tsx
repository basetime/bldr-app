import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Layout from '../../layouts/MainLayout'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import AuthContext from '../../../context/AuthContext'
import GlobalContext from '../../../context/GlobalContext'
import SectionWrapper from '../SectionWrapper'
import { useCookies } from 'react-cookie';
import axios from 'axios';

export const Login = () => {
  const [cookies, setCookie] = useCookies(['bldr_session']);
  const { user, setUser } = useContext(AuthContext)
  const { global } = useContext(GlobalContext)

  const router = useRouter();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: function (authResult: any) {
        console.log('authResult', authResult)

        if (Object.prototype.hasOwnProperty.call(authResult, 'user')) {
          let additionalUserData = authResult.additionalUserInfo;
          let provider = additionalUserData.providerId || '';
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
                photoURL: profile.avatar_url,
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
                displayName: '',
                photoURL: '',
                github: {
                  url: '',
                  repos: '',
                  gists: ''
                },
                provider
              }
              break;
          }

          setUser({
            isLoggedIn: true,
            isNewUser: additionalUserData.isNewUser,
            profile: userObject
          })

          let sessionExpire = new Date();
          sessionExpire.setDate(sessionExpire.getDate() + 3);
          //@ts-ignore
          setCookie('bldr_session', JSON.stringify(userObject), {
            path: '/',
            expires: sessionExpire,
            secure: true,
            sameSite: 'strict'
          });


          let userConfig = new Date();
          userConfig.setDate(userConfig.getDate() + 3);
          //@ts-ignore
          setCookie('bldr_session', JSON.stringify(userObject), {
            path: '/',
            expires: sessionExpire,
            secure: true,
            sameSite: 'strict'
          });

        }

        useEffect(() => {
          const createProfile = async () => {
            const createRequest = await axios.post(`${global.apiBase}/user/create`, user.profile)
            console.log(createRequest)
          }
          if (user.isLoggedIn && user.isNewUser) {
            createProfile()
          }
          console.log('trigger user')
        }, [user, user.isLoggedIn])


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

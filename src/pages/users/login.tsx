import Layout from '../../components/layouts/MainLayout'
import { NextPage } from 'next'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Section from '../../components/pages/Section';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PublicSubmit from '../../components/pages/submit/PublicSubmit';
import { Login } from '../../components/pages/users/Login'
import axios from 'axios';
// import { Auth } from '../components/authentication/FirebaseAuth'
import { useAuthContext } from '../../context/useAuthContext';
import { userInfo } from 'os';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import AuthContext from '../../context/AuthContext'

const LoginPage: NextPage = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter();

  if (user.isLoggedIn) {
      const returnURL = router.query && `${router.query.returnTo}` || '/'
      router.push(returnURL)
  }

  return (
    <Layout>
      <Login />
    </Layout >
  )
}


export default LoginPage
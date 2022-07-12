import Layout from '../components/layouts/MainLayout'
import { NextPage } from 'next'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Section from '../components/pages/Section';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PublicSubmit from '../components/pages/submit/PublicSubmit';
import Submit from '../components/pages/submit/Submit'
import axios from 'axios';
// import { Auth } from '../components/authentication/FirebaseAuth'
import { useAuthContext } from '../context/useAuthContext';
import { userInfo } from 'os';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import AuthContext from '../context/AuthContext'
import {useNavigate} from 'react-router-dom';
import {Login} from '../components/pages/users/Login'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));


const Index: NextPage = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter();

  if (
    (Object.prototype.hasOwnProperty.call(user, 'isLoggedIn') &&
    user.isLoggedIn === false) || 
    !Object.prototype.hasOwnProperty.call(user, 'isLoggedIn')
  ) {

    return <Login />
    // useEffect(()=> {
    //   router.push({
    //     pathname: '/users/login',
    //     query: { returnTo: router.route}
    //   })
    // }, [])
  }


    return (
      <Layout>
        <Box
          sx={{
            marginTop: 25
          }}
        >
          <Submit />
        </Box>
      </Layout >

    )
}


export default Index
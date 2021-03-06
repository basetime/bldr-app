import Layout from '../../components/layouts/MainLayout'
import { NextPage } from 'next'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PublicSubmit from '../../components/pages/submit/PublicSubmit';
import Submit from '../../components/pages/submit/Submit'
import axios from 'axios';
// import { Auth } from '../components/authentication/FirebaseAuth'
import { useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));


const SubmitPage: NextPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <Layout>
        {
          user && user.isLoggedIn ? 
          <Submit /> :
          <PublicSubmit />
        }
    </Layout >

  )
}


export default SubmitPage
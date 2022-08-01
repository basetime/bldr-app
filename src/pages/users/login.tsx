import { useEffect } from 'react'
import Layout from '../../components/layouts/MainLayout'
import { NextPage } from 'next'
import { Login } from '../../components/pages/users/Login'
import { useRouter } from 'next/router'
import AuthContext from '../../context/AuthContext'
import GlobalContext from '../../context/GlobalContext'
import {useContext} from 'react'
import { Typography } from '@mui/material';
import axios from 'axios'

const LoginPage: NextPage = () => {
  const { user } = useContext(AuthContext)
  const { global } = useContext(GlobalContext)
  const router = useRouter();

  if (user.isLoggedIn) {
      const returnURL = router.query && `${router.query.returnTo}` || '/'
      router.push(returnURL)
  }

  useEffect(() => {
    const createProfile = async () => {
      const createRequest = await axios.post(`${global.apiBase}/user/create`, user.profile)
    }

    if (user.isLoggedIn && !user.isNewUser) {
      createProfile()
    }
  }, [user.isLoggedIn])

  const useHandleCookieRedirect = (returnURL: string) => {
    console.log('handle cookie', returnURL)
    router.push(returnURL)
  }

  return (
    <Layout>
      <Login onCookieRedirect={useHandleCookieRedirect}/>
    </Layout >
  )
}


export default LoginPage
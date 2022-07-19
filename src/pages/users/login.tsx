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
      console.log(returnURL)
      router.push(returnURL)
  }

  useEffect(() => {
    const createProfile = async () => {
      const createRequest = await axios.post(`${global.apiBase}/user/create`, user.profile)
      console.log(createRequest)
    }
    // if (user.isLoggedIn && !user.isNewUser) {
    if (user.isLoggedIn) {
      createProfile()
    }
    console.log('trigger user')
  }, [user.isLoggedIn])

  return (
    <Layout>
      <Login />
    </Layout >
  )
}


export default LoginPage
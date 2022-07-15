import Layout from '../../components/layouts/MainLayout'
import { NextPage } from 'next'
import { Login } from '../../components/pages/users/Login'
import { useRouter } from 'next/router'
import AuthContext from '../../context/AuthContext'
import {useContext} from 'react'

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
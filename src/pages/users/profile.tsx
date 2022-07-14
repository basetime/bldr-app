import Layout from '../../components/layouts/MainLayout'
import { NextPage } from 'next'
import  Profile  from '../../components/pages/users/profile/Profile'
import { useRouter } from 'next/router'
import AuthContext from '../../context/AuthContext'
import {useContext, useEffect} from 'react'
import { RouteGuard } from '../../components/functional/RouteGuard'

const ProfilePage: NextPage = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {
    const returnTo = '/users/profile';
    if (
      (Object.prototype.hasOwnProperty.call(user, 'isLoggedIn') &&
        user.isLoggedIn === false) ||
      !Object.prototype.hasOwnProperty.call(user, 'isLoggedIn')
    ) {
      router.push(`/users/login?returnTo=${returnTo}`)
    }
  }, [user, user.isLoggedIn])
  

  return (
    <Layout>
      {user.isLoggedIn && <Profile />}
    </Layout >
  )
}


export default ProfilePage
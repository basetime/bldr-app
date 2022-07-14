import { useContext } from 'react'
import {useRouter} from 'next/router'
import AuthContext from '../../context/AuthContext'


export const RouteGuard = (returnTo: string) => {
  const { user } = useContext(AuthContext)
  const router = useRouter();

  if (
    (Object.prototype.hasOwnProperty.call(user, 'isLoggedIn') &&
      user.isLoggedIn === false) ||
    !Object.prototype.hasOwnProperty.call(user, 'isLoggedIn')
  ) {
    return router.push(`/users/login?${returnTo}`)
  }

}

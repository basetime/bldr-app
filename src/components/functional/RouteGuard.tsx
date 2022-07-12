import React, { useContext, ReactNode } from 'react'

import { Login } from '../pages/users/Login'
import AuthContext from '../../context/AuthContext'

interface Props {
  children: ReactNode
}

export const RouteGuard = (props: Props) => {
  const { user } = useContext(AuthContext)

  if (
    (Object.prototype.hasOwnProperty.call(user, 'isLoggedIn') &&
      user.isLoggedIn === false) ||
    !Object.prototype.hasOwnProperty.call(user, 'isLoggedIn')
  ) {

    return <Login />
  }

  return (
    <>
      {props.children}
    </>
  )
}

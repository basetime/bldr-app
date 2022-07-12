import { useState, useEffect } from 'react';
import AuthContext from './AuthContext'
import { Auth } from '../components/authentication/FirebaseAuth2'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import Layout from '../components/layouts/MainLayout'
import 'firebase/compat/auth';
import { Box } from '@mui/system';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const isAuth = Auth()
  //   if (isAuth.isSignedIn) {
  //     setUser({
  //       isSignedIn: isAuth.isSignedIn,
  //       user: isAuth.user
  //     })
  //   } else {
  //     setUser({
  //       isSignedIn: isAuth.isSignedIn,
  //       user: {}
  //     })
  //   }

  // }, []);

  return (
    // <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
  );
};
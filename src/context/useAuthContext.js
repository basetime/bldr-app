import AuthContext from "./AuthContext";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import Layout from '../components/layouts/MainLayout'
import 'firebase/compat/auth';
import { Box } from '@mui/system';
import { useContext } from 'react'

export const useAuthContext = () => {
  const user = useContext(AuthContext);
  return user
};
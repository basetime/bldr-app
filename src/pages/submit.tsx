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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));


  const Index: NextPage = () => {
  

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
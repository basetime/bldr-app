import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProfileNavigation from './ProfileNavigation';
import { ProfileNavigationOptions } from './ProfileNavigationOptions'
import { Typography } from '@mui/material';
import ProfileForm from './forms/ProfileForm'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export default function Profile() {


  const [profileSection, setProfileSection] = useState('profile');

  const handleProfileNavigation = (event: any) => {
    setProfileSection(event.target.outerText)
  }

  let render;
  switch(profileSection){
    case 'profile':
      render = <ProfileForm />
    break
    case 'packages':
      render = <Typography>Packages</Typography>
    break
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>

          <ProfileNavigation 
            handleProfileNavigation={handleProfileNavigation} 
            navigationItems={ProfileNavigationOptions} 
          />

        </Grid>
        <Grid item xs={12} md={8}>
          <Item>{render}</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DocumentationNavigation from '../pages/documentation/DocumentationNavigation'

type Props = {
  children: ReactNode;
  meta?: any;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Layout = ({
  children,
  meta
}: Props) => (
  <>
    <Grid container spacing={20} sx={{display: 'flex', justifyContent: 'center'}}>
      <Grid item xs={3}>
        <DocumentationNavigation />
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
    </Grid>
  </>
);

export default Layout
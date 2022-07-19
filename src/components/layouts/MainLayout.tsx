import React, { ReactNode } from 'react';
import NavigationBar from './top_navigation/NavigationBar'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "@fontsource/roboto";

type Props = {
  children: ReactNode;
  title?: string;
  maxWidth?: object 
};

const Layout = ({
  maxWidth,
  children
}: Props) => (
  <>
    <Container
      {...maxWidth}
      sx={{
        overflowX: 'hidden',
        position: {
          xs: 'absolute',
          md: 'static'
        }
      }}
    >
      <NavigationBar />
      <Box
       sx={{
        marginTop: 20
      }}
      >
        {children}
      </Box>
    </Container>
  </>
);

export default Layout
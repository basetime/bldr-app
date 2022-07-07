import React, { ReactNode } from 'react';
import NavigationBar from './top_navigation/NavigationBar'
import Box from '@mui/material/Box';
import "@fontsource/roboto";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({
  children
}: Props) => (
  <>
    <Box>
      <NavigationBar />
      <Box pb={10}>
        {children}
      </Box>
    </Box>
  </>
);

export default Layout
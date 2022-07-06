import React, { ReactNode } from 'react';
import NavigationBar from './top_navigation/NavigationBar'
import Box from '@mui/material/Box';


type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = 'TypeScript Next.js Stripe Example',
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
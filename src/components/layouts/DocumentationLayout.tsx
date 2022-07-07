import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DocumentationNavigation from '../pages/documentation/DocumentationNavigation'
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from '../mdx/Pre'
import InlineCode from '../mdx/Code'
import Paragraph from '../mdx/P'

type Props = {
  children: ReactNode;
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const components = {
  p: Paragraph,
  pre: CodeBlock,
  code: InlineCode
}

const Layout = ({
  children,
}: Props) => (
  <>
    <Grid container spacing={10} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item xs={3}>
        <DocumentationNavigation />
      </Grid>
      <MDXProvider components={components}>
      <Grid item xs={5}>
        
          {children}
       
      </Grid>
      </MDXProvider>
    </Grid>
  </>
);

export default Layout
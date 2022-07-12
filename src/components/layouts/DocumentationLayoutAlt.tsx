import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DocumentationNavigation from '../pages/documentation/DocumentationNavigation'
import { DocumentationItems } from '../pages/documentation/DocumentationNavigationOptions'
import MobileDocumentationNavigation from './top_navigation/MobileDocumentationNavigation'
import CodeBlock from '../mdx/Pre'
import InlineCode from '../mdx/InlineCode'
import Paragraph from '../mdx/P'
import Table from '../mdx/Table'
import ListStyle from '../mdx/List'
import Headers from '../mdx/Headers'
import Link from '../mdx/Link'
import List from '@mui/material/List';
import { MDXProvider } from '@mdx-js/react'

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
  a: Link,
  li: ListStyle.LI,
  ol: ListStyle.OL,
  table: Table,
  p: Paragraph,
  pre: CodeBlock,
  code: InlineCode,
  h1: Headers.H1,
  h2: Headers.H2,
  h3: Headers.H3
}


export default function DocumentationLayoutAlt({
  children,
}: Props) {
  return (
    <Grid container sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', marginTop: { xs: 20, md: 25} }}>
      <Grid item xs={12} md={5}>
        <Drawer
          variant="permanent"
          sx={{
            width: {
              md: 400,
            },
            display: {
              xs: 'none',
              md: 'block;'
            },
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: { md: 400 }, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', marginTop: '7rem' }}>
            <List>
              <DocumentationNavigation />
            </List>
          </Box>
        </Drawer>

        <MobileDocumentationNavigation navigationItems={DocumentationItems} />
      </Grid>
      <Grid item xs={12} md={10} sx={{
        ml: {
          xs: 0,
          md: 40,
          xl: 20
        },
      }}>
      <Box
        component="main"
        position="relative"
      >
        <MDXProvider components={components}>
          <Grid item xs={12} sx={{
            px: {
              xs: 1,
              md: 0
            }
          }}>
            {children}
          </Grid>
        </MDXProvider>
      </Box>
      </Grid>
    </Grid>
  );
}

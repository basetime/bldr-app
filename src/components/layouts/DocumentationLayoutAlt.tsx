import React, { ReactNode, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DocumentationNavigation from '../pages/documentation/DocumentationNavigation'
import { DocumentationItems } from '../pages/documentation/DocumentationNavigationOptions'
import CodeBlock from '../mdx/Pre'
import InlineCode from '../mdx/InlineCode'
import Paragraph from '../mdx/P'
import Table from '../mdx/Table'
import ListStyle from '../mdx/List'
import Headers from '../mdx/Headers'
import Link from '../mdx/Link'
import List from '@mui/material/List';
import { MDXProvider } from '@mdx-js/react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
  children: ReactNode;
  meta: {
    previous: {
      label: string,
      path: string
    },
    next: {
      label: string,
      path: string
    }
  };
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
  ul: ListStyle.UL,
  table: Table,
  p: Paragraph,
  pre: CodeBlock,
  code: InlineCode,
  h1: Headers.H1,
  h2: Headers.H2,
  h3: Headers.H3,
  h4: Headers.H4
}


export default function DocumentationLayoutAlt({
  children,
  meta
}: Props) {

  const [docVersion, setDocVersion] = useState(1)

  const onVersionChange = (event: any) => {
    setDocVersion(event.target.value)
  }

  return (
    <Grid container sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', marginTop: { xs: 10, md: 10 }, marginBottom: { xs: 10, md: 15 }, paddingX: {xs: 5, md: 10} }}>
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
          <Box sx={{ overflow: 'auto', marginTop: '5rem' }}>
            <List>
              <DocumentationNavigation docVersion={docVersion} setVersionChange={onVersionChange} navigationItems={DocumentationItems} />
            </List>
          </Box>
        </Drawer>

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

            {meta.previous.path &&
              <Grid sx={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                {meta.previous.path && <Button href={`/documentation/v${docVersion}/${meta.previous.path}`} variant="outlined" startIcon={<ArrowBackIosIcon />}>
                  {meta.previous.label}
                </Button>}

                <Button href={`/documentation/v${docVersion}/${meta.next.path}`} variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  {meta.next.label}
                </Button>
              </Grid> ||
              <Grid sx={{ marginTop: '4rem', display: 'flex', justifyContent: 'end', alignContent: 'center' }}>
                <Button href={`/documentation/v${docVersion}/${meta.next.path}`} variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  {meta.next.label}
                </Button>
              </Grid>
            }

          </MDXProvider>
        </Box>
      </Grid>


    </Grid>
  );
}

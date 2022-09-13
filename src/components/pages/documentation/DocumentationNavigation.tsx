import React, { ReactNode, useState, useContext, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {MobileNavigationBar} from '../../../components/layouts/top_navigation/MobileNavigationBar'
import { useRouter } from 'next/router';
import GlobalContext from '../../../context/GlobalContext'

interface Props {
  navigationItems: any[];
  setVersionChange: any;
  docVersion: number;
  esp: string;
}

export default function DocumentationNavigation(props: Props) {
  const { global, setGlobal } = useContext(GlobalContext)
  const [currentNav, setCurrentNav] = useState('getting-started')

  const router = useRouter()  
  const path = router.pathname

  const handleMobileNavClick = (event: any) => {
    const navObject = props.navigationItems.find((nav) => nav.doc === event.target.value)
    navObject && setGlobal({
      ...global,
      mobileDocNav: navObject
    })

    router.push(`/documentation/${props.esp}/v${global.docVersion}/${event.target.value}`)
  }

  useEffect(()=>{
    const navPathArr = path.split('/')
    const navPath = navPathArr[navPathArr.length - 1]
    setCurrentNav(navPath)
  }, [path])

  const mobileNavigation = props.navigationItems.map((item) => {
    const doc = `/documentation/${props.esp}/v${global.docVersion}/${item.doc}`;
    const label = item.label;
    const type = item.type;
      
    if(type === 'item')
      return <MenuItem key={label} value={item.doc}>{label}</MenuItem>
  })


  const navigation = props.navigationItems.map((item) => {
    const doc = `/documentation/${props.esp}/v${props.docVersion}/${item.doc}` || '#';
    const label = item.label;
    const type = item.type;

    if (type === 'divider') {
      return <Divider key={label} sx={{ marginY: 2 }} />
    }

    if (type === 'header') {
      return (
        <Typography key={label} variant="button" mb={4} >
          {label}
        </Typography>
      )
    }

    return (
      <>
        <ListItemButton key={label} href={`${doc}`}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText key={label} primary={label} />
        </ListItemButton>
      </>
    )
  })


  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block;'
          }
        }}>

        <Box
          sx={{
            marginX: 'auto',
            paddingX: '2rem',
            paddingBottom: '2rem'
          }}>
          <FormControl fullWidth size="small">
            <InputLabel id="versionSelect-label">Documentation Version</InputLabel>
            <Select
              labelId="versionSelect"
              id="versionSelect"
              value={props.docVersion || 1}
              label="Documentation Version"
              onChange={props.setVersionChange}
            >
              <MenuItem key={1} value={1}>v1</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <List
          sx={{ width: '100%', px: 5, maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {navigation}
        </List>
      </Box>

      <Box
      sx={{
        display: {
          xs: 'block',
          md: 'none;'
        }
      }}>
        <FormControl fullWidth size="small">
            <Select
              labelId="mobileDocumentationNav"
              id="mobileDocumentationNav"
              value={currentNav}
              onChange={handleMobileNavClick}
            >
              {mobileNavigation}
            </Select>
          </FormControl>
      </Box>
    </>
  );
}

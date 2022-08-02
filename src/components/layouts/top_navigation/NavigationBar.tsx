import React, { useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AccountMenu } from './AccountMenu'
import Image from 'next/image'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Link from 'next/link'
import { pages } from './TopNavigationOptions'
import { MobileNavigationBar } from './MobileNavigationBar'
import AuthContext from '../../../context/AuthContext'
import GlobalContext from '../../../context/GlobalContext'

type Event = {
  currentTarget: any
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid',
  borderColor: alpha(theme.palette.common.black, 0.15),
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    borderColor: alpha(theme.palette.common.black, 0.3),
  },
  color: '#1e1e1e',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  }
}));



// TODO clean up unused handlers

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { user } = useContext(AuthContext)
  const { global } = useContext(GlobalContext)
  const navPages = pages(global.docVersion)

  console.log(navPages)
  const handleProfileMenuOpen = (event: Event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: Event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Box>
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, display: 'block' }}>
        <Toolbar sx={{ backgroundColor: 'rgba(30, 30, 30)', paddingY: 1.5 }}>
          <Typography
            noWrap
            component="div"
            sx={{ display: 'block' }}
          >
            {/* //TODO update img tags to NextIMG */}
            <Link passHref href="/">
              <Button>
                <img alt="bldr logo" src="https://bldr.basetime.io/bldr-logo.png" height="50" />
              </Button>
            </Link>

          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ maxWidth: 'md', flexGrow: 1, justifyContent: 'end', display: { xs: 'none', md: 'flex' } }}>
            {navPages.map((page) => (
              <Link key={page.label} passHref href={`${page.route}`}>
                <Button
                  sx={{ my: 2, mx: 4, color: 'white', display: 'block', letterSpacing: '.2rem', fontSize: 15 }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}

            {
              !user || !user.isLoggedIn ?
                <Link key='Login' href='/users/login?returnTo=/'>
                  <Button
                    sx={{ my: 2, mx: 4, color: 'white', display: 'block', letterSpacing: '.2rem', fontSize: 15 }}
                  >
                    Login
                  </Button>
                </Link> :
                <AccountMenu />
            }
            
          </Box>
          <Box
            sx={{
              padding: 0,
              display: {
                sx: 'flex',
                md: 'none',
              }
            }}
          >
            <MobileNavigationBar navPages={navPages}/>
          </Box>
        </Toolbar>
        {/* <Toolbar sx={{ display: "flex", backgroundColor: '#ffffff' }}>
          <Box
            sx={{
              display: {
                xs: 'block',
              },
              width: {
                xs: '100%'
              }
            }}

          >
            <Search>
              <StyledInputBase
                placeholder="Search BLDR..."
                inputProps={{ 'aria-label': 'search' }}
                sx={{
                  paddingRight: {
                    xs: '1rem',
                    md: '4rem'
                  }
                }}
              />
            </Search>
          </Box>
        </Toolbar> */}
      </AppBar>
    </Box>

  );
}

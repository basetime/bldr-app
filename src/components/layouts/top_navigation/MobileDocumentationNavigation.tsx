import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuList } from '@mui/material';
import DocumentationNavigation from '../../pages/documentation/DocumentationNavigation';
import {DocumentationItems} from '../../pages/documentation/DocumentationNavigationOptions';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

interface Props {
  navigationItems: object[]
}

export default function MobileDocumentationNavigation(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Box
      sx={{
        display: {
          xs: 'flex',
          md: 'none'
        },
        color: '#1e1e1e'
      }}
    >
      <Button variant="text" size='large' startIcon={<ChevronRightIcon />} onClick={handleClick}
        sx={{
          display: {
            xs: 'flex',
            md: 'none'
          },
          justifyContent: 'center',
          color: '#1e1e1e'
        }}>
        View Documentation
      </Button>
        <Divider></Divider>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            marginTop: '1rem',
            maxHeight: '70%',
            width: '100%',
          }
        }
        }
        sx={{
          display: {
            xs: 'flex',
            md: 'none'
          }
        }}
      >
        <MenuList>
          <DocumentationNavigation navigationItems={DocumentationItems}/>
        </MenuList>
      </Menu>
      </Box>
    </>
  );
}

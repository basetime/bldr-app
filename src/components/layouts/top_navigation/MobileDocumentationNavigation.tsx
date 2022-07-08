import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuList } from '@mui/material';
import DocumentationNavigation from '../../pages/documentation/DocumentationNavigation';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Tooltip from '@mui/material/Tooltip';

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
    <Tooltip title="Show Documentation">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          display: {
            xs: 'flex',
            md: 'none'
          },
          justifyContent: 'center',
          marginX: 'auto'
        }}
      >
        <ExpandCircleDownIcon fontSize='large' />
      </IconButton>
      </Tooltip>
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
            marginTop: '2rem',
            maxHeight: '70%',
            width: '100%',
          }}
        }
        sx={{
          display: {
            xs: 'flex',
            md: 'none'
          }
        }}
      >
        <MenuList>
          <DocumentationNavigation />
        </MenuList>
      </Menu>
    </>
  );
}

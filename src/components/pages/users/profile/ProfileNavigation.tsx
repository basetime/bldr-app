import React, { ReactNode } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Typography } from '@mui/material';


interface Props {
  navigationItems: object[],
  handleProfileNavigation: any
}

export default function ProfileNavigation(props: Props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  interface DocumentationItem {
    label?: string,
    type?: string,
    doc?: string,
    icon?: any
  }

  const navigation = props.navigationItems.map((item: DocumentationItem) => {
    const doc = `/documentation/${item.doc}` || '#';
    const label = item.label || '';
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
      <ListItemButton key={label} onClick={props.handleProfileNavigation}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    )
  })


  return (
    <List
      sx={{ width: '100%', px: 5, maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {navigation}
    </List>
  );
}

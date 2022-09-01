import React, { ReactNode, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  navigationItems: object[];
  setVersionChange: any;
  docVersion: number;
  esp: string;
}

export default function DocumentationNavigation(props: Props) {
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
    <Box sx={{marginX:'auto', paddingX: '2rem', paddingBottom: '2rem'}}>
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
    </>
  );
}

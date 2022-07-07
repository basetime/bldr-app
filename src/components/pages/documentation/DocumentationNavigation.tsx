import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import StartIcon from '@mui/icons-material/Start';
import StorageIcon from '@mui/icons-material/Storage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BackupIcon from '@mui/icons-material/Backup';
import DownloadIcon from '@mui/icons-material/Download';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SendIcon from '@mui/icons-material/Send';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import SearchIcon from '@mui/icons-material/Search';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { Divider, Typography } from '@mui/material';


export default function DocumentationNavigation() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };


  const documentationItems = [
    {
      type: 'item',
      label: 'Getting Started',
      icon: <PlayCircleOutlineIcon />,
      doc: 'getting-started'
    },
    {
      type: 'item',
      label: 'Contexts',
      icon: <SwitchLeftIcon />,
      doc: 'getting-started'
    },
    {
      type: 'divider'
    },
    {
      type: 'header',
      label: 'CLI Commands'
    },
    {
      type: 'item',
      label: 'config',
      icon: <SettingsIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'status',
      icon: <PlaylistAddCheckCircleIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'stash',
      icon: <StorageIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'init',
      icon: <StartIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'search',
      icon: <SearchIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'clone',
      icon: <CopyAllIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'add',
      icon: <AddCircleOutlineIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'push',
      icon: <BackupIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'package',
      icon: <DynamicFeedIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'install',
      icon: <DownloadIcon />,
      doc: 'configuration'
    },
    {
      type: 'item',
      label: 'deploy',
      icon: <SendIcon />,
      doc: 'configuration'
    },
  ]

  const navigation = documentationItems.map((item) => {
    const doc = `/documentation/${item.doc}` || '#';
    const label = item.label || null;
    const type = item.type;

    if (type === 'divider') {
      return <Divider sx={{ marginY: 2 }} />
    }

    if (type === 'header') {
      return (
        <Typography variant="button" mb={3} >
          {label}
        </Typography>
      )
    }

    return (
      <ListItemButton key={label} href={doc}>
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

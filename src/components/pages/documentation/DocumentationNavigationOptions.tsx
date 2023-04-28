import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BackupIcon from '@mui/icons-material/Backup';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DownloadIcon from '@mui/icons-material/Download';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LockIcon from '@mui/icons-material/Lock';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import StartIcon from '@mui/icons-material/Start';
import StorageIcon from '@mui/icons-material/Storage';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

export const DocumentationItems = [
  {
    type: 'item',
    label: 'Getting Started',
    icon: <PlayCircleOutlineIcon />,
    doc: 'getting-started'
  },
  {
    type: 'divider',
    label: 'divider-1'
  },
  {
    type: 'header',
    label: 'CLI Commands'
  },
  {
    type: 'item',
    label: 'config',
    icon: <SettingsIcon />,
    doc: 'config'
  },
  {
    type: 'item',
    label: 'status',
    icon: <PlaylistAddCheckCircleIcon />,
    doc: 'status'
  },
  {
    type: 'item',
    label: 'stash',
    icon: <StorageIcon />,
    doc: 'stash'
  },
  {
    type: 'item',
    label: 'init',
    icon: <StartIcon />,
    doc: 'init'
  },
  {
    type: 'item',
    label: 'search',
    icon: <SearchIcon />,
    doc: 'search'
  },
  {
    type: 'item',
    label: 'clone',
    icon: <CopyAllIcon />,
    doc: 'clone'
  },
  {
    type: 'item',
    label: 'add',
    icon: <AddCircleOutlineIcon />,
    doc: 'add'
  },
  {
    type: 'item',
    label: 'push',
    icon: <BackupIcon />,
    doc: 'push'
  },
  {
    type: 'item',
    label: 'package [beta]',
    icon: <DynamicFeedIcon />,
    doc: 'package'
  },
  {
    type: 'item',
    label: 'install [beta]',
    icon: <DownloadIcon />,
    doc: 'install'
  },
  {
    type: 'item',
    label: 'deploy [beta]',
    icon: <SendIcon />,
    doc: 'deploy'
  },
  {
    type: 'divider',
    label: 'divider-2'
  },
  {
    type: 'item',
    label: 'Security',
    icon: <LockIcon />,
    doc: 'security'
  },
  {
    type: 'item',
    label: 'Contexts',
    icon: <SwitchLeftIcon />,
    doc: 'contexts'
  },
  {
    type: 'item',
    label: 'Environment Variables',
    icon: <SyncAltIcon />,
    doc: 'environment-variables'
  },
]
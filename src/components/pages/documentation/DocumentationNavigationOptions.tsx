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
import LockIcon from '@mui/icons-material/Lock';

export const DocumentationItems = [
  {
    type: 'item',
    label: 'Getting Started',
    icon: <PlayCircleOutlineIcon />,
    doc: 'getting-started'
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
    type: 'divider',
    label: 'divider'
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
    label: 'package',
    icon: <DynamicFeedIcon />,
    doc: 'package'
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
    doc: 'deploy'
  },
]
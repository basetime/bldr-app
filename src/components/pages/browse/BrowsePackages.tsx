import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AuthContext from '../../../context/AuthContext'
import GlobalContext from '../../../context/GlobalContext'
import { useContext } from 'react';
import { Paper, Grid, Divider, Box, Typography, Button, Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function BrowsePackages() {

  const { user } = useContext(AuthContext)
  const { global } = useContext(GlobalContext)

  const packages =
    Object.prototype.hasOwnProperty.call(global, 'pkgs') &&
    Object.prototype.hasOwnProperty.call(global.pkgs, 'data') &&
    global.pkgs.data;

  console.log(packages)

  //TODO set pkg type definition
  const renderPackages = packages && packages.map((pkg: any) => {
    const user = pkg.userData;

    return (
      <div key={pkg.id}>
        <Button fullWidth>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user.profile.displayName} src={user.profile.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={pkg.id}
              secondaryTypographyProps={{
                textTransform: 'none'
              }}
              secondary={
                <>
                  {pkg.description}
                </>
              }
            />
          </ListItem>
        </Button>
        <Divider component="li" />
      </div>
    )
  })


  return (
    <>
      <Grid item container xs={12} md={10} mx={'auto'}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {renderPackages}
        </List>
      </Grid>
    </>
  );
}

import React, { useEffect, useCallback, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AuthContext from '../../../context/AuthContext'
import GlobalContext from '../../../context/GlobalContext'
import { useContext } from 'react';
import { Paper, Grid, Divider, Box, Typography, Button, Stack, Chip } from '@mui/material';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CloudIcon from '@mui/icons-material/Cloud';

interface Props {
  packages: Array<Array<object>>
}

export default function BrowsePackages(props: Props) {
  const [page, setPage] = useState(0)


  // TODO set pkg type definition
  const renderPackages = props.packages && props.packages.map((pkg: any) => {
    const user = pkg.userData;
    return (
      <div key={pkg.id}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start' }} >
          <Button fullWidth>
            <ListItem>
              <ListItemText
                primary={pkg.id}
                secondaryTypographyProps={{
                  textTransform: 'none',
                  maxWidth: '80%'
                }}
                secondary={
                  <>
                    {pkg.description}
                  </>
                }
              />
            </ListItem>
          </Button>
          <Stack direction="row" spacing={1} sx={{display: {xs: 'none', md:'flex'}, marginTop:'1rem'}}>
            {pkg.tags && pkg.tags.length && pkg.tags.map((tag: string) => {
              return (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              )
            })}
          </Stack>

        </Grid>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <ListItem>
            <Button sx={{ marginRight: 2 }}>
              <ListItemAvatar>
                <Avatar alt={user.profile.displayName} src={user.profile.photoURL} />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <>
                    {user.profile.displayName}
                  </>
                }
              />
            </Button>
            <Stack direction="row" alignItems="center" spacing={1}>
              {user.github && user.github.url &&
                <IconButton href={user.github.url} aria-label="delete" size="small">
                  <GitHubIcon fontSize="inherit" />
                </IconButton>}
              {user.profile && user.profile.twitter && user.profile.twitter !== '' &&
                <IconButton href={user.profile.twitter} aria-label="delete" size="small">
                  <TwitterIcon fontSize="inherit" />
                </IconButton>}
              {user.profile && user.profile.linkedin && user.profile.linkedin !== '' &&
                <IconButton href={user.profile.linkedin} aria-label="delete" size="small">
                  <LinkedInIcon fontSize="inherit" />
                </IconButton>}
              {user.profile && user.profile.trailblazer && user.profile.trailblazer !== '' &&
                <IconButton href={user.profile.trailblazer} aria-label="delete" size="small">
                  <CloudIcon fontSize="inherit" />
                </IconButton>}
            </Stack>
          </ListItem>
        </Grid>

        <Divider component="li" />
      </div>
    )
  })


  return (
    <>
      <Grid xs={12}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {props.packages.length && renderPackages}
          {!props.packages.length &&
            <Typography>
              No packages to display.
            </Typography>
          }
        </List>
      </Grid>
    </>
  );
}

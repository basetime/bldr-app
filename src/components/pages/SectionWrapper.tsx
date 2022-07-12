import React, { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material'
import axios from 'axios'

interface Props {
  elevation?: number | 1,
  children: ReactNode
}

const Item = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));



export default function Section(props: Props) {

  return (
    <Item
      elevation={props.elevation}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: { xs: 'xs', md: 'md', lg: 'lg' },
        mx: 'auto',
        mb: 5
      }}
    >
      {props.children}
    </Item>

  );
}

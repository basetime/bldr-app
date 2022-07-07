import React, {ReactNode} from 'react';
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


interface Props {
  elevation?: number | 1,
  image?: {
    src: string,
    width?: string | 'auto'
  },
  icon?: ReactNode,
  subtext?: string | any,
  copy?: string | any,
  buttons?: Array<{
    label: string,
    href: string,
    variant: "text" | "outlined" | "contained",
  }>
}

const Item = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));



export default function Section(props: Props) {

  const ctaButtons = props && props.buttons && props.buttons.map(btn => <span key={btn.label}><Button variant={btn.variant} href={btn.href}>{btn.label}</Button></span>)
  
  let image;

  if(props && props.image && props.image.src && props.image.src.includes('http')){
    image = <img alt="bldr logo" src={props.image.src} width={props.image.width}/>
  } 

  return (
    <Item
      elevation={props.elevation}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: {xs: 'sm', md:'md', lg: 'lg'},
        mx: 'auto',
        mb: 5
      }}
    >
      <Box maxWidth="md" mt={5}>
        <Grid>
          {image}
          {props.icon}
          <Typography textAlign="center" pt={5} fontSize={20}>
          {props.subtext}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Divider sx={{ marginY: 4 }} />
          <Typography textAlign="center" variant="body1" mx="auto" sx={{maxWidth: '75%'}}>
          {props.copy}
          </Typography>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
            spacing={3}
            direction="row"
            my={5}
          >
           {ctaButtons} 
          </Stack>
        </Grid>
      </Box>
    </Item>

  );
}

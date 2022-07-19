import React, { ReactNode, useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Divider, Box, Typography, Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Link from 'next/link'
import axios from 'axios'
import GlobalContext from '../../../context/GlobalContext';
import AuthContext from '../../../context/AuthContext';

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

interface Event {
  target: {
    value: string
  }
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));



export default function SubmitPage(props: Props) {
  const [packageURL, setPackageURL] = useState('')
  const [submitStatus, setSubmitStatus] = useState({
    status: false,
    statusText: 'https://github.com/{{owner}}/{{repository}}'
  })

  const { global } = useContext(GlobalContext)
  const { user } = useContext(AuthContext)

  const handlePackageURLUpdate = (event: Event) => {
    setPackageURL(event.target.value)
  }

  const handlePackageURLSubmit = async () => {
    try {
      if (!packageURL.includes('github')) {

      }

      const provider =
        packageURL.includes('github') ? 'github' :
          packageURL.includes('bitbucket') ? 'bitbucket' :
            'unknown'

      const submitRequest = await axios.post(`${global.apiBase}/package/submit`, {
        uid: user.profile.uid,
        packageURL: packageURL,
        provider
      })

      setSubmitStatus({
        status: submitRequest.data.status === 'ok' ? false : true,
        statusText: submitRequest.data.statusText
      })

    } catch (err: any) {
      console.log(err)
      let errorStatusText = err && err.response && err.response.data && err.response.data.statusText || 'There was an error with your request'
      setSubmitStatus({ status: true, statusText: errorStatusText })
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, mx: 'auto', maxWidth: { xs: 'sm', md: 'md', lg: 'lg', xl: 'xl' } }}>
        <Grid
          container
          spacing={3}>

          <Grid
            display='flex'
            justifyContent="center"
            item
            xs={12}
            sx={{
              marginX: {
                xs: 3,
                md: 0
              }
            }}
          >
            <Typography color="#357eC8" variant='h5' textAlign="left" pt={3}>
              Submit your BLDR Package
            </Typography>
          </Grid>
          <Grid
            display='block'
            justifyContent="center"
            item
            xs={12}
            sx={{
              marginX: {
                xs: 3,
                md: 0
              }
            }}
          >
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >

              <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{ marginX: 'auto' }}>
                  <FormControl fullWidth>
                    <TextField
                      error={submitStatus.status}
                      onChange={handlePackageURLUpdate}
                      id="outlined-basic"
                      label="Enter Repository URL"
                      variant="outlined"
                      helperText={submitStatus.statusText}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
              spacing={3}
              direction="row"
              my={5}
            >
              <Button
                variant="outlined"
                onClick={handlePackageURLSubmit}
              >
                Submit Package
              </Button>
            </Stack>
          </Grid>
          <Grid
            display='flex'
            justifyContent="center"
            alignItems="stretch"
            item
            xs={12}
            md={6}
            sx={{
              marginX: {
                xs: 3,
                md: 0
              }
            }}
          >
            <Item
              elevation={0}
            >
              <Typography color="#357eC8" variant='h5' textAlign="left" pt={3}>
                Getting Started BLDR Packages
              </Typography>

              <Divider sx={{ marginY: 2, maxWidth: '80%' }} />

              <Typography variant='body1' maxWidth={'80%'} textAlign="left" pb={3}>
                BLDR Packages can be anything from a complex AMPscript process, Server-Side Javascript functions, or full Cloud Page applications. All BLDR packages need to be committed to the <code>main branch</code> of a <code>public</code> GitHub Repository<sup>*</sup>.
                <br /><br />

                After your SFMC project has been tested, follow the <Link href="/documentation/package">package documentation</Link>.

                <br /><br />
                <sup>*</sup>Other GIT providers will be supported in the future.
              </Typography>
            </Item>
          </Grid>
          <Grid
            display="flex"
            alignItems="stretch"
            item
            xs={12}
            md={6}
            sx={{
              marginX: {
                xs: 3,
                md: 0
              }
            }}
          >
            <Item
              elevation={0}
              sx={{
                px: { xs: 1, md: 3, xl: 4 }
              }}>
              <Typography color="#357eC8" variant='h5' textAlign="left" pt={3}>
                Submitting Your Package
              </Typography>
              <Divider sx={{ marginY: 2, maxWidth: '80%' }} />
              <Typography variant='body1' maxWidth={'80%'} textAlign="left" pb={3} >
                Prior to submitting your BLDR package, please ensure that you have met the following requirements
              </Typography>
              <ul>
                <li>Package has been tested</li>
                <li>Configurations have been set using the <Link href="#">.sfmc.config.json file.</Link></li>
                <li><code>bldr package</code> has run successfully</li>
                <li>Package has been committed to a public GitHub repository on the main branch</li>
              </ul>

            </Item>
          </Grid>

        </Grid>
      </Box >
    </>

  );
}

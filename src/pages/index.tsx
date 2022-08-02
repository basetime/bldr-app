import Layout from '../components/layouts/MainLayout'
import { NextPage } from 'next'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Section from '../components/pages/Section';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import axios from 'axios';
import Link from 'next/link'
import AuthContext from '../context/AuthContext';

import {useContext} from 'react'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const Index: NextPage = () => {
  const heroSubtext = `Development Tool & Package Deployment for Salesforce Marketing Cloud`

  const handleTestClick = async () => {
    try {
    const request = await axios.get('http://127.0.0.1:5001/bldr-io/us-central1/bldrAPI/api/v1/authentication/authenticate')
    console.log(request)
    } catch(err){
      console.log(err)
    }
  }


  return (
    <Layout>
      <Box sx={{
        marginTop: 25
      }}>
        <Section
          elevation={4}
          image={{
            src: "https://bldr.basetime.io/bldr-logo.png",
            width: '40%'
          }}
          subtext={heroSubtext}
          copy='BLDR is a CLI Application and Package Registry for Salesforce Marketing Cloud (SFMC). The driving force behind the open-source BLDR project is to bring working with SFMC a bit closer to a true development workflow as well as provide developers and users a way to share/distribute projects with team and community members.'
          buttons={[
            {
              label: 'Get BLDR CLI',
              href: 'https://www.npmjs.com/package/@basetime/bldr-sfmc',
              variant: 'outlined'
            },
            {
              label: 'View Documentation',
              href: '/documentation/v1/getting-started',
              variant: 'outlined'
            }
          ]}
        />

        <Section
          elevation={0}
          image={{
            src: "https://cdn-icons-png.flaticon.com/512/7560/7560719.png",
            width: '20%'
          }}
          subtext='Bring Open-Source Front and Center in SFMC'
          copy='Basetime.io is passionate about supporting open-source projects and Salesforce Marketing Cloud initiatives. Creating a way for users to share and deploy SFMC projects easily just made sense. Contributing to the BLDR Package Registry will not only give developers a chance to put their work out in the community but give users a way to accelerate what they are able to learn and achieve in SFMC.'
        />

        {/* <Box sx={{ flexGrow: 1, mx: 'auto', maxWidth: { xs: 'sm', md: 'md', lg: 'lg', xl: 'xl' } }}>
          <Grid
            container
            display='flex'
            justifyContent="space-evenly"
          >

            <Grid
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
                  Getting Started with BLDR CLI
                </Typography>

                <Divider sx={{ marginY: 2, maxWidth: '80%' }} />

                <Typography variant='body1' maxWidth={'80%'} textAlign="left" pb={3}>
                  BLDR CLI is the heart of the BLDR project as it allows you to interact with SFMC almost 100% from your local machine. Providing a workflow where you can use your favorite code editor and puts updating assets within SFMC at your fingertips makes developing for the platform more efficient.
                </Typography>

                <Typography color="#357eC8" variant='h6' textAlign="left" py={3}>
                  Install & Configure
                </Typography>


                <pre><code>
                  // Install BLDR <br />
                  npm install -g @basetime/bldr-sfmc
                  <br /><br />

                  // Configure SFMC Instance & Get MIDs <br />
                  bldr config -n <br />
                  [Instance Name]: Instance Name <br />
                  [Client Id]: Client Id (Installed Package) <br />
                  [Client Secret]: Client Secret (Installed Package) <br />
                  [Auth URI]: Auth URI (Installed Package)

                </code></pre>


                <Typography color="#357eC8" variant='h5' textAlign="left" pt={3}>
                  Using BLDR
                </Typography>

                <Divider sx={{ marginY: 2, maxWidth: '80%' }} />
                <Typography variant='body1' maxWidth={'80%'} textAlign="left" pb={3}>
                  The BLDR CLI allows you to configure multiple SFMC instances so you can use the same CLI commands for any instance you need to work in.
                  Currently Content Builder and Automation Studio are supported; code samples below work for both based on a context flag <code>--cb or --as</code>.

                </Typography>

                <Typography color="#357eC8" variant='h6' textAlign="left" py={3}>
                  List & Set Configuration
                </Typography>

                <pre><code>
                  // List All Instance Configurations <br />
                  bldr config -l
                  <br /><br />

                  // Check Current Set Configuration <br />
                  bldr status
                  <br /><br />

                  // Set Instance <br />
                  bldr config -s [instance name]
                  <br /><br />

                  // Set Instance Mid <br />
                  bldr config -s [instance name] -m [mid]

                </code></pre>


                <Typography color="#357eC8" variant='h6' textAlign="left" py={3}>
                  Search & Clone
                </Typography>


                <pre><code>
                  // Search for Folder by Name <br />
                  bldr search --cb -f [folder name]
                  <br /><br />

                  // Clone Folder (+ subfolders) and Assets Locally <br />
                  bldr clone --cb -f [folder Id]
                  <br /><br />

                  // Search for Asset by Name <br />
                  bldr search --cb -a [asset name]
                  <br /><br />

                  // Clone Asset Locally <br />
                  bldr clone --cb -a [asset Id]


                </code></pre>

                <Typography color="#357eC8" variant='h6' textAlign="left" py={3}>
                  Add & Push
                </Typography>

                <pre><code>
                  // Prepare Assets to Update <br />
                  bldr add [path to file]
                  <br /><br />

                  // Update Assets <br />
                  bldr push

                </code></pre>

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
                  Package & Deploy Projects
                </Typography>
                <Divider sx={{ marginY: 2, maxWidth: '80%' }} />
                <Typography variant='body1' maxWidth={'80%'} textAlign="left" pb={3} >
                  BLDR Packages currently support supported Content Builder based asset types. Support for All Content Builder asset types and Automation Studio will be extended with the continuing development of the BLDR CLI.
                  <br /><br />
                  Packaged projects result in a compiled JSON file and is stored in your Git repository. The package command will gather all assets within your project, remove SFMC instance specific values (Asset Id, Customer Key), locate and grab dependency references that don&rsquo;t exist in your project.
                  <br /><br />
                  After you have packaged and committed your project to a public GitHub repository (support for other Git providers to come) you can <Link href="/submit">submit your package</Link> to the registry so community members can search and use your package.

                </Typography>
                <Typography color="#357eC8" variant='h6' textAlign="left" py={3}>
                  Package
                </Typography>

                <pre><code>
                  // Package Folders, Assets, and Dependencies <br />
                  bldr package
                </code></pre>

                <Typography color="#357eC8" variant='h6' textAlign="left" py={3}>
                  Install & Deploy
                </Typography>

                <pre><code>
                  // Package Folders, Assets, and Dependencies <br />
                  bldr install [GitHub URL]
                  <br /><br />
                  // Deploy Package to SFMC <br />
                  bldr deploy
                </code></pre>

              </Item>
            </Grid>
          </Grid>
        </Box > */}
      </Box>
    </Layout >
  )
}

export default Index
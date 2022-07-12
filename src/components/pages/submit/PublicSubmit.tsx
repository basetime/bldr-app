import React, {ReactNode} from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Section from '../Section'

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


export default function PublicSubmit(props: Props) {
  const SubmitIcon = <LocalShippingIcon sx={{fontSize: 90}} />
  const SubmitSubtext = `Ready to Submit a package? Login or Create a BLDR account to get started.`;
  const SubmitCopy = `Creating a BLDR account allows you to be credited for the packages you own and submit to the BLDR registry. Users will be able to search packages by Creators Name, Keywords, and other data points.`;

  const PackagesIcon = <DynamicFeedIcon sx={{fontSize: 90}} />
  const PackagesSubtext = `What is a BLDR Package?`;
  const PackagesCopy = `A SFMC BLDR package is currently any Content Builder based project or code that is stored in either a HTML Email, Code Snippet Content Block or HTML Content Block. Packages can also include any Cloud Page or Code Resource file stored in the Content Builder root file. Fore more information about BLDR packages visit the Package documentation.`
  
  return (
    <>
    <Section
        elevation={4}
        icon={SubmitIcon}
        subtext={SubmitSubtext}
        copy={SubmitCopy} 
        buttons={[
          {
            label: 'Create an Account or Log In',
            href: '/users/login?returnTo=/submit',
            variant: 'outlined'
          }
        ]}
      />

      <Section
        elevation={0}
        icon={PackagesIcon}
        subtext={PackagesSubtext}
        copy={PackagesCopy}
        buttons={[
          {
            label: 'Learn about Packages',
            href: '/documentation/package',
            variant: 'outlined'
          }
        ]}
      />
    </>

  );
}

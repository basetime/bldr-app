import type { ReactElement } from 'react'
import {MainLayout} from '../components/layouts/MainLayout'
import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      </>
  )
}

export default Page

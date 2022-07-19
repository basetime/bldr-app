import Layout from '../../components/layouts/MainLayout'
import DocumentationLayoutAlt from '../../components/layouts/DocumentationLayoutAlt'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Documentation: NextPage = () => {
  const router = useRouter()

  useEffect(() =>  {
    router.push('/documentation/getting-started')
  },[])
 

  return (
    <>
    </>
  )
}

export default Documentation

import Layout from '../../../../components/layouts/MainLayout'
import { NextPage } from 'next'
import GlobalContext from '../../../../context/GlobalContext';
import AuthContext from '../../../../context/AuthContext';
import { useRouter } from 'next/router'

const SubmitPage: NextPage = () => {
  // const { user } = useContext(AuthContext)
  const router = useRouter()


  return (
    <Layout>
      package list
    </Layout >

  )
}


export default SubmitPage
import Layout from '../../../../../components/layouts/MainLayout'
import { NextPage } from 'next'
import GlobalContext from '../../../../../context/GlobalContext';
import AuthContext from '../../../../../context/AuthContext';
import { useRouter } from 'next/router'

const SubmitPage: NextPage = () => {
  // const { user } = useContext(AuthContext)
  const router = useRouter()
  const { uid, package_name } = router.query


  return (
    <Layout>
      {uid}
      {package_name}
    </Layout >

  )
}


export default SubmitPage
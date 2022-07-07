import Layout from '../../components/layouts/MainLayout'
import DocumentationLayout from '../../components/layouts/DocumentationLayout'
import { NextPage } from 'next'

const Documentation: NextPage = () => {

  return (
    <Layout>
      <DocumentationLayout>
        Get Started With Documentation
      </DocumentationLayout>
    </Layout>
  )
}

export default Documentation

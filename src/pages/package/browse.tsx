import { useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import GlobalContext from '../../context/GlobalContext';
import Layout from '../../components/layouts/MainLayout'
import { NextPage } from 'next'
import { styled } from '@mui/material/styles';
import BrowsePackages from '../../components/pages/browse/BrowsePackages'
import { Paper, Grid, Divider, Box, Typography, Button, Stack } from '@mui/material';
import axios from 'axios'
import PackageFilter from '../../components/pages/browse/PackageFilter'
import Pagination from '../../components/pages/browse/Pagination'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const BrowsePage: NextPage = () => {
  const router = useRouter();
  const { global } = useContext(GlobalContext)
  const [packages, setPackages] = useState({ status: '', count: 0, pages: {}, data: [] })
  const [filteredPackages, setFilteredPackages] = useState([])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginate = useCallback((array: any, page_size: number, page_number: number) => {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice(page_number * page_size, page_number * page_size + page_size);
  }, [])

  const getPackages = useCallback(async () => {
    const packageRequest = await axios.get(`${global.apiBase}/package`)

    if (packageRequest.data.status === 'ok') {
      const intPackages = packageRequest.data.data.slice(0 * 10, 0 * 10 + 10);
      setFilteredPackages(intPackages)
      setPackages(packageRequest.data)
    }

  }, [router.isReady])



  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {
    getPackages()
  }, [router.isReady])


  useEffect(() => {
    const pagination = paginate(packages.data, rowsPerPage, page)
    setFilteredPackages(pagination)
  }, [page])

  if (packages.data.length) {
    console.log(packages.data)
    return (
      <Layout maxWidth={{ maxWidth: false }}>
        <Grid item container>
         
          <Grid xs={12} md={4} sx={{ marginRight: 10 }}>
            <PackageFilter />
          </Grid>
          <Grid xs={12} md={7}>
          <Grid xs={12} mb={3} mx={'auto'}>
            <Pagination count={packages.count} onPage={page} rowsPerPage={rowsPerPage} onHandleChangePage={handleChangePage} onHandleChangeRowsPerPage={handleChangeRowsPerPage} />
          </Grid>
            {packages.data && <BrowsePackages packages={filteredPackages} />}
            <Grid xs={12} my={3} mx={'auto'}>
              <Pagination count={packages.count} onPage={page} rowsPerPage={rowsPerPage} onHandleChangePage={handleChangePage} onHandleChangeRowsPerPage={handleChangeRowsPerPage} />
            </Grid>
          </Grid>

        </Grid>
      </Layout>
    )
  }

  return (
    <></>
  )


}


export default BrowsePage
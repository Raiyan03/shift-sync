"use client"
import Layout from '@/app/pages/Dashboard/Layout';
import { Grid, Paper, Typography } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/components/Firebase';
import { useAuth } from '@/app/components/Auth-Context';
import Link from 'next/link';

const Dashboard = () => {
  const { userLoggedIn } = useAuth();
  return (
<>
{
  // userLoggedIn
  // ?
  <>
        <Layout>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Metric 1</Typography>
              <Typography>Data for metric 1</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Metric 2</Typography>
              <Typography>Data for metric 2</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">Metric 3</Typography>
              <Typography>Data for metric 3</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Layout>


  </>
  // :
  // <>
  //         <p className="text-2xl mb-2 text-white">Please log in to see the Dashboard.</p>
  //       <Link className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" href="/">Home
  //       </Link>
  // </>
}
</>

  );
};

export default Dashboard;

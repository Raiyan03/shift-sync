"use client";
import React, { useState } from 'react';
import Layout from '@/app/pages/Dashboard/Layout';
import { Grid, Paper, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Link from 'next/link';

const Dashboard = () => {
  const [view, setView] = useState('weeks');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <>
      <Layout>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view switch"
          sx={{ mb: 3 }}
        >
          <ToggleButton value="weeks" aria-label="weeks">
            Weeks
          </ToggleButton>
          <ToggleButton value="shifts" aria-label="shifts">
            Shifts
          </ToggleButton>
          <ToggleButton value="days" aria-label="days">
            Days
          </ToggleButton>
        </ToggleButtonGroup>

        <Grid container spacing={3}>
          {view === 'weeks' && (
            <>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Week Metric 1</Typography>
                  <Typography>Data for week metric 1</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Week Metric 2</Typography>
                  <Typography>Data for week metric 2</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Week Metric 3</Typography>
                  <Typography>Data for week metric 3</Typography>
                </Paper>
              </Grid>
            </>
          )}
          {view === 'shifts' && (
            <>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Shift Metric 1</Typography>
                  <Typography>Data for shift metric 1</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Shift Metric 2</Typography>
                  <Typography>Data for shift metric 2</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Shift Metric 3</Typography>
                  <Typography>Data for shift metric 3</Typography>
                </Paper>
              </Grid>
            </>
          )}
          {view === 'days' && (
            <>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Day Metric 1</Typography>
                  <Typography>Data for day metric 1</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Day Metric 2</Typography>
                  <Typography>Data for day metric 2</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">Day Metric 3</Typography>
                  <Typography>Data for day metric 3</Typography>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </Layout>
    </>
  );
};

export default Dashboard;

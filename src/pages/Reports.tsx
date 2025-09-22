import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';
import { Download as DownloadIcon } from '@mui/icons-material';
import { taskAPI, leaveAPI } from '../services/api';

const Reports = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [taskReports, setTaskReports] = useState<any[]>([]);
  const [leaveReports, setLeaveReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (activeTab === 0) {
        // Fetch task reports
        const response = await taskAPI.getAllTasks();
        setTaskReports(response.data);
      } else if (activeTab === 1) {
        // Fetch leave reports
        const response = await leaveAPI.getAllLeaves();
        setLeaveReports(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const taskColumns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'service', headerName: 'Service', width: 120 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 150 },
    { field: 'assignedBy', headerName: 'Assigned By', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'priority', headerName: 'Priority', width: 120 },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';
      },
    },
  ];

  const leaveColumns: GridColDef[] = [
    { field: 'user', headerName: 'User', width: 150 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 120,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';
      },
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 120,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';
      },
    },
    { field: 'reason', headerName: 'Reason', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'approvedBy', headerName: 'Approved By', width: 150 },
    {
      field: 'approvedAt',
      headerName: 'Approved At',
      width: 120,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';
      },
    },
  ];

  const handleExport = () => {
    // TODO: Implement actual export functionality
    console.log('Exporting report:', { startDate, endDate });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Reports</Typography>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export Report
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            sx={{ width: 200 }}
          />
          
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            sx={{ width: 200 }}
          />
        </Box>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Task Reports" />
          <Tab label="Leave Reports" />
          <Tab label="Dashboard" />
        </Tabs>
        
        {activeTab === 0 && (
          <DataGrid
            rows={taskReports}
            columns={taskColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        )}
        
        {activeTab === 1 && (
          <DataGrid
            rows={leaveReports}
            columns={leaveColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        )}
        
        {activeTab === 2 && (
          <Typography>Dashboard statistics will be shown here</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Reports;
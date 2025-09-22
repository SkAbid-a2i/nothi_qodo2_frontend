import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { taskAPI } from '../services/api';

const TeamTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamTasks();
  }, []);

  const fetchTeamTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTeamTasks();
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch team tasks');
    } finally {
      setLoading(false);
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <Chip label="Pending" color="default" size="small" />;
      case 'in-progress':
        return <Chip label="In Progress" color="primary" size="small" />;
      case 'completed':
        return <Chip label="Completed" color="success" size="small" />;
      case 'cancelled':
        return <Chip label="Cancelled" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const getPriorityChip = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Chip label="Low" color="info" size="small" />;
      case 'medium':
        return <Chip label="Medium" color="warning" size="small" />;
      case 'high':
        return <Chip label="High" color="secondary" size="small" />;
      case 'urgent':
        return <Chip label="Urgent" color="error" size="small" />;
      default:
        return <Chip label={priority} size="small" />;
    }
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'service', headerName: 'Service', width: 120 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => getStatusChip(params.value as string),
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      renderCell: (params: GridRenderCellParams) => getPriorityChip(params.value as string),
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 120,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: () => (
        <>
          <IconButton color="primary" size="small">
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

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
        <Typography variant="h4">Team Tasks</Typography>
        <Button variant="contained">Create Task</Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  );
};

export default TeamTasks;
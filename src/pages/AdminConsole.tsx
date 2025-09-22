import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Tabs,
  Tab,
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
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { userAPI, dropdownAPI } from '../services/api';

const AdminConsole = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [dropdowns, setDropdowns] = useState<any[]>([]);
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
        // Fetch users
        const response = await userAPI.getAllUsers();
        setUsers(response.data);
      } else if (activeTab === 1) {
        // Fetch dropdowns
        const response = await dropdownAPI.getAllDropdowns();
        setDropdowns(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const getRoleChip = (role: string) => {
    switch (role) {
      case 'systemadmin':
        return <Chip label="System Admin" color="error" size="small" />;
      case 'admin':
        return <Chip label="Admin" color="primary" size="small" />;
      case 'supervisor':
        return <Chip label="Supervisor" color="secondary" size="small" />;
      case 'agent':
        return <Chip label="Agent" color="default" size="small" />;
      default:
        return <Chip label={role} size="small" />;
    }
  };

  const getStatusChip = (isActive: boolean) => {
    return isActive ? (
      <Chip label="Active" color="success" size="small" />
    ) : (
      <Chip label="Inactive" color="default" size="small" />
    );
  };

  const userColumns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 120 },
    { field: 'lastName', headerName: 'Last Name', width: 120 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params: GridRenderCellParams) => getRoleChip(params.value as string),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => getStatusChip(params.value as boolean),
    },
    {
      field: 'storage',
      headerName: 'Storage',
      width: 150,
      valueGetter: (params) => {
        return `${params.row.usedStorage} / ${params.row.storageQuota} MB`;
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

  const dropdownColumns: GridColDef[] = [
    { field: 'name', headerName: 'Type', width: 120 },
    { field: 'value', headerName: 'Value', width: 150 },
    { field: 'label', headerName: 'Label', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => getStatusChip(params.value as boolean),
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
        <Typography variant="h4">Admin Console</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add New
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Users" />
          <Tab label="Dropdowns" />
          <Tab label="Audit Logs" />
          <Tab label="System Settings" />
        </Tabs>
        
        {activeTab === 0 && (
          <DataGrid
            rows={users}
            columns={userColumns}
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
            rows={dropdowns}
            columns={dropdownColumns}
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
          <Typography>No audit logs available</Typography>
        )}
        
        {activeTab === 3 && (
          <Typography>No system settings available</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AdminConsole;
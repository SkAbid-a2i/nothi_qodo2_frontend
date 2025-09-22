import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { leaveAPI } from '../services/api';

const Leaves = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reason, setReason] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const response = await leaveAPI.getMyLeaves();
      setLeaves(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch leaves');
    } finally {
      setLoading(false);
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <Chip label="Pending" color="default" size="small" />;
      case 'approved':
        return <Chip label="Approved" color="success" size="small" />;
      case 'rejected':
        return <Chip label="Rejected" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const handleCreateLeave = async () => {
    try {
      setSubmitLoading(true);
      setSubmitError('');
      
      // Create leave data object
      const leaveData = {
        startDate,
        endDate,
        reason,
      };

      // Call API to create leave
      await leaveAPI.createLeave(leaveData);
      
      // Close dialog and reset form
      setOpenDialog(false);
      setStartDate(null);
      setEndDate(null);
      setReason('');
      
      // Refresh leaves list
      fetchLeaves();
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || 'Failed to create leave request');
    } finally {
      setSubmitLoading(false);
    }
  };

  const columns: GridColDef[] = [
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
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => getStatusChip(params.value as string),
    },
    { field: 'approvedBy', headerName: 'Approved By', width: 150 },
    {
      field: 'approvedAt',
      headerName: 'Approved At',
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
        <Typography variant="h4">Leave Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Request Leave
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <DataGrid
          rows={leaves}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Paper>
      
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Leave</DialogTitle>
        <DialogContent>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>
          )}
          <Box sx={{ pt: 1 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ mt: 2, mb: 2, width: '100%' }}
            />
            
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ mt: 2, mb: 2, width: '100%' }}
            />
            
            <TextField
              fullWidth
              label="Reason"
              multiline
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateLeave}
            disabled={submitLoading}
          >
            {submitLoading ? <CircularProgress size={24} /> : 'Request'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Leaves;
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { taskAPI } from '../services/api';

const TaskLogger = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [service, setService] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState('medium');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Create task data object
      const taskData = {
        title,
        description,
        category,
        service,
        assignedTo,
        dueDate,
        priority,
      };

      // Call API to create task
      await taskAPI.createTask(taskData);
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setService('');
      setAssignedTo('');
      setDueDate(null);
      setPriority('medium');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task Logger
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Task created successfully!
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            required
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="application">Application</MenuItem>
              <MenuItem value="complaint">Complaint</MenuItem>
              <MenuItem value="inquiry">Inquiry</MenuItem>
              <MenuItem value="request">Request</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Service</InputLabel>
            <Select
              value={service}
              label="Service"
              onChange={(e) => setService(e.target.value)}
            >
              <MenuItem value="passport">Passport</MenuItem>
              <MenuItem value="visa">Visa</MenuItem>
              <MenuItem value="nid">National ID</MenuItem>
              <MenuItem value="birth_certificate">Birth Certificate</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Assign To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            margin="normal"
            required
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
          
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            sx={{ mt: 2, mb: 2, width: '100%' }}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Task'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskLogger;
import {
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const Help = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Help & Documentation
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Getting Started
        </Typography>
        <Typography paragraph>
          Welcome to D-Nothi, a comprehensive task and leave management system. 
          This guide will help you get started with using the application effectively.
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Navigation
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Dashboard" 
              secondary="Overview of your tasks and system statistics" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Task Logger" 
              secondary="Create and manage tasks with categories and services" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="My Tasks" 
              secondary="View and manage tasks assigned to you" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Team Tasks" 
              secondary="Supervisors can view tasks assigned to their team" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Leaves" 
              secondary="Request and manage leave applications" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Reports" 
              secondary="Generate reports on tasks and leaves" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Admin Console" 
              secondary="System administration for users and settings" 
            />
          </ListItem>
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Task Management
        </Typography>
        <Typography paragraph>
          Tasks can be created through the Task Logger page. Each task requires:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Title and Description" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Category (Application, Complaint, Inquiry, Request)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Service (Passport, Visa, National ID, Birth Certificate)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Assignee" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Priority (Low, Medium, High, Urgent)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Due Date (optional)" />
          </ListItem>
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Leave Management
        </Typography>
        <Typography paragraph>
          Leave requests can be submitted through the Leaves page. Requests require:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Start and End Dates" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Reason for Leave" />
          </ListItem>
        </List>
        <Typography paragraph>
          Leave requests must be approved by supervisors or administrators.
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Support
        </Typography>
        <Typography paragraph>
          For technical support, please contact your system administrator or email 
          support@dnothi.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Help;
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Task Logger',
      description: 'Create and manage tasks',
      path: '/task-logger',
    },
    {
      title: 'My Tasks',
      description: 'View your assigned tasks',
      path: '/my-tasks',
    },
    {
      title: 'Team Tasks',
      description: 'View tasks assigned to your team',
      path: '/team-tasks',
    },
    {
      title: 'Leaves',
      description: 'Manage leave requests',
      path: '/leaves',
    },
    {
      title: 'Reports',
      description: 'Generate and view reports',
      path: '/reports',
    },
    {
      title: 'Admin Console',
      description: 'System administration',
      path: '/admin',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(item.path)}>
                  Go
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
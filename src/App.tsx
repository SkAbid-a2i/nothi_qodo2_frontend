import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TaskLogger from './pages/TaskLogger';
import MyTasks from './pages/MyTasks';
import TeamTasks from './pages/TeamTasks';
import Leaves from './pages/Leaves';
import AdminConsole from './pages/AdminConsole';
import Reports from './pages/Reports';
import Help from './pages/Help';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#E6E6FA', // Lavender
    },
    secondary: {
      main: '#98FB98', // PaleGreen
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task-logger" element={<TaskLogger />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/team-tasks" element={<TeamTasks />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/admin" element={<AdminConsole />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
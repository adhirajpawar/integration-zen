import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IntegrationsDashboard from './IntegrationsDashboard';
import './index.css';

// Custom MUI theme with premium SaaS design
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'hsl(217, 91%, 60%)',
      light: 'hsl(217, 91%, 95%)',
      dark: 'hsl(217, 91%, 55%)',
    },
    secondary: {
      main: 'hsl(215, 15%, 96%)',
      dark: 'hsl(215, 15%, 92%)',
    },
    background: {
      default: 'hsl(0, 0%, 100%)',
      paper: 'hsl(0, 0%, 100%)',
    },
    text: {
      primary: 'hsl(215, 25%, 15%)',
      secondary: 'hsl(215, 15%, 45%)',
    },
    success: {
      main: 'hsl(142, 76%, 36%)',
      light: 'hsl(142, 76%, 95%)',
    },
    error: {
      main: 'hsl(0, 84%, 60%)',
      light: 'hsl(0, 84%, 95%)',
    },
    warning: {
      main: 'hsl(38, 92%, 50%)',
      light: 'hsl(38, 92%, 95%)',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
          padding: '10px 24px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, hsl(217, 91%, 60%) 0%, hsl(262, 83%, 64%) 100%)',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:hover': {
            background: 'linear-gradient(135deg, hsl(217, 91%, 55%) 0%, hsl(262, 83%, 60%) 100%)',
            boxShadow: '0 0 0 1px hsl(217, 91%, 60%, 0.1), 0 4px 12px -2px hsl(217, 91%, 60%, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, hsl(0, 0%, 100%) 0%, hsl(215, 10%, 99%) 100%)',
          boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
          border: '1px solid hsl(215, 20%, 90%)',
          borderRadius: '12px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'hsl(215, 20%, 96%)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'hsl(217, 91%, 60%)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'hsl(217, 91%, 60%)',
              borderWidth: '2px',
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IntegrationsDashboard />
    </ThemeProvider>
  );
}

export default App;
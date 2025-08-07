import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  CircularProgress,
  Box,
} from '@mui/material';
import { CheckCircle, AlertCircle } from 'lucide-react';

const IntegrationForm = ({ integration, currentStatus, onStatusChange }) => {
  const [credentials, setCredentials] = useState({ apiKey: '', workspace: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!credentials.apiKey.trim()) {
      setError('API Key is required');
      setIsLoading(false);
      return;
    }

    // Simulate successful connection
    onStatusChange(integration.id, 'connected');
    setIsLoading(false);
  };

  const handleInputChange = (field) => (event) => {
    setCredentials(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const isConnected = currentStatus === 'connected';

  return (
    <Card
      sx={{
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Connect to {integration.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Enter your credentials to establish connection
          </Typography>
        }
      />
      <CardContent>
        <Stack spacing={3}>
          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              icon={<AlertCircle size={16} />}
              sx={{
                backgroundColor: 'hsl(0, 84%, 95%)',
                color: 'hsl(0, 84%, 60%)',
                border: '1px solid hsl(0, 84%, 60%, 0.3)',
                borderRadius: '8px',
                '& .MuiAlert-icon': {
                  color: 'hsl(0, 84%, 60%)',
                },
              }}
            >
              {error}
            </Alert>
          )}

          {/* Success Alert */}
          {isConnected && (
            <Alert
              severity="success"
              icon={<CheckCircle size={16} />}
              sx={{
                backgroundColor: 'hsl(142, 76%, 95%)',
                color: 'hsl(142, 76%, 36%)',
                border: '1px solid hsl(142, 76%, 36%, 0.3)',
                borderRadius: '8px',
                '& .MuiAlert-icon': {
                  color: 'hsl(142, 76%, 36%)',
                },
              }}
            >
              Successfully connected to {integration.name}!
            </Alert>
          )}

          {/* API Key Field */}
          <Box>
            <Typography
              component="label"
              variant="body2"
              sx={{
                fontWeight: 500,
                color: 'hsl(215, 25%, 15%)',
                mb: 1,
                display: 'block',
              }}
            >
              API Key
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Enter your API key"
              value={credentials.apiKey}
              onChange={handleInputChange('apiKey')}
              disabled={isConnected}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.875rem',
                  '&.Mui-disabled': {
                    backgroundColor: 'hsl(215, 15%, 96%)',
                  },
                },
              }}
            />
          </Box>

          {/* Workspace Field */}
          <Box>
            <Typography
              component="label"
              variant="body2"
              sx={{
                fontWeight: 500,
                color: 'hsl(215, 25%, 15%)',
                mb: 1,
                display: 'block',
              }}
            >
              Workspace (Optional)
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter workspace ID"
              value={credentials.workspace}
              onChange={handleInputChange('workspace')}
              disabled={isConnected}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.875rem',
                  '&.Mui-disabled': {
                    backgroundColor: 'hsl(215, 15%, 96%)',
                  },
                },
              }}
            />
          </Box>

          {/* Connect Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleConnect}
            disabled={isLoading || isConnected}
            sx={{
              height: '48px',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              background: isConnected
                ? 'linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(142, 76%, 40%) 100%)'
                : 'linear-gradient(135deg, hsl(217, 91%, 60%) 0%, hsl(262, 83%, 64%) 100%)',
              '&:hover': {
                background: isConnected
                  ? 'linear-gradient(135deg, hsl(142, 76%, 40%) 0%, hsl(142, 76%, 44%) 100%)'
                  : 'linear-gradient(135deg, hsl(217, 91%, 55%) 0%, hsl(262, 83%, 60%) 100%)',
              },
              '&.Mui-disabled': {
                background: isConnected
                  ? 'linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(142, 76%, 40%) 100%)'
                  : 'hsl(215, 15%, 96%)',
                color: isConnected ? 'white' : 'hsl(215, 15%, 45%)',
              },
            }}
            startIcon={
              isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : isConnected ? (
                <CheckCircle size={16} />
              ) : null
            }
          >
            {isLoading
              ? 'Connecting...'
              : isConnected
              ? 'Connected'
              : 'Connect Integration'
            }
          </Button>

          {/* Helper Text */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: '0.75rem',
              lineHeight: 1.4,
              textAlign: 'center',
              mt: 2,
            }}
          >
            Your credentials are securely encrypted and never stored in plain text.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default IntegrationForm;
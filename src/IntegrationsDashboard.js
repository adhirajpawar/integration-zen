import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Divider,
  Stack,
  alpha,
} from '@mui/material';
import {
  Database,
  Table,
  Zap,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
  Settings,
} from 'lucide-react';
import IntegrationForm from './integration-form';
import DataForm from './data-form';

const integrations = [
  {
    id: 'notion',
    name: 'Notion',
    icon: <Database size={20} />,
    description: 'Connect to your Notion databases and pages',
    color: '#000000',
    status: 'disconnected'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    icon: <Table size={20} />,
    description: 'Import bases and tables from Airtable',
    color: '#f97316',
    status: 'disconnected'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: <Zap size={20} />,
    description: 'Automate workflows with Zapier integrations',
    color: '#fb923c',
    status: 'disconnected'
  }
];

const IntegrationsDashboard = () => {
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [integrationStatuses, setIntegrationStatuses] = useState(
    integrations.reduce((acc, integration) => {
      acc[integration.id] = integration.status;
      return acc;
    }, {})
  );

  const getStatusChip = (status) => {
    switch (status) {
      case 'connected':
        return (
          <Chip
            icon={<CheckCircle size={12} />}
            label="Connected"
            size="small"
            sx={{
              backgroundColor: 'hsl(142, 76%, 95%)',
              color: 'hsl(142, 76%, 36%)',
              border: '1px solid hsl(142, 76%, 36%, 0.3)',
              fontSize: '0.75rem',
              height: '24px',
            }}
          />
        );
      case 'error':
        return (
          <Chip
            icon={<AlertCircle size={12} />}
            label="Error"
            size="small"
            sx={{
              backgroundColor: 'hsl(0, 84%, 95%)',
              color: 'hsl(0, 84%, 60%)',
              border: '1px solid hsl(0, 84%, 60%, 0.3)',
              fontSize: '0.75rem',
              height: '24px',
            }}
          />
        );
      default:
        return (
          <Chip
            label="Not connected"
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.75rem',
              height: '24px',
              color: 'hsl(215, 15%, 45%)',
            }}
          />
        );
    }
  };

  const updateIntegrationStatus = (integrationId, status) => {
    setIntegrationStatuses(prev => ({
      ...prev,
      [integrationId]: status
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(215, 15%, 98%) 100%)',
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, animation: 'fadeIn 0.3s ease-out' }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, hsl(217, 91%, 60%) 0%, hsl(262, 83%, 64%) 100%)',
                borderRadius: '12px',
              }}
            >
              <LinkIcon size={20} color="white" />
            </Avatar>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'hsl(215, 25%, 15%)',
                fontSize: { xs: '1.875rem', md: '2.25rem' },
              }}
            >
              Integrations Dashboard
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{
              color: 'hsl(215, 15%, 45%)',
              fontSize: '1.125rem',
            }}
          >
            Connect and manage your third-party integrations seamlessly.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Integration Selector */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
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
                  avatar={
                    <Settings size={20} color="hsl(215, 25%, 15%)" />
                  }
                  title={
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Select Integration
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" color="text.secondary">
                      Choose a platform to connect with
                    </Typography>
                  }
                />
                <CardContent>
                  <Stack spacing={2}>
                    {integrations.map((integration) => (
                      <Card
                        key={integration.id}
                        variant="outlined"
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: selectedIntegration?.id === integration.id
                            ? '2px solid hsl(217, 91%, 60%)'
                            : '1px solid hsl(215, 20%, 90%)',
                          backgroundColor: selectedIntegration?.id === integration.id
                            ? 'hsl(217, 91%, 95%)'
                            : 'transparent',
                          '&:hover': {
                            borderColor: 'hsl(217, 91%, 60%, 0.5)',
                            transform: 'translateY(-1px)',
                          },
                        }}
                        onClick={() => setSelectedIntegration(integration)}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: integration.color,
                                borderRadius: '8px',
                              }}
                            >
                              {integration.icon}
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 0.5 }}
                              >
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {integration.name}
                                </Typography>
                                {getStatusChip(integrationStatuses[integration.id])}
                              </Stack>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                              >
                                {integration.description}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Integration Form */}
              {selectedIntegration && (
                <Box sx={{ animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                  <IntegrationForm
                    integration={selectedIntegration}
                    currentStatus={integrationStatuses[selectedIntegration.id]}
                    onStatusChange={updateIntegrationStatus}
                  />
                </Box>
              )}
            </Stack>
          </Grid>

          {/* Data Loading & Results */}
          <Grid item xs={12} lg={8}>
            {selectedIntegration ? (
              <DataForm
                integration={selectedIntegration}
                isConnected={integrationStatuses[selectedIntegration.id] === 'connected'}
              />
            ) : (
              <Card
                sx={{
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardContent>
                  <Stack alignItems="center" spacing={3}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        backgroundColor: 'hsl(215, 15%, 96%)',
                        borderRadius: '50%',
                      }}
                    >
                      <LinkIcon size={32} color="hsl(215, 15%, 45%)" />
                    </Avatar>
                    <Box textAlign="center">
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        No Integration Selected
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ maxWidth: '400px' }}
                      >
                        Choose an integration from the sidebar to get started with connecting your data sources.
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default IntegrationsDashboard;
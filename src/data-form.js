import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Box,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Database,
  Table,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Loader2,
  RefreshCw,
  Trash2,
} from 'lucide-react';

const DataForm = ({ integration, isConnected }) => {
  const [loadingData, setLoadingData] = useState(false);
  const [dataItems, setDataItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState(new Set());

  const handleLoadData = async () => {
    if (!isConnected) return;

    setLoadingData(true);

    // Simulate data loading
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockData = [
      {
        id: '1',
        name: 'Projects Database',
        type: 'database',
        lastUpdated: '2 hours ago',
        icon: <Database size={16} />,
        records: 156,
        parent: null,
      },
      {
        id: '2',
        name: 'Tasks Table',
        type: 'table',
        parent: 'Projects Database',
        lastUpdated: '1 hour ago',
        icon: <Table size={16} />,
        records: 423,
      },
      {
        id: '3',
        name: 'Team Members',
        type: 'base',
        lastUpdated: '30 minutes ago',
        icon: <Database size={16} />,
        records: 28,
        parent: null,
      },
      {
        id: '4',
        name: 'Client Contacts',
        type: 'table',
        parent: 'Team Members',
        lastUpdated: '15 minutes ago',
        icon: <Table size={16} />,
        records: 89,
      },
    ];

    setDataItems(mockData);
    setLoadingData(false);
  };

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const clearData = () => {
    setDataItems([]);
    setExpandedItems(new Set());
  };

  const getTypeChip = (type) => {
    const colors = {
      database: { bg: 'hsl(217, 91%, 95%)', color: 'hsl(217, 91%, 60%)' },
      table: { bg: 'hsl(262, 83%, 95%)', color: 'hsl(262, 83%, 64%)' },
      base: { bg: 'hsl(142, 76%, 95%)', color: 'hsl(142, 76%, 36%)' },
    };

    const typeColor = colors[type] || colors.database;

    return (
      <Chip
        label={type}
        size="small"
        sx={{
          backgroundColor: typeColor.bg,
          color: typeColor.color,
          border: `1px solid ${typeColor.color}30`,
          fontSize: '0.75rem',
          height: '20px',
          textTransform: 'capitalize',
          fontWeight: 500,
        }}
      />
    );
  };

  return (
    <Stack spacing={3}>
      {/* Load Data Section */}
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
          avatar={<Database size={20} color="hsl(215, 25%, 15%)" />}
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Load Data
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              {isConnected
                ? 'Fetch data from your connected integration'
                : 'Connect an integration first to load data'
              }
            </Typography>
          }
        />
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleLoadData}
              disabled={!isConnected || loadingData}
              sx={{
                height: '48px',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: '8px',
                background: dataItems.length > 0
                  ? 'transparent'
                  : 'linear-gradient(135deg, hsl(217, 91%, 60%) 0%, hsl(262, 83%, 64%) 100%)',
                color: dataItems.length > 0 ? 'hsl(217, 91%, 60%)' : 'white',
                border: dataItems.length > 0 ? '1px solid hsl(215, 20%, 90%)' : 'none',
                '&:hover': {
                  background: dataItems.length > 0
                    ? 'hsl(215, 15%, 96%)'
                    : 'linear-gradient(135deg, hsl(217, 91%, 55%) 0%, hsl(262, 83%, 60%) 100%)',
                },
              }}
              startIcon={
                loadingData ? (
                  <CircularProgress size={16} color="inherit" />
                ) : dataItems.length > 0 ? (
                  <RefreshCw size={16} />
                ) : (
                  <Database size={16} />
                )
              }
            >
              {loadingData
                ? 'Loading Data...'
                : dataItems.length > 0
                ? 'Reload Data'
                : 'Load Data'
              }
            </Button>

            {dataItems.length > 0 && (
              <Button
                variant="outlined"
                onClick={clearData}
                startIcon={<Trash2 size={16} />}
                sx={{
                  height: '48px',
                  borderColor: 'hsl(215, 20%, 90%)',
                  color: 'hsl(215, 15%, 45%)',
                  '&:hover': {
                    borderColor: 'hsl(0, 84%, 60%)',
                    backgroundColor: 'hsl(0, 84%, 95%)',
                    color: 'hsl(0, 84%, 60%)',
                  },
                }}
              >
                Clear Data
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Results Viewer */}
      {dataItems.length > 0 && (
        <Card
          sx={{
            animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <CardHeader
            avatar={<Table size={20} color="hsl(215, 25%, 15%)" />}
            title={
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Data Results
                </Typography>
                <Chip
                  label={`${dataItems.length} items found`}
                  size="small"
                  sx={{
                    backgroundColor: 'hsl(142, 76%, 95%)',
                    color: 'hsl(142, 76%, 36%)',
                    border: '1px solid hsl(142, 76%, 36%, 0.3)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                />
              </Stack>
            }
            subheader={
              <Typography variant="body2" color="text.secondary">
                Data retrieved from {integration.name}
              </Typography>
            }
          />
          <CardContent>
            <Stack spacing={1}>
              {dataItems.map((item) => (
                <Box key={item.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid hsl(215, 20%, 90%)',
                      '&:hover': {
                        borderColor: 'hsl(217, 91%, 60%, 0.5)',
                        backgroundColor: 'hsl(215, 15%, 98%)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                    onClick={() => toggleExpanded(item.id)}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton
                          size="small"
                          sx={{ color: 'hsl(215, 15%, 45%)' }}
                        >
                          {expandedItems.has(item.id) ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </IconButton>

                        <Box
                          sx={{
                            p: 1,
                            borderRadius: '6px',
                            backgroundColor: 'hsl(217, 91%, 95%)',
                            color: 'hsl(217, 91%, 60%)',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.name}
                            </Typography>
                            {getTypeChip(item.type)}
                          </Stack>
                          {item.parent && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: '0.75rem' }}
                            >
                              Parent: {item.parent}
                            </Typography>
                          )}
                        </Box>

                        <Box textAlign="right">
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem', display: 'block' }}
                          >
                            Updated {item.lastUpdated}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                          >
                            {item.records} records
                          </Typography>
                        </Box>

                        <IconButton
                          size="small"
                          sx={{
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            '.MuiCard-root:hover &': {
                              opacity: 1,
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle external link
                          }}
                        >
                          <ExternalLink size={16} />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Card>

                  <Collapse in={expandedItems.has(item.id)}>
                    <Box
                      sx={{
                        ml: 6,
                        mt: 1,
                        p: 2,
                        backgroundColor: 'hsl(215, 15%, 96%, 0.5)',
                        borderRadius: '8px',
                        border: '1px solid hsl(215, 20%, 90%)',
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            ID:
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ ml: 1, fontFamily: 'monospace', fontSize: '0.75rem' }}
                          >
                            {item.id}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Type:
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ ml: 1, textTransform: 'capitalize' }}
                          >
                            {item.type}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Last Updated:
                          </Typography>
                          <Typography variant="caption" sx={{ ml: 1 }}>
                            {item.lastUpdated}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Source:
                          </Typography>
                          <Typography variant="caption" sx={{ ml: 1 }}>
                            {integration.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Collapse>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      <style jsx>{`
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
    </Stack>
  );
};

export default DataForm;
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Database, 
  Table, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
  Settings,
  ExternalLink
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  status?: 'connected' | 'error' | 'disconnected';
}

interface DataItem {
  id: string;
  name: string;
  type: 'table' | 'base' | 'database';
  parent?: string;
  lastUpdated?: string;
  icon?: React.ReactNode;
}

const integrations: Integration[] = [
  {
    id: 'notion',
    name: 'Notion',
    icon: <Database className="w-5 h-5" />,
    description: 'Connect to your Notion databases and pages',
    color: 'bg-gray-900 text-white',
    status: 'disconnected'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    icon: <Table className="w-5 h-5" />,
    description: 'Import bases and tables from Airtable',
    color: 'bg-orange-500 text-white',
    status: 'disconnected'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: <Zap className="w-5 h-5" />,
    description: 'Automate workflows with Zapier integrations',
    color: 'bg-orange-400 text-white',
    status: 'disconnected'
  }
];

const IntegrationsDashboard: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [credentials, setCredentials] = useState({ apiKey: '', workspace: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleConnect = async () => {
    if (!selectedIntegration) return;
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!credentials.apiKey) {
      setError('API Key is required');
      setIsLoading(false);
      return;
    }
    
    // Update integration status
    selectedIntegration.status = 'connected';
    setIsLoading(false);
  };

  const handleLoadData = async () => {
    if (!selectedIntegration || selectedIntegration.status !== 'connected') return;
    
    setLoadingData(true);
    setError(null);
    
    // Simulate data loading
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockData: DataItem[] = [
      {
        id: '1',
        name: 'Projects Database',
        type: 'database',
        lastUpdated: '2 hours ago',
        icon: <Database className="w-4 h-4" />
      },
      {
        id: '2', 
        name: 'Tasks Table',
        type: 'table',
        parent: 'Projects Database',
        lastUpdated: '1 hour ago',
        icon: <Table className="w-4 h-4" />
      },
      {
        id: '3',
        name: 'Team Members',
        type: 'base',
        lastUpdated: '30 minutes ago',
        icon: <Database className="w-4 h-4" />
      }
    ];
    
    setDataItems(mockData);
    setLoadingData(false);
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="outline" className="bg-success-light text-success border-success/30"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/30"><AlertCircle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Not connected</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Integrations Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">Connect and manage your third-party integrations seamlessly.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Integration Selector */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Select Integration
                </CardTitle>
                <CardDescription>Choose a platform to connect with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer card-interactive ${
                      selectedIntegration?.id === integration.id
                        ? 'border-primary bg-primary-light'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedIntegration(integration)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${integration.color}`}>
                        {integration.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-sm">{integration.name}</h3>
                          {getStatusBadge(integration.status)}
                        </div>
                        <p className="text-xs text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Connection Form */}
            {selectedIntegration && (
              <Card className="card-elevated slide-up">
                <CardHeader>
                  <CardTitle className="text-lg">Connect to {selectedIntegration.name}</CardTitle>
                  <CardDescription>Enter your credentials to establish connection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-destructive-light border border-destructive/30 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter your API key"
                      value={credentials.apiKey}
                      onChange={(e) => setCredentials(prev => ({ ...prev, apiKey: e.target.value }))}
                      className="focus-ring"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workspace">Workspace (Optional)</Label>
                    <Input
                      id="workspace"
                      placeholder="Enter workspace ID"
                      value={credentials.workspace}
                      onChange={(e) => setCredentials(prev => ({ ...prev, workspace: e.target.value }))}
                      className="focus-ring"
                    />
                  </div>

                  <Button 
                    onClick={handleConnect}
                    disabled={isLoading || selectedIntegration.status === 'connected'}
                    className="w-full"
                    variant="premium"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Connecting...
                      </>
                    ) : selectedIntegration.status === 'connected' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Connected
                      </>
                    ) : (
                      'Connect Integration'
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Data Loading & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Load Data Section */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Load Data
                </CardTitle>
                <CardDescription>
                  {selectedIntegration?.status === 'connected' 
                    ? 'Fetch data from your connected integration'
                    : 'Connect an integration first to load data'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleLoadData}
                    disabled={!selectedIntegration || selectedIntegration.status !== 'connected' || loadingData}
                    variant={dataItems.length > 0 ? "outline" : "default"}
                    size="lg"
                  >
                    {loadingData ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading Data...
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4" />
                        {dataItems.length > 0 ? 'Reload Data' : 'Load Data'}
                      </>
                    )}
                  </Button>
                  
                  {dataItems.length > 0 && (
                    <Button variant="outline" onClick={() => setDataItems([])}>
                      Clear Data
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Viewer */}
            {dataItems.length > 0 && (
              <Card className="card-elevated slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Table className="w-5 h-5" />
                      Data Results
                    </div>
                    <Badge variant="outline" className="bg-success-light text-success">
                      {dataItems.length} items found
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Data retrieved from {selectedIntegration?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {dataItems.map((item) => (
                      <div key={item.id} className="group">
                        <div 
                          className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 cursor-pointer"
                          onClick={() => toggleExpanded(item.id)}
                        >
                          <div className="text-muted-foreground">
                            {expandedItems.has(item.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 flex-1">
                            <div className="p-2 rounded-md bg-primary-light text-primary">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {item.type}
                                </Badge>
                              </div>
                              {item.parent && (
                                <p className="text-xs text-muted-foreground">
                                  Parent: {item.parent}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">
                                Updated {item.lastUpdated}
                              </p>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {expandedItems.has(item.id) && (
                          <div className="ml-10 mt-2 p-4 bg-muted/30 rounded-lg border border-border">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-muted-foreground">ID:</span>
                                <span className="ml-2 font-mono text-xs">{item.id}</span>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Type:</span>
                                <span className="ml-2 capitalize">{item.type}</span>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Last Updated:</span>
                                <span className="ml-2">{item.lastUpdated}</span>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Source:</span>
                                <span className="ml-2">{selectedIntegration?.name}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!selectedIntegration && (
              <Card className="card-elevated">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <LinkIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Integration Selected</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Choose an integration from the sidebar to get started with connecting your data sources.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsDashboard;
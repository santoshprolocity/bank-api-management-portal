import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Shield, Users, CreditCard, FileText, Database, TrendingUp, CheckCircle, Clock, Download, Bell, Settings, Filter, BookOpen, Lock, BarChart3, XCircle, AlertTriangle } from 'lucide-react';

const BankAPIPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAPI, setSelectedAPI] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState('Production');
  const [showAlerts, setShowAlerts] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const categories = [
    { id: 'All', name: 'All APIs', icon: Database, color: 'bg-gray-500' },
    { id: 'KYC', name: 'KYC & Verification', icon: Shield, color: 'bg-blue-500' },
    { id: 'Customer', name: 'Customer Management', icon: Users, color: 'bg-green-500' },
    { id: 'Payments', name: 'Payments & Transactions', icon: CreditCard, color: 'bg-purple-500' },
    { id: 'Compliance', name: 'Compliance & Regulatory', icon: FileText, color: 'bg-red-500' },
    { id: 'Analytics', name: 'Analytics & Reporting', icon: TrendingUp, color: 'bg-yellow-500' },
    { id: 'ThirdParty', name: '3rd Party Integrations', icon: ExternalLink, color: 'bg-orange-500' }
  ];

  const apis = [
    {
      id: 1,
      name: 'KYC Validation API',
      category: 'KYC',
      provider: 'Internal',
      version: 'v2.1',
      endpoint: '/api/v2/kyc/validate',
      method: 'POST',
      description: 'Validates customer KYC documents including Aadhaar, PAN, and other identity proofs as per RBI guidelines',
      usage: { today: 1247, month: 38921, limit: 100000 },
      status: 'active',
      responseTime: '245ms',
      successRate: 99.7,
      compliance: ['RBI', 'PMLA', 'Aadhaar Act'],
      rateLimit: '1000/hour',
      sla: '99.9%',
      owner: 'Digital Banking Team',
      securityLevel: 'High',
      dataClassification: 'Confidential',
      lastUpdated: '2025-10-15',
      costPerCall: '₹0.50',
      authentication: 'OAuth 2.0 + API Key'
    },
    {
      id: 2,
      name: 'PAN Validation API',
      category: 'KYC',
      provider: 'NSDL (3rd Party)',
      version: 'v1.5',
      endpoint: '/api/v1/pan/verify',
      method: 'POST',
      description: 'Real-time PAN card validation against Income Tax Department database via NSDL',
      usage: { today: 2156, month: 67234, limit: 150000 },
      status: 'active',
      responseTime: '312ms',
      successRate: 98.9,
      compliance: ['Income Tax Act', 'PMLA'],
      rateLimit: '500/hour',
      thirdParty: true,
      sla: '99.5%',
      owner: 'Compliance Team',
      securityLevel: 'High',
      dataClassification: 'Confidential',
      lastUpdated: '2025-09-22',
      costPerCall: '₹2.00',
      authentication: 'API Key'
    },
    {
      id: 3,
      name: 'UPI Payment API',
      category: 'Payments',
      provider: 'NPCI (3rd Party)',
      version: 'v3.5',
      endpoint: '/api/v3/payments/upi',
      method: 'POST',
      description: 'UPI payment processing for collect requests and money transfers',
      usage: { today: 12456, month: 398734, limit: 1500000 },
      status: 'active',
      responseTime: '534ms',
      successRate: 98.7,
      compliance: ['NPCI UPI', 'RBI'],
      rateLimit: '3000/hour',
      thirdParty: true,
      sla: '99.7%',
      owner: 'Payments Team',
      securityLevel: 'Critical',
      dataClassification: 'Highly Confidential',
      lastUpdated: '2025-10-12',
      costPerCall: '₹0.30',
      authentication: 'OAuth 2.0 + UPI PIN'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Usage Alert',
      message: 'UPI Payment API has reached 85% of monthly quota',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'error',
      title: 'SLA Breach',
      message: 'Response time exceeded SLA threshold',
      timestamp: '5 hours ago'
    }
  ];

  const environments = ['Production', 'Staging', 'Development', 'Sandbox'];

  const filteredAPIs = useMemo(() => {
    return apis.filter(api => {
      const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          api.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || api.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const stats = {
    totalAPIs: apis.length,
    activeAPIs: apis.filter(a => a.status === 'active').length,
    thirdPartyAPIs: apis.filter(a => a.thirdParty).length,
    avgResponseTime: 400,
    totalCalls: 1200,
    criticalAPIs: apis.filter(a => a.securityLevel === 'Critical').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-md border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">API Management Portal</h1>
                <a
                  href="https://abhiojha.github.io/bank-api-management-portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  Live URL
                </a>
              </div>
              <p className="text-gray-600 mt-1">Banking API Catalog & Usage Monitoring</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="text-gray-600" size={24} />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="text-gray-600" size={24} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <BookOpen size={20} />
                <span>Documentation</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Environment:</span>
            <div className="flex gap-2">
              {environments.map(env => (
                <button
                  key={env}
                  onClick={() => setSelectedEnvironment(env)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedEnvironment === env
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {showAlerts && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Bell size={20} />
                Alerts & Notifications
              </h3>
              <button onClick={() => setShowAlerts(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${
                    alert.type === 'error' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                  }`}
                >
                  {alert.type === 'error' ? (
                    <XCircle className="text-red-500 mt-0.5" size={20} />
                  ) : (
                    <AlertTriangle className="text-yellow-500 mt-0.5" size={20} />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total APIs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalAPIs}</p>
              </div>
              <Database className="text-blue-500" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active APIs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeAPIs}</p>
              </div>
              <CheckCircle className="text-green-500" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">3rd Party</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.thirdPartyAPIs}</p>
              </div>
              <ExternalLink className="text-orange-500" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Avg Response</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.avgResponseTime}ms</p>
              </div>
              <Clock className="text-purple-500" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Calls</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCalls}K</p>
              </div>
              <BarChart3 className="text-indigo-500" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Critical APIs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.criticalAPIs}</p>
              </div>
              <Lock className="text-red-500" size={40} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search APIs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
              <Filter size={20} />
              Filters
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              <Download size={20} />
              Export
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat.id
                      ? `${cat.color} text-white shadow-md`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAPIs.map(api => (
            <div
              key={api.id}
              onClick={() => setSelectedAPI(api)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 hover:border-blue-400"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {api.securityLevel === 'Critical' && <Lock className="text-red-500" size={16} />}
                      <h3 className="text-lg font-bold text-gray-900">{api.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                        {api.version}
                      </span>
                      {api.thirdParty && (
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-medium flex items-center gap-1">
                          <ExternalLink size={12} /> 3rd Party
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        api.securityLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                        api.securityLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {api.securityLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{api.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Provider:</span>
                    <span className="font-medium text-gray-900">{api.provider}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Response:</span>
                    <span className="font-medium text-gray-900">{api.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Success Rate:</span>
                    <span className="font-medium text-green-600">{api.successRate}%</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">Monthly Usage</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-gray-900">{api.usage.month.toLocaleString()}</span>
                    <span className="text-gray-500">of {api.usage.limit.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(api.usage.month / api.usage.limit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAPI && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAPI(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedAPI.name}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {selectedAPI.version}
                    </span>
                    {selectedAPI.thirdParty && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        3rd Party
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => setSelectedAPI(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="border-b mb-6">
                <div className="flex gap-4">
                  {['overview', 'technical', 'security'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-2 font-medium capitalize ${
                        activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedAPI.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Provider</h3>
                      <p className="text-gray-600">{selectedAPI.provider}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Owner</h3>
                      <p className="text-gray-600">{selectedAPI.owner}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'technical' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Endpoint</h3>
                    <code className="block bg-gray-100 p-3 rounded text-sm">{selectedAPI.endpoint}</code>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Authentication</h3>
                    <p className="text-gray-600">{selectedAPI.authentication}</p>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Security Level</h3>
                    <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold">
                      {selectedAPI.securityLevel}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAPI.compliance.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAPIPortal;
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from CI/CD Pipeline! , Gitops',
    environment: environment,
    version: process.env.APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: environment,
    uptime: process.uptime()
  });
});

app.get('/version', (req, res) => {
  res.json({
    version: process.env.APP_VERSION || '1.0.0',
    environment: environment
  });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port} in ${environment} mode`);
});

module.exports = { app, server };console.log('Testing CI/CD');
// Testing CI/CD pipeline

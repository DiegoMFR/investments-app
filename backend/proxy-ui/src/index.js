const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3002;

const TARGET = 'http://localhost:3001';

// Token validation only for overview root (not assets)
app.use((req, res, next) => {
  // Only apply token validation to exact /product/overview/:clientId (no deeper paths)
  const match = req.path.match(/^\/product\/overview\/([^\/]+)\/?$/);
  if (match) {
    const token = req.query.token;
    console.log('Protected route token:', token);
    if (!token) {
      console.error('Token is missing');
      return res.status(401).json({ error: 'Token is required' });
    }
  }
  next();
});

// Proxy the protected overview page
app.use(
  '/product/overview/:clientId',
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      const token = req.query.token;
      if (token) {
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
      }
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).json({ error: 'Proxy error occurred' });
    }
  })
);

// Proxy for static assets (no auth)
app.use(
  '/product/overview/content/mybnd',
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});

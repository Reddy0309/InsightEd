// src/setupProxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Change this to your backend server address
      changeOrigin: true,
    })
  );
};

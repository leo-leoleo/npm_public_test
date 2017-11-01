/* eslint-disable global-require */
const proxy = require('http-proxy-middleware');
const logger = require('../logger');

// Proxy middleware
const addProxyMiddlewares = (app, options) => {
  try {
    const services = require(options.config);
    Object.keys(services).forEach((key) => {
      const service = services[key];
      const api = service.api;
      const loglevel = service.logLevel || 'info';
      const Proxy = proxy({
        target: api,
        logLevel: loglevel,
        changeOrigin: true,
      });

      service.endpoints.forEach((endpoint) => {
        app.all(endpoint, Proxy);
      });

      // log
      logger.proxyReversed(api, service.endpoints);
    });
  } catch (e) {
    logger.error('\n\nproxy.json not found.\n');
  }
};

/**
 * Proxy middleware
 */
module.exports = (app, options) => {
  addProxyMiddlewares(app, options);
  return app;
};

const userRoutes = require('../routes/user.routes');

const setupRoutes = (app) => {
  // API routes
  app.use('/api/users', userRoutes);
  
  // Default route
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to Express Example API',
      version: '1.0.0'
    });
  });
  
  // 404 handler - should be after all routes
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  });
};

module.exports = setupRoutes;
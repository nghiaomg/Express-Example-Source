const userRoutes = require('../routes/user.routes');
const articleRoutes = require('../routes/article.routes');
const categoryRoutes = require('../routes/category.routes');
const tagRoutes = require('../routes/tag.routes');

const setupRoutes = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/articles', articleRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/tags', tagRoutes);
  
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to Express Example API',
      version: '1.0.0'
    });
  });
  
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  });
};

module.exports = setupRoutes;
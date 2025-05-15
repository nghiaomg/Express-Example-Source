const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { validateCategory } = require('../middleware/validators');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/with-article-count', categoryController.getCategoriesWithArticleCount);
router.get('/:id', categoryController.getCategoryById);
router.get('/slug/:slug', categoryController.getCategoryBySlug);

// Protected routes (Admin only)
router.post('/', 
  authenticate, 
  authorize(['admin']), 
  validateCategory, 
  categoryController.createCategory
);

router.put('/:id', 
  authenticate, 
  authorize(['admin']), 
  validateCategory, 
  categoryController.updateCategory
);

router.delete('/:id', 
  authenticate, 
  authorize(['admin']), 
  categoryController.deleteCategory
);

module.exports = router; 
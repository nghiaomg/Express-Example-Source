const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');
const { validateCategory } = require('../middleware/validators');

router.get('/', categoryController.getAllCategories);
router.get('/with-article-count', categoryController.getCategoriesWithArticleCount);
router.get('/:id', categoryController.getCategoryById);
router.get('/slug/:slug', categoryController.getCategoryBySlug);

router.post('/', 
  authenticate, 
  isAdmin, 
  validateCategory, 
  categoryController.createCategory
);

router.put('/:id', 
  authenticate, 
  isAdmin, 
  validateCategory, 
  categoryController.updateCategory
);

router.delete('/:id', 
  authenticate, 
  isAdmin, 
  categoryController.deleteCategory
);

module.exports = router; 
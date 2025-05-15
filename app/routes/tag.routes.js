const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { validateTag } = require('../middleware/validators');

// Public routes
router.get('/', tagController.getAllTags);
router.get('/with-article-count', tagController.getTagsWithArticleCount);
router.get('/:id', tagController.getTagById);
router.get('/slug/:slug', tagController.getTagBySlug);

// Protected routes (Admin only)
router.post('/', 
  authenticate, 
  authorize(['admin']), 
  validateTag, 
  tagController.createTag
);

router.put('/:id', 
  authenticate, 
  authorize(['admin']), 
  validateTag, 
  tagController.updateTag
);

router.delete('/:id', 
  authenticate, 
  authorize(['admin']), 
  tagController.deleteTag
);

module.exports = router; 
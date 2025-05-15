const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');
const { validateTag } = require('../middleware/validators');

router.get('/', tagController.getAllTags);
router.get('/with-article-count', tagController.getTagsWithArticleCount);
router.get('/:id', tagController.getTagById);
router.get('/slug/:slug', tagController.getTagBySlug);

router.post('/', 
  authenticate, 
  isAdmin, 
  validateTag, 
  tagController.createTag
);

router.put('/:id', 
  authenticate, 
  isAdmin, 
  validateTag, 
  tagController.updateTag
);

router.delete('/:id', 
  authenticate, 
  isAdmin, 
  tagController.deleteTag
);

module.exports = router; 
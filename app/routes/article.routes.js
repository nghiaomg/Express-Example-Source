const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', articleController.getAllArticles);
router.get('/trending', articleController.getTrendingArticles);
router.get('/search', articleController.searchArticles);
router.get('/:id', articleController.getArticleById);
router.get('/slug/:slug', articleController.getArticleBySlug);
router.get('/:id/related', articleController.getRelatedArticles);

router.post('/', authMiddleware.authenticate, authMiddleware.isAdmin, articleController.createArticle);
router.put('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, articleController.updateArticle);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, articleController.deleteArticle);

module.exports = router; 
const articleService = require('../services/article.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const articleController = {
  getAllArticles: async (req, res) => {
    try {
      const result = await articleService.getAllArticles(req.query);
      return successResponse(res, 'Articles retrieved successfully', result);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getArticleById: async (req, res) => {
    try {
      const article = await articleService.getArticleById(req.params.id);
      if (!article) {
        return errorResponse(res, 'Article not found', 404);
      }
      
      await articleService.incrementViews(req.params.id);
      
      return successResponse(res, 'Article retrieved successfully', article);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getArticleBySlug: async (req, res) => {
    try {
      const article = await articleService.getArticleBySlug(req.params.slug);
      if (!article) {
        return errorResponse(res, 'Article not found', 404);
      }
      
      await articleService.incrementViews(article._id);
      
      return successResponse(res, 'Article retrieved successfully', article);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  createArticle: async (req, res) => {
    try {
      const articleData = req.body;
      const newArticle = await articleService.createArticle(articleData);
      return successResponse(res, 'Article created successfully', newArticle, 201);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  updateArticle: async (req, res) => {
    try {
      const articleId = req.params.id;
      const articleData = req.body;
      const updatedArticle = await articleService.updateArticle(articleId, articleData);
      if (!updatedArticle) {
        return errorResponse(res, 'Article not found', 404);
      }
      return successResponse(res, 'Article updated successfully', updatedArticle);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const articleId = req.params.id;
      const result = await articleService.deleteArticle(articleId);
      if (!result) {
        return errorResponse(res, 'Article not found', 404);
      }
      return successResponse(res, 'Article deleted successfully', null);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getTrendingArticles: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const articles = await articleService.getTrendingArticles(limit);
      return successResponse(res, 'Trending articles retrieved successfully', articles);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getRelatedArticles: async (req, res) => {
    try {
      const articleId = req.params.id;
      const limit = parseInt(req.query.limit) || 5;
      const articles = await articleService.getRelatedArticles(articleId, limit);
      return successResponse(res, 'Related articles retrieved successfully', articles);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  searchArticles: async (req, res) => {
    try {
      const { q, limit } = req.query;
      if (!q) {
        return errorResponse(res, 'Search query is required', 400);
      }
      const articles = await articleService.searchArticles(q, parseInt(limit) || 10);
      return successResponse(res, 'Search results retrieved successfully', articles);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }
};

module.exports = articleController; 
const categoryService = require('../services/category.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      return successResponse(res, 'Categories retrieved successfully', categories);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getCategoriesWithArticleCount: async (req, res) => {
    try {
      const categories = await categoryService.getCategoriesWithArticleCount();
      return successResponse(res, 'Categories retrieved successfully', categories);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        return errorResponse(res, 'Category not found', 404);
      }
      return successResponse(res, 'Category retrieved successfully', category);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getCategoryBySlug: async (req, res) => {
    try {
      const category = await categoryService.getCategoryBySlug(req.params.slug);
      if (!category) {
        return errorResponse(res, 'Category not found', 404);
      }
      return successResponse(res, 'Category retrieved successfully', category);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  createCategory: async (req, res) => {
    try {
      const categoryData = req.body;
      const newCategory = await categoryService.createCategory(categoryData);
      return successResponse(res, 'Category created successfully', newCategory, 201);
    } catch (error) {
      if (error.code === 11000) {
        return errorResponse(res, 'Category with this name or slug already exists', 400);
      }
      return errorResponse(res, error.message, 500);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const categoryData = req.body;
      const updatedCategory = await categoryService.updateCategory(categoryId, categoryData);
      if (!updatedCategory) {
        return errorResponse(res, 'Category not found', 404);
      }
      return successResponse(res, 'Category updated successfully', updatedCategory);
    } catch (error) {
      if (error.code === 11000) {
        return errorResponse(res, 'Category with this name or slug already exists', 400);
      }
      return errorResponse(res, error.message, 500);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const result = await categoryService.deleteCategory(categoryId);
      if (!result) {
        return errorResponse(res, 'Category not found', 404);
      }
      return successResponse(res, 'Category deleted successfully', null);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }
};

module.exports = categoryController; 
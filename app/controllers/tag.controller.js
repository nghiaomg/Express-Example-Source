const tagService = require('../services/tag.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const tagController = {
  getAllTags: async (req, res) => {
    try {
      const tags = await tagService.getAllTags();
      return successResponse(res, 'Tags retrieved successfully', tags);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getTagsWithArticleCount: async (req, res) => {
    try {
      const tags = await tagService.getTagsWithArticleCount();
      return successResponse(res, 'Tags retrieved successfully', tags);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getTagById: async (req, res) => {
    try {
      const tag = await tagService.getTagById(req.params.id);
      if (!tag) {
        return errorResponse(res, 'Tag not found', 404);
      }
      return successResponse(res, 'Tag retrieved successfully', tag);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  getTagBySlug: async (req, res) => {
    try {
      const tag = await tagService.getTagBySlug(req.params.slug);
      if (!tag) {
        return errorResponse(res, 'Tag not found', 404);
      }
      return successResponse(res, 'Tag retrieved successfully', tag);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  createTag: async (req, res) => {
    try {
      const tagData = req.body;
      const newTag = await tagService.createTag(tagData);
      return successResponse(res, 'Tag created successfully', newTag, 201);
    } catch (error) {
      if (error.code === 11000) {
        return errorResponse(res, 'Tag with this name or slug already exists', 400);
      }
      return errorResponse(res, error.message, 500);
    }
  },

  updateTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      const tagData = req.body;
      const updatedTag = await tagService.updateTag(tagId, tagData);
      if (!updatedTag) {
        return errorResponse(res, 'Tag not found', 404);
      }
      return successResponse(res, 'Tag updated successfully', updatedTag);
    } catch (error) {
      if (error.code === 11000) {
        return errorResponse(res, 'Tag with this name or slug already exists', 400);
      }
      return errorResponse(res, error.message, 500);
    }
  },

  deleteTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      const result = await tagService.deleteTag(tagId);
      if (!result) {
        return errorResponse(res, 'Tag not found', 404);
      }
      return successResponse(res, 'Tag deleted successfully', null);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }
};

module.exports = tagController; 
const Tag = require('../models/tag.model');

const tagService = {
  // Get all tags
  getAllTags: async () => {
    return await Tag.find().sort({ name: 1 });
  },

  // Get tag by ID
  getTagById: async (tagId) => {
    return await Tag.findById(tagId);
  },

  // Get tag by slug
  getTagBySlug: async (slug) => {
    return await Tag.findOne({ slug });
  },

  // Create new tag
  createTag: async (tagData) => {
    const tag = new Tag(tagData);
    await tag.save();
    return tag;
  },

  // Update tag
  updateTag: async (tagId, tagData) => {
    return await Tag.findByIdAndUpdate(
      tagId,
      tagData,
      { new: true, runValidators: true }
    );
  },

  // Delete tag
  deleteTag: async (tagId) => {
    return await Tag.findByIdAndDelete(tagId);
  },

  // Check if tag exists
  tagExists: async (tagId) => {
    const tag = await Tag.findById(tagId);
    return !!tag;
  },

  // Get tags with article count
  getTagsWithArticleCount: async () => {
    const tags = await Tag.aggregate([
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'tags',
          as: 'articles'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          bgColor: 1,
          textColor: 1,
          articleCount: { $size: '$articles' }
        }
      },
      {
        $sort: { name: 1 }
      }
    ]);
    return tags;
  }
};

module.exports = tagService; 
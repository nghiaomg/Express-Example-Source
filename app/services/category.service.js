const Category = require('../models/category.model');

const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    return await Category.find().sort({ name: 1 });
  },

  // Get category by ID
  getCategoryById: async (categoryId) => {
    return await Category.findById(categoryId);
  },

  // Get category by slug
  getCategoryBySlug: async (slug) => {
    return await Category.findOne({ slug });
  },

  // Create new category
  createCategory: async (categoryData) => {
    const category = new Category(categoryData);
    await category.save();
    return category;
  },

  // Update category
  updateCategory: async (categoryId, categoryData) => {
    return await Category.findByIdAndUpdate(
      categoryId,
      categoryData,
      { new: true, runValidators: true }
    );
  },

  // Delete category
  deleteCategory: async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
  },

  // Check if category exists
  categoryExists: async (categoryId) => {
    const category = await Category.findById(categoryId);
    return !!category;
  },

  // Get categories with article count
  getCategoriesWithArticleCount: async () => {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'category',
          as: 'articles'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          images: 1,
          articleCount: { $size: '$articles' }
        }
      },
      {
        $sort: { name: 1 }
      }
    ]);
    return categories;
  }
};

module.exports = categoryService; 
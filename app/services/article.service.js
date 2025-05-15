const Article = require('../models/article.model');

const articleService = {
  // Get all articles with pagination and filters
  getAllArticles: async (query = {}) => {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = query;

    const filter = {};
    
    // Add category filter
    if (category) {
      filter.category = category;
    }
    
    // Add tag filter
    if (tag) {
      filter.tags = tag;
    }
    
    // Add search filter
    if (search) {
      filter.$text = { $search: search };
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const articles = await Article.find(filter)
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Article.countDocuments(filter);

    return {
      articles,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    };
  },

  // Get article by ID
  getArticleById: async (articleId) => {
    return await Article.findById(articleId)
      .populate('category', 'name slug')
      .populate('tags', 'name slug');
  },

  // Get article by slug
  getArticleBySlug: async (slug) => {
    return await Article.findOne({ slug })
      .populate('category', 'name slug')
      .populate('tags', 'name slug');
  },

  // Create new article
  createArticle: async (articleData) => {
    const article = new Article(articleData);
    await article.save();
    return article;
  },

  // Update article
  updateArticle: async (articleId, articleData) => {
    return await Article.findByIdAndUpdate(
      articleId,
      articleData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug')
     .populate('tags', 'name slug');
  },

  // Delete article
  deleteArticle: async (articleId) => {
    return await Article.findByIdAndDelete(articleId);
  },

  // Increment article views
  incrementViews: async (articleId) => {
    return await Article.findByIdAndUpdate(
      articleId,
      { $inc: { views: 1 } },
      { new: true }
    );
  },

  // Get trending articles
  getTrendingArticles: async (limit = 5) => {
    return await Article.find()
      .sort({ views: -1, publishedAt: -1 })
      .limit(limit)
      .populate('category', 'name slug')
      .populate('tags', 'name slug');
  },

  // Get related articles
  getRelatedArticles: async (articleId, limit = 5) => {
    const article = await Article.findById(articleId);
    if (!article) return [];

    return await Article.find({
      _id: { $ne: articleId },
      $or: [
        { category: article.category },
        { tags: { $in: article.tags } }
      ]
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .populate('category', 'name slug')
      .populate('tags', 'name slug');
  },

  // Search articles
  searchArticles: async (searchTerm, limit = 10) => {
    return await Article.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .populate('category', 'name slug')
      .populate('tags', 'name slug');
  }
};

module.exports = articleService; 
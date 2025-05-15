const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  bgColor: {
    type: String,
    default: '',
    trim: true
  },
  textColor: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to generate slug if not provided
tagSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag; 
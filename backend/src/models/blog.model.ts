// src/models/Blog.ts
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

blogSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

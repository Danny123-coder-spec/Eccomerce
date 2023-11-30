// Assuming you have a mongoose connection established
import mongoose from 'mongoose';

const adminReviewSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AdminReview || mongoose.model('AdminReview', adminReviewSchema)

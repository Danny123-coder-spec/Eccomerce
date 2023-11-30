
import mongoose from "mongoose";

const earningsHistorySchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  adminCommission: {
    type: Number,
    required: true,
  },
  yourEarnings: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Earnings || mongoose.model('Earnings', earningsHistorySchema)
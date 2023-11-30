import mongoose from "mongoose";

const payoutSchema = mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
      },
      payoutDate: {
        type: Date,
        default: Date.now,
      },

})

export default mongoose.models.Payout || mongoose.model('Payout', payoutSchema)
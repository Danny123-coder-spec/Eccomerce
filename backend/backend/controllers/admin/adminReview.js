import AdminReview from '../../models/admin/adminReviewModel'

const createReview = async (req, res) => {
  try {
    const { productName, customerName, comment, rating } = req.body;

    const newReview = new AdminReview({
      productName,
      customerName,
      comment,
      rating,
    });

    await newReview.save();
    res.json({
      message: "Reviews Successfully created",
      status: 201,
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// Get all reviews

const getAllReviews = async (req, res) => {
  try {
    const allReviews = await AdminReview.find();
    res.status(200).json(allReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { createReview, getAllReviews };

import Reviews from "../../models/vendor/reviewModel";

const createReview = async (req, res) => {
  try {
    const { productName, customerName, comment, rating } = req.body;

    const newReview = new Reviews({
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
    const allReviews = await Reviews.find();
    res.status(200).json(allReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { createReview, getAllReviews };

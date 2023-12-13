import Review from "../../models/users/reviewModel";

// Create a new Review

// const createReview = async (req, res) => {
//   try {
//     const review = new Review({
//       ...req?.body,
//     });
//     console.log(review);
//     res.json({
//       message: "Review created successfully",
//       status: 200,
//       reviewed: review,
//     });
//   } catch (error) {
//     console.log("Error creating review", error.message);
//     res.json({ message: "Internal Server Error", status: 500 });
//   }
// };

const createReview = async (req, res) => {
  const { rating, comment, user, product } = req.body;
  try {
    const addedReview = new Review({
      rating,
      comment,
      user,
      product,
    });

    if (addedReview) {
      await addedReview.save();
      return res.json({
        message: "Review created successfully",
        status: 200,
        reviewed: addedReview,
      });
    }
  } catch (error) {
    console.log("Error creating review", error.message);
    res.json({ message: "Internal Server Error", status: 500 });
  }
};

// Get all reviews

const allReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user");
    return res.json(reviews);
  } catch (error) {
    res.json({ message: "Internal server error", status: 500 });
    console.log(error.message);
  }
};

// Get all reviews per particular product

const getProductReviews = async (req, res) => {
  const productId  = req?.query?.pid;
  console.log(req?.query);
  console.log("PRODUCT ID: " + productId);
  try {
    const reviews = await Review.find({ product: productId }).populate("user");
    return res.json(reviews);
  } catch (error) {
    res.json({ message: "Internal server error", status: 500 });
    console.log(error.message);
  }
};

export { createReview, allReviews, getProductReviews };

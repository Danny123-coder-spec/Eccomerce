import { Box, Button, TextField, Rating, Avatar } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox } from "components/flex-box";
import ProductComment from "./ProductComment";
import { H2, H5 } from "components/Typography";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { baseURL } from "../../../src/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// ===================================================

// ===================================================

const ProductReview = ({productId}) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (values, { resetForm }) => {
    resetForm();
    try {
      setSubmitting(true);

      const response = await baseURL.post(
        "/users/userReviews/createReview",
        {...values, product: productId},
      );
       console.log(values);
      console.log(response?.data);

      if (response?.data?.status === 200) {
        return toast.success("Review added successfully");
      } else {
        return toast.error("Unable to add review");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to create review", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await baseURL.get(`/users/userReviews/getProductReviews/${productId}`);
        console.log(response?.data);
        setReviewData(response?.data || []);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [productId]);

  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
    validationSchema: reviewSchema,
  });
  return (
    <Box>
      <div>
        {reviewData.map((review, index) => (
          <div key={index} className="pb-3">
            <div className="flex flex-row gap-3 items-center pb-2">
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                }}
              />
              <h3>{review?.user?.name}</h3>
            </div>
            <div className="flex flex-row items-center gap-2 pb-2">
              <Rating value={review?.rating} readOnly />
              <p>{new Date(review?.createdAt).toLocaleString()}</p>
            </div>
            <p className="text-gray-500">{review?.comment}</p>
          </div>
        ))}
      </div>
      <H2 fontWeight="600" mt={7} mb={2.5}>
        Write a Review for this product
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Your Rating</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            color="warn"
            size="medium"
            value={values.rating}
            onChange={(_, value) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Your Review</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField
            rows={8}
            multiline
            fullWidth
            name="comment"
            variant="outlined"
            onBlur={handleBlur}
            value={values.comment}
            onChange={handleChange}
            placeholder="Write a review here..."
            error={!!touched.comment && !!errors.comment}
            helperText={touched.comment && errors.comment}
          />
        </Box>

        <Button
          variant="contained"
          className="bg-blue-400 text-white hover:bg-blue-600"
          type="submit"
          disabled={!(dirty && isValid)}
        >
          {submitting ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white ..."
              viewBox="0 0 24 24"
            >
              {/* ... (loading spinner content) */}
            </svg>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Box>
  );
};

const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString(),
};
const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required"),
});
export default ProductReview;

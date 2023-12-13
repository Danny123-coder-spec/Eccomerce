import { useRouter } from "next/router";
import ShopLayout1 from "components/layouts/ShopLayout1";
import { useState, useEffect } from "react";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { FaStar } from "react-icons/fa";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ProductIntro from "pages-sections/product-details/ProductIntro";
import ProductReview from "pages-sections/product-details/ProductReview";
import AvailableShops from "pages-sections/product-details/AvailableShops";
import RelatedProducts from "pages-sections/product-details/RelatedProducts";
import FrequentlyBought from "pages-sections/product-details/FrequentlyBought";
import axios from "axios";
import card1 from "../../public/assets/images/Gift Shop/card10.png";
import { baseURL } from "../../src/axios";
import ProductDescription from "pages-sections/product-details/ProductDescription";
import {
  getFrequentlyBought,
  getRelatedProducts,
} from "utils/__api__/related-products";
import api from "utils/__api__/products";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ToastContainer } from "react-toastify";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));
const ProductDetails = (props) => {
  // const [product, setProduct] = useState(null);
  const { frequentlyBought, relatedProducts } = props;
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("S");
  const [counter, setCounter] = useState(1);
  const handleOptionClick = (_, value) => setSelectedOption(value);
  const router = useRouter();
  const [favoriteStates, setFavoriteStates] = useState(false);
  const toggleIsFavorite = () => {
    setFavoriteStates(!favoriteStates);
  };
  const { id } = router.query;
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await baseURL.get(
          `/admin/products/getSingleProduct/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        // Fetch reviews data for all products
        const response = await baseURL.get("/users/userReviews/allReviews");
        setReviewsData(response?.data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    getAllReviews();
  }, []);

  const colorList = [
    "#1C1C1C",
    "#FF7A7A",
    "#FFC672",
    "#84FFB5",
    "#70F6FF",
    "#6B7AFF",
  ];

  const calculateAverageRating = (productId) => {
    const productReviews = reviewsData.filter(
      (review) => review.product === productId
    );
    if (productReviews.length === 0) {
      return 0; // Default to 0 if no reviews
    }

    // Calculate average rating
    const totalRating = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / productReviews.length;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const sizes = ["S", "M", "L", "XL", "ML", "SM", "XS"];

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  const productId = product?._id;

  return (
    <ShopLayout1>
      <ToastContainer />
      <Container
        sx={{
          my: 6,
        }}
      >
        <div className="lg:flex flex-row  gap-14 lg:mx-36">
          {/* <div className="bg-gray-200 flex lg:w-[25rem] justify-center">
            <Image
              src={product.imageUrl}
              width={400}
              height={400}
              className="flex justify-center object-contain"
              style={{ filter: `brightness(75%) saturate(150%) sepia(100%) hue-rotate(100deg) ${selectedColor ? `overlay(${selectedColor})` : ''}` }}
            />
          </div> */}
          <div className="bg-gray-200 lg:w-[25rem] justify-center relative">
            <Image
              src={product.imageUrl}
              width={400}
              height={400}
              className="flex justify-center object-contain"
              style={{
                backgroundColor: selectedColor
                  ? ""
                  : "",
              }}
              
            />
          </div>

          
          <div className="flex flex-col gap-y-3">
            <span className="font-bold text-[1.35rem] ">{product?.name}</span>
            <div className="flex flex-row items-center gap-4">
              <div className="flex gap-[0.127rem]">
                {/* Dynamically render review icons based on average rating */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    size={18}
                    color={
                      index < calculateAverageRating(product._id)
                        ? "#FDCC0D"
                        : "#e4e5e9"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {
                  reviewsData.filter((review) => review.product === product._id)
                    .length
                }{" "}
                Reviews
              </span>
            </div>

            <div className="flex flex-row items-center gap-6">
              <span className="font-semibold text-lg">
                Ghc {product?.price}
              </span>
            </div>
            <p className="text-gray-500 lg:w-[25rem]">{product?.description}</p>
            <div className="flex gap-2">
              <span className="font-semibold text-[16.2px]">COLOR:</span>
              <FlexBox mb={2} flexWrap="wrap" gap={1}>
                {colorList.map((item) => (
                  <Box
                    key={item}
                    flexShrink={0}
                    sx={{
                      width: 25,
                      height: 25,
                      bgcolor: item,
                      cursor: "pointer",
                      borderRadius: "50%",
                      border:
                        selectedColor === item ? "2px solid #333" : "none",
                    }}
                    onClick={() => setSelectedColor(item)}
                  />
                ))}
              </FlexBox>
            </div>
            <span className="text-[16.1px] font-semibold pb-2">SIZE:</span>
            <div className="lg:flex space-x-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`border border-gray-400 w-[2.4rem] rounded-sm h-[2rem] font-semibold ${
                    selectedSize === size
                      ? "bg-gray-400 border-none text-white"
                      : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex flex-row items-center space-x-5 mt-3">
              <button className="bg-[#D23F57] hover:bg-[#f01f42] transition-all duration-700 font-semibold text-sm p-2 w-[10rem] rounded-sm text-white">
                ADD TO CART
              </button>
              <div className="flex flex-row items-center space-x-2 ">
                <button
                  onClick={handleDecrement}
                  className="border flex justify-center py-2 border-gray-400 w-[2.4rem] h-[2rem] rounded-sm"
                >
                  <AiOutlineMinus />
                </button>
                <span className="font-semibold text-lg">{counter}</span>
                <button
                  onClick={handleIncrement}
                  className="flex  justify-center py-2 border border-gray-400 w-[2.4rem] h-[2rem] rounded-sm"
                >
                  <AiOutlinePlus />
                </button>
              </div>
              <div className="cursor-pointer flex justify-center pt-1 bg-gray-200 rounded-sm  w-[2.4rem] h-[2rem]">
                {favoriteStates ? (
                  <Favorite
                    color="error"
                    fontSize="medium"
                    onClick={() => toggleIsFavorite()}
                  />
                ) : (
                  <FavoriteBorder
                    fontSize="medium"
                    onClick={toggleIsFavorite}
                  />
                )}
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
            <div className="flex items-center">
              <div className="font-semibold text-[16.2px] ">Category:</div>
              <span className="pl-1">{product?.category}</span>
            </div>
            <div className="flex items-center">
              <div className="font-semibold text-[16.2px]">Tags:</div>
              <span className="pl-1">{product?.tags}</span>
            </div>
          </div>
          {/* Display other product details */}
        </div>

        <div className="lg:mx-36">
          <div className="mt-7 ">
            <h3 className="font-semibold text-2xl mb-4">Description</h3>
            <ProductDescription />
          </div>
          <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
          <div className="my-4">
            <h3 className="font-semibold  text-2xl mb-6">Reviews</h3>

            <ProductReview productId={product?._id} />

            {frequentlyBought && (
              <FrequentlyBought productsData={frequentlyBought} className="" />
            )}

            <AvailableShops />

            {relatedProducts && (
              <RelatedProducts productsData={relatedProducts} />
            )}
          </div>
        </div>
      </Container>
    </ShopLayout1>
  );
};

{
  /* <Box mb={6}> */
}
{
  /* {selectedOption === 0 && <ProductDescription />} */
}
{
  /* {selectedOption === 1 && <ProductReview />} */
}
{
  /* </Box> */
}

{
  /* <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Description" />
          <Tab className="inner-tab" label="Review (3)" />
        </StyledTabs> */
}

// export const getStaticPaths = async () => {
//   const paths = await api.getSlugs();
//   return {
//     paths: paths,
//     //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const relatedProducts = await getRelatedProducts();
//   const frequentlyBought = await getFrequentlyBought();
//   const product = await api.getProduct(params.id);

//   return {
//     props: {
//       product,
//       frequentlyBought,
//       relatedProducts,
//     },
//   };
// };

export default ProductDetails;

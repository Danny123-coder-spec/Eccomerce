import { Box, Button, Grid, Rating } from "@mui/material";
import CategorySectionCreator from "components/CategorySectionCreator";
import ProductCard16 from "components/product-cards/ProductCard16";
// =========================================================
import { IoIosClose } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { useSnackbar } from "notistack";
import PreviewIcon from "@mui/icons-material/RemoveRedEye";
import { Chip, Divider, styled } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { H3, Span } from "components/Typography";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { FlexBetween, FlexRowCenter } from "components/flex-box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "contexts/AppContext";
import useWindowSize from "hooks/useWindowSize";
import cart from "../../../public/assets/images/Gift Shop/cart2.png";
import car from "../../../public/assets/images/Gift Shop/car.png";
import { data } from "autoprefixer";
// =========================================================
import Image from "next/image";
import Link from "next/link";
import { baseURL } from "../../axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  display: "flex",
  // bgcolor: "background.paper",
  bgcolor: "white",
  boxShadow: 24,
  p: 6,
};

const modal = {
  top: 0,
  left: 0,
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: "1000",
  backgroundColor: "rgba(0, 0, 0, 0.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Section7 = ({ products }) => {
  const [open, setOpen] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const width = useWindowSize();
  const { palette, shadows } = useTheme();
  const [cartItems, setCartItems] = useState([]);
  const { state, dispatch } = useAppContext();
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  // const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteStates, setFavoriteStates] = useState({});

  const { id, title, price, thumbnail } = data;
  const toggleIsFavorite = (id) => {
    setFavoriteStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };
  const handleOpen = (id) => setOpen(id);
  const handleClose = () => setOpen(null);
  // const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(4);
  }, [width]);

  const handleCartAmountChange = (product, qty) => () => {
    const cartItem = state.cart.find((item) => item.id === product.id);
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: product.price,
        id: product.id,
        qty,
        image: product.image, // Assuming the product image is what you want as imgUrl
        name: product.title,
      },
    });
    enqueueSnackbar("Added to Cart", {
      variant: "success",
    });
  };

  const handleMouseEnter = (id) => {
    setHoveredProductId(id);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCart = () => {
    setCartItems((prevItems) => [...prevItems, data]);
    toast.success("Added to Cart");
  };

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

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const getAllproducts = async () => {
      const response = await baseURL.get("/admin/products/getAllProduct");

      setProductsData(response?.data);
      // setProductsData(updatedProducts);
    };

    getAllproducts();
  }, []);

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

  return (
    <CategorySectionCreator title="All Products" seeMoreLink="#">
      {/* {products.map((item, ind) => ( */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {productsData.map((product, id) => (
          <div
            key={id}
            className="bg-white shadow-sm transition-transform ease-in duration-300 transform cursor-pointer p-6 rounded-md flex flex-col justify-center relative"
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-row items-center  gap-1 absolute left-0 p-1 text-white rounded-r-sm top-2 bg-[#D23F57]">
              <Image src={car} width={18} />
              <span className="text-xs">Free Shipping</span>
            </div>

            <Link
              href="/product/[id]"
              as={`/product/${product._id}`}
              passHref
              className="flex justify-center"
            >
              <Image
                src={product.imageUrl}
                alt="Image"
                height={200}
                width={200}
                className="h-[12.5rem] object-contain"
              />
            </Link>

            <div className="flex flex-col items-center justify-center">
              <span className="font-medium">{product.title}</span>
              <span className="font-medium">{product.name}</span>
            </div>
            <div className="text-gray-500 text-[0.79rem] pt-2 truncate">
              {product.description}
            </div>
            <div className="flex flex-row items-center justify-between pt-2">
              <span className="font-medium">Ghc {product.price}</span>

              <div className="flex gap-[0.126rem]">
                {/* Dynamically render review icons based on average rating */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    size={18}
                    color={
                      index < calculateAverageRating(product._id)
                        ? " #FDCC0D"
                        : "#e4e5e9"
                    }
                  />
                ))}
              </div>
            </div>
            {/* <Link href="shops/scarlett-beauty" className="cursor-pointer">
              <span>More Details</span>
            </Link> */}
            <div className="flex flex-row items-center gap-4">
              <Link
                href={`/product/${product._id}`}
                className="text-center flex-1 border border-gray-500  p-1.5 mt-5 rounded-sm hover:bg-[#D23F57] hover:border-transparent hover:text-white duration-100 cursor-pointer"
              >
                <span>More Details</span>
              </Link>
              <div
                className="mt-4 bg-[#D23F57] p-[0.2rem] rounded-sm cursor-pointer"
                onClick={handleCartAmountChange(
                  product,

                  cartItems.qty ? cartItems.qty + 1 : 1
                )}
              >
                <Image src={cart} width={25} className="" />
              </div>
            </div>

            {hoveredProductId === id && (
              <div
                className="bottom-[-120px] 
                h-[5rem] transition-transform 
                cursor-pointer z-10 absolute top-10
                 right-2 rounded-sm transition-bottom
                  duration-300 ease-in-out flex flex-col 
                  items-end justify-center bg-transparent 
                  bg-opacity-75 text-white p-2"
              >
                <div
                  className="cursor-pointer mb-4 text-gray-500"
                  onClick={() => handleOpen(id)}
                >
                  <PreviewIcon fontSize="medium" />
                </div>
                <div className="cursor-pointer text-gray-500">
                  {favoriteStates[product?._id] ? (
                    <Favorite
                      color="error"
                      fontSize="medium"
                      onClick={() => toggleIsFavorite(id)}
                    />
                  ) : (
                    <FavoriteBorder
                      fontSize="medium"
                      onClick={() => toggleIsFavorite(id)}
                    />
                  )}
                </div>
              </div>
            )}

            <Modal
              open={open === id}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open === id}>
                <Box sx={style}>
                  <div
                    className="absolute z-10 right-5 top-5 cursor-pointer hover:bg-[#D23F57] hover:bg-opacity-10 rounded-full"
                    onClick={handleClose}
                  >
                    <IoIosClose size={24} />
                  </div>

                  <div className="flex w-[40%] justify-start">
                    <Image
                      src={product?.imageUrl}
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  </div>
                  <Box className="w-[60%] pl-14 flex flex-col justify-center">
                    <div
                      className="text-xl pt-3 font-bold"
                      id="transition-modal-title"
                    >
                      {product?.name}
                    </div>
                    <div className="text-gray-400 pt-3 font-semibold text-[0.9rem]">
                      CATEGORY:{product?.category}
                    </div>
                    <div className="">
                      <Typography
                        className="font-bold text-xl text-[#D23F57]"
                        id="transition-modal-price"
                        sx={{ mt: 2 }}
                      >
                        Ghc {product.price}
                      </Typography>

                      <div className="flex pt-2 gap-[0.126rem]">
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
                    </div>
                    <Typography
                      className="text-gray-500 text-[0.9rem] "
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                      {product.description}
                    </Typography>
                    <button
                      onClick={handleCartAmountChange(
                        product,
                        product.qty ? product.qty + 1 : 1
                      )}
                      className="bg-[#D23F57] text-white font-semibold px-4 py-2.5 rounded-sm mt-6 hover:bg-[#e11537] transition-all hover:text-white duration-100 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </div>
        ))}
      </div>

      <Box mt={6} display="flex" justifyContent="center">
        <Button
          className="bg-[#D23F57] text-white px-4 py-2 rounded-sm mt-4 hover:bg-[#e11537] transition-all hover:text-white duration-100 cursor-pointer"
          variant="contained"
        >
          Load More...
        </Button>
      </Box>
    </CategorySectionCreator>
  );
};
export default Section7;

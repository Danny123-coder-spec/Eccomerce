// import { useEffect, useState } from "react";
// import { useTheme } from "@mui/material";
// import Carousel from "components/carousel/Carousel";
// import ProductCard16 from "components/product-cards/ProductCard16";
// import CategorySectionCreator from "components/CategorySectionCreator";
// import useWindowSize from "hooks/useWindowSize";
// // =========================================================

// const Section6 = ({ products }) => {
//   const width = useWindowSize();
//   const { palette, shadows } = useTheme();
//   const [visibleSlides, setVisibleSlides] = useState(4);
//   useEffect(() => {
//     if (width < 500) setVisibleSlides(1);
//     else if (width < 650) setVisibleSlides(2);
//     else if (width < 950) setVisibleSlides(4);
//     else setVisibleSlides(4);
//   }, [width]);
//   return (
//     <CategorySectionCreator title="Top Saled Items" seeMoreLink="#">
//       <Carousel
//         infinite={true}
//         visibleSlides={visibleSlides}
//         totalSlides={products.length}
//         sx={{
//           "& .carousel__slider": {
//             paddingBottom: "15px",
//           },
//           "& #backArrowButton, #backForwardButton": {
//             width: 35,
//             height: 35,
//             borderRadius: 0,
//             boxShadow: shadows[2],
//             color: palette.primary.main,
//             background: palette.primary[50],
//             "&:hover": {
//               background: palette.primary[100],
//             },
//           },
//         }}
//       >
//         {products.map((item) => (
//           <ProductCard16
//             id={item.id}
//             key={item.id}
//             slug={item.slug}
//             title={item.title}
//             price={item.price}
//             rating={item.rating}
//             images={item.images}
//             discount={item.discount}
//             thumbnail={item.thumbnail}
//             sx={{
//               "& #imgBox": {
//                 backgroundColor: "primary.200",
//               },
//             }}
//           />
//         ))}
//       </Carousel>
//     </CategorySectionCreator>
//   );
// };
// export default Section6;

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@mui/material";
import slug from "../../../public/assets/images/avatars/[slug]";
import { useSnackbar } from "notistack";
import PreviewIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Chip, Divider, styled } from "@mui/material";
import { IoIosClose } from "react-icons/io";
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
import CategorySectionCreator from "components/CategorySectionCreator";
import ProductCard16 from "components/product-cards/ProductCard16";
import { useAppContext } from "contexts/AppContext";
import useWindowSize from "hooks/useWindowSize";
import card1 from "../../../public/assets/images/Gift Shop/card6.png";
import card2 from "../../../public/assets/images/Gift Shop/card7.png";
import card3 from "../../../public/assets/images/Gift Shop/card8.png";
import card4 from "../../../public/assets/images/Gift Shop/card10.png";
import card5 from "../../../public/assets/images/Gift Shop/card9.png";
import cart from "../../../public/assets/images/Gift Shop/cart2.png";
import car from "../../../public/assets/images/Gift Shop/car.png";
import { data } from "autoprefixer";
// =========================================================
import Image from "next/image";
import Link from "next/link";

//
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  display: "flex",
  // bgcolor: "background.paper",
  bgcolor: "white",
  p: 8,
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

const popularData = [
  {
    id: 1,
    name: "Free Shipping",
    image: card1,
    title: "24-inch iMac with Apple M1 chip",
    description:
      "Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine",
    price: "400.00",
    star: "⭐⭐⭐⭐",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Free Shipping",
    image: card3,
    title: "24-inch iMac with Apple M1 chip",
    description:
      "Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine",
    price: "300.00",
    star: "⭐⭐⭐",
    rating: 3.5,
  },
  {
    id: 3,
    name: "Free Shipping",
    image: card4,
    title: "24-inch iMac with Apple M1 chip",
    description:
      "Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine",
    price: "150.00",
    star: "⭐⭐⭐⭐",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Free Shipping",
    image: card5,
    title: "24-inch iMac with Apple M1 chip",
    description:
      "Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine",
    price: "200.00",
    star: "⭐⭐⭐",
    rating: 3.5,
  },
];

const Section6 = () => {
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

  return (
    <CategorySectionCreator title="Top Sold Items" seeMoreLink="#">
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={popularData.length}
        sx={{
          "& .carousel__slider": {
            paddingBottom: "15px",
          },
          "& #backArrowButton, #backForwardButton": {
            width: 35,
            height: 35,
            borderRadius: 0,
            boxShadow: shadows[2],
            color: palette.primary.main,
            background: palette.primary[50],
            "&:hover": {
              background: palette.primary[100],
            },
          },
        }}
      >
        {popularData.map((product) => (
          <main
            key={product.id}
            className="bg-white shadow-sm transition-transform ease-in duration-300 transform cursor-pointer  p-6 rounded-md flex flex-col justify-center relative"
            onMouseEnter={() => handleMouseEnter(product.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-row items-center gap-1 absolute left-0 p-1 text-white rounded-r-sm top-2 bg-[#D23F57]">
              <Image src={car} width={18} />
              <span className="text-xs">{product.name}</span>
            </div>
            <Link
              href={`/product/${product.id}`}
              className="flex justify-center"
            >
              <Image
                src={product.image}
                width={200}
                className="h-[12.5rem] object-contain"
              />
            </Link>
            <span className="font-medium">{product.title}</span>
            <div className="text-gray-500 text-[0.79rem] pt-2 truncate">
              {product.description}
            </div>
            <div className="flex flex-row items-center justify-between pt-2">
              <span className="font-medium">Ghc {product.price}</span>
              <div className="">
                <span>{product.star}</span>
                <span className="pl-2 font-medium">{product.rating}</span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Link
                href={`/path${product.id}`}
                className="text-center flex-1 border border-gray-500  p-1.5 mt-5 rounded-sm hover:bg-[#D23F57] hover:border-transparent hover:text-white duration-100 cursor-pointer"
              >
                <span>More Details</span>
              </Link>
              <div
                className="mt-4 bg-[#D23F57] p-[0.2rem] rounded-sm cursor-pointer"
                onClick={handleCartAmountChange(
                  product,
                  product.id,
                  product.qty ? product.qty + 1 : 1
                )}
              >
                <Image src={cart} width={25} className="" />
              </div>
            </div>

            {hoveredProductId === product.id && (
              <div
                className="bottom-[-120px] 
              h-[5rem] transition-transform 
              cursor-pointer z-10 absolute top-10
               right-2 rounded-sm transition-bottom
                duration-300 ease-in-out flex
                 flex-col items-end justify-center
                  bg-transparent bg-opacity-75 text-white p-2"
              >
                <div
                  className="cursor-pointer mb-4 text-gray-500"
                  onClick={() => handleOpen(product.id)}
                >
                  <PreviewIcon fontSize="medium" />
                </div>
                <div className="cursor-pointer text-gray-500 ">
                  {favoriteStates[product.id] ? (
                    <Favorite
                      color="error"
                      fontSize="medium"
                      onClick={() => toggleIsFavorite(product.id)}
                    />
                  ) : (
                    <FavoriteBorder
                      fontSize="medium"
                      onClick={() => toggleIsFavorite(product.id)}
                    />
                  )}
                </div>
              </div>
            )}

            <Modal
              className={modal}
              open={open === product.id}
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
              <Fade in={open === product.id}>
                <Box sx={style}>
                  <div
                    className="absolute z-10 right-5 top-5 cursor-pointer hover:bg-[#D23F57] hover:bg-opacity-10 rounded-full"
                    onClick={handleClose}
                  >
                    <IoIosClose size={24} />
                  </div>
                  <div className="w-[40%] flex justify-start">
                    <Image src={product.image} width={400} className="" />
                  </div>
                  <Box className="w-[60%] pl-14 ">
                    <div
                      className="text-xl pt-3 font-bold"
                      id="transition-modal-title"
                    >
                      {product.title}
                    </div>
                    <div className="text-gray-400 pt-3 font-semibold text-[0.9rem]">
                      CATEGORY:Electronics
                    </div>
                    <div className=" ">
                      <Typography
                        className="font-bold text-xl text-[#D23F57]"
                        id="transition-modal-price"
                        sx={{ mt: 2 }}
                      >
                        Ghc {product.price}
                      </Typography>
                      <div className="pt-2">
                        <span>⭐⭐⭐⭐</span>
                        <span className="pl-2 font-medium">
                          {product.rating}
                        </span>
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
                      className="bg-[#D23F57] text-white px-4 py-2 rounded-sm mt-6 hover:bg-[#e11537] transition-all hover:text-white duration-100 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </main>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};
export default Section6;

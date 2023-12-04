import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@mui/material";
import PreviewIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Chip, Divider, styled } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { H3, Span } from "components/Typography";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { FlexBetween, FlexRowCenter } from "components/flex-box";
import CategorySectionCreator from "components/CategorySectionCreator";
import ProductCard16 from "components/product-cards/ProductCard16";
import useWindowSize from "hooks/useWindowSize";
import card1 from "../../../public/assets/images/Gift Shop/mac1.png";
import card2 from "../../../public/assets/images/Gift Shop/phone.png";
import card3 from "../../../public/assets/images/Gift Shop/mac1.png";
import card4 from "../../../public/assets/images/Gift Shop/mac1.png";
import cart from "../../../public/assets/images/Gift Shop/cart2.png";
import car from "../../../public/assets/images/Gift Shop/car.png";
import { data } from "autoprefixer";
// =========================================================
import Image from "next/image";
import Link from "next/link";

//

const popularData = [
  {
    id: 1,
    name: "Free Shipping",
    image: card1,
    title: "24-inch iMac with Apple M1 chip",
    description:
      "Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine",
    price: "$ 40.00",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Free Shipping",
    image: card1,
    title: "24-inch iMac with Apple M1 chip",
    description:
      "Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine",
    price: "$ 30.00",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Free Shipping",
    image: card1,
    title: "24-inch iMac with Apple M1 chip",
    description:
      "Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine",
    price: "$ 15.00",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Free Shipping",
    image: card1,
    title: "24-inch iMac with Apple M1 chip",
    description:
      "Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine",
    price: "$ 20.00",
    rating: 4.9,
  },
];

const Section5 = ({ products }) => {
  const width = useWindowSize();
  const { palette, shadows } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(4);
  }, [width]);

  const handleCartAmountChange = (qty) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        id,
        qty,
        slug,
        imgUrl: thumbnail,
        name: title,
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
  return (
    <CategorySectionCreator title="Popular Items" seeMoreLink="#">
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={products.length}
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
        {popularData.map((data) => (
          <main
            key={data.id}
            className="bg-white  transition-transform ease-in duration-300 transform cursor-pointer shadow-inherit p-6 rounded-md flex flex-col justify-center relative"
            onMouseEnter={() => handleMouseEnter(data.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-row items-center gap-1 absolute left-0 p-1 text-white rounded-r-sm top-2 bg-[#D23F57]">
              <Image src={car} width={18} className="" />
              <span className="text-xs">{data.name}</span>
            </div>
            <Image src={data.image} width={200} className="" />
            <span className="font-medium ">{data.title}</span>
            <div className="text-gray-500 text-[0.79rem] pt-2">
              {data.description}
            </div>
            <div className="flex flex-row items-center justify-between pt-2">
              <span className="font-medium">{data.price}</span>
              <div className="">
                <span>⭐⭐⭐⭐</span>
                <span className="pl-2 font-medium">{data.rating}</span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="text-center flex-1 border border-gray-500 p-1.5 mt-5 rounded-sm hover:bg-[#D23F57] hover:text-white duration-100 cursor-pointer">
                <Link href={`/path${data.id}`}>More Details</Link>
              </div>
              <div className="mt-4 bg-[#D23F57] p-[0.2rem] rounded-sm cursor-pointer">
                <Image src={cart} width={25} className="" />
              </div>
            </div>

            {hoveredProductId === data.id && (
              <div className="transition-y-[40px] h-[5rem] transition-transform cursor-pointer absolute top-20 right-2 rounded-sm bottom-48 flex flex-col items-end justify-center bg-gray-500 bg-opacity-75 text-white p-2">
                <div className="cursor-pointer mb-3">
                  <PreviewIcon fontSize="medium" />
                </div>
                <div className="cursor-pointer ">
                  {isFavorite ? (
                    <Favorite color="error" fontSize="medium" />
                  ) : (
                    <FavoriteBorder fontSize="medium" />
                  )}
                </div>
              </div>
            )}
          </main>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};
export default Section5;

// const ItemController = styled(FlexBetween)(({ theme }) => ({
//   width: 35,
//   right: 15,
//   height: 120,
//   bottom: -120,
//   background: "#fff",
//   overflow: "hidden",
//   position: "absolute",
//   flexDirection: "column",
//   transition: "bottom 0.3s ease-in-out",
//   "& span": {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     padding: "8px 10px",
//     alignItems: "center",
//     justifyContent: "center",
//     "&:hover": {
//       cursor: "pointer",
//       background: theme.palette.primary.main,
//       "& svg": {
//         color: "#fff",
//       },
//     },
//   },
//   "& svg": {
//     fontSize: 18,
//     color: theme.palette.grey[600],
//   },
// }));

{
  /* {products.map((item) => (
          <ProductCard16
            id={item.id}
            key={item.id}
            slug={item.slug}
            title={item.title}
            price={item.price}
            rating={item.rating}
            images={item.images}
            discount={item.discount}
            thumbnail={item.thumbnail}
          />
        ))} */
}

{
  /* <ItemController className="controlBox">
          <Span onClick={toggleDialog}>
            <PreviewIcon />
          </Span>

          <Divider orientation="horizontal" flexItem />

          <Span onClick={toggleIsFavorite}>
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" color="primary" />
            )}
          </Span>

          <Divider orientation="horizontal" flexItem />

        
        </ItemController> */
}

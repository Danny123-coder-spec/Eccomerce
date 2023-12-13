import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, useTheme } from "@mui/material";
import { H1 } from "components/Typography";
import Carousel from "components/carousel/Carousel";
import ProductCard15 from "components/product-cards/ProductCard15";
import useWindowSize from "hooks/useWindowSize";
import card1 from "../../../public/assets/images/Gift Shop/card6.png";
import card2 from "../../../public/assets/images/Gift Shop/card10.png";
import card5 from "../../../public/assets/images/Gift Shop/card8.png";
// ===============================================

const Section4 = ({ categoryList }) => {
  const theme = useTheme();
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  const categoryData = [
    { id: 1, image: card1, title: "Smart Watch", description: "13 available items" },
    {
      id: 2,
      image: card2,
      title: "Apple Watch",
      description: "20 available items",
    },
    { id: 3, image: card5, title: "Apple Airpods", description: "18 available items" },
  ];
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);
  return (
    <Box>
      <H1 my={2}>Top Categories</H1>

      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={categoryList.length}
        sx={{
          "& #backArrowButton, #backForwardButton": {
            width: 35,
            height: 35,
            borderRadius: 0,
            boxShadow: theme.shadows[2],
            color: theme.palette.primary.main,
            background: theme.palette.primary[50],
            "&:hover": {
              background: theme.palette.primary[100],
            },
          },
        }}
      >
        {categoryData.map((item) => (
          <Link
            href={`path${item.id}`}
            key={item.id}
            className="flex flex-col "
          >
            <div className="bg-[#D23F57] bg-opacity-40 h-[10rem] py-2 object-contain rounded-t-md flex justify-center">
              <Image src={item.image} width={150} height={100} />
            </div>

            <div className="flex flex-col items-center bg-white p-4 rounded-b-md shadow-inherit">
              <span className="font-medium text-[16.2px]">{item.title}</span>
              <span className="pt-2 text-gray-500">{item.description}</span>
            </div>
          </Link>
        ))}
      </Carousel>
    </Box>
  );
};
export default Section4;

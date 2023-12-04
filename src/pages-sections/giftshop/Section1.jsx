import { Box, Button, Grid, styled, useTheme } from "@mui/material";
import LazyImage from "components/LazyImage";
import Carousel from "components/carousel/Carousel";
import Image from "next/image";
import heroImg from '../../assets/hero.jpeg'
import bg from '../../assets/bg2.jpeg'
import { H1, Paragraph } from "components/Typography";
// styled components
const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: 60,
  overflow: "hidden",
  backgroundColor: theme.palette.primary[100],
  "& .carousel-dot": {
    left: 0,
    right: 0,
    bottom: "30px",
    margin: "auto",
    position: "absolute",
  },
}));
const StyledGrid = styled(Grid)(({ theme }) => ({
  maxWidth: 1280,
  margin: "auto",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
}));
const GridItemOne = styled(Grid)(({ theme }) => ({
  padding: 20,
  "& .titleBox": {
    marginTop: 10,
    marginBottom: 30,
    "& h1": {
      fontSize: 45,
      lineHeight: 1.3,
    },
  },
  [theme.breakpoints.down("md")]: {
    "& .titleBox": {
      "& h1": {
        fontSize: 30,
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    "& .titleBox": {
      textAlign: "center",
      "& h1": {
        fontSize: 25,
      },
    },
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 400,
  borderRadius: 0,
  fontSize: "16px",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary[400],
  },
}));
const GridItemTwo = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

// ==========================================================

// ==========================================================

const Section1 = ({ carouselData }) => {
  const { palette } = useTheme();
  return (
    <StyledBox id="carouselBox">
      
      <Carousel
        spacing="0px"
        showDots={true}
        autoPlay={true}
        visibleSlides={1}
        showArrow={false}
        dotClass="carousel-dot"
        dotColor={palette.primary.main}
        totalSlides={carouselData.length}
      >
        
        <Image src={heroImg} style={{
          width: '100%',
          height: 'auto',
          resizeMode: 'contain'
        }}/>
        <Image src={bg} style={{
          width: '100%',
          height: 'auto',
          resizeMode: 'contain'
        }}/>
      </Carousel>
    </StyledBox>
  );
};
export default Section1;


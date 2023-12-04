// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Setting from "components/Setting";
// import Footer from "pages-sections/landing/Footer";
// import Section1 from "pages-sections/landing/Section1";
// import Section2 from "pages-sections/landing/Section2";
// import Section3 from "pages-sections/landing/Section3";
// import Section4 from "pages-sections/landing/Section4";
// import Section6 from "pages-sections/landing/Section6";
// import Section5 from "pages-sections/landing/Section5";
// const IndexPage = () => {
//   const [filterDemo, setFilterDemo] = useState("");
//   return (
//     <Box id="top" overflow="hidden" bgcolor="background.paper">
//       <Section1 />
//       <Section6 setFilterDemo={setFilterDemo} />
//       <Section2 />
//       <Section5 />
//       <Section3 filterDemo={filterDemo} setFilterDemo={setFilterDemo} />
//       <Section4 />
//       <Footer />
//       <Setting />
//     </Box>
//   );
// };
// export default IndexPage;

import { useEffect, useRef, useState } from "react";
import { Box, Container, styled } from "@mui/material";
import { layoutConstant } from "utils/constants";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SideNavbar from "components/page-sidenav/SideNavbar";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import Section1 from "pages-sections/giftshop/Section1";
import Section2 from "pages-sections/giftshop/Section2";
import Section3 from "pages-sections/giftshop/Section3";
import Section4 from "pages-sections/giftshop/Section4";
import Section5 from "pages-sections/giftshop/Section5";
import Section6 from "pages-sections/giftshop/Section6";
import Section7 from "pages-sections/giftshop/Section7";
import api from "utils/__api__/gift-shop";

// styled component
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  ".sidenav": {
    top: 0,
    bottom: 0,
    position: "relative",
    transition: "all 350ms ease-in-out",
    width: layoutConstant.grocerySidenavWidth,
    minWidth: layoutConstant.grocerySidenavWidth,
    "& .MuiPaper-root": {
      borderRadius: 0,
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  ".pageContent": {
    left: "unset",
    position: "relative",
    marginLeft: "1.75rem",
    width: `calc(100% - 2.5rem - ${layoutConstant.grocerySidenavWidth}px)`,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      "& .MuiGrid-item": {
        paddingLeft: 0,
      },
      "& .categories": {
        marginLeft: "-1.75rem",
      },
    },
  },
}));

// ========================================================

// ========================================================

const GiftShop = (props) => {
  const pageContentRef = useRef();
  const [sidebarHeight, setSidebarHeight] = useState(0);
  useEffect(() => setSidebarHeight(pageContentRef.current.offsetHeight), []);
  return (
    <ShopLayout1 showTopbar={false}>
      <SEO title="Gift shop" />

      {/* TOP HERO AREA */}
      <Section1 carouselData={props.carouselData} />

      <StyledContainer
        sx={{
          mb: 6,
        }}
      >
        {/* SIDE NAV BAR */}
        <Box className="sidenav">
          <SideNavbar
            lineStyle="dash"
            sidebarStyle="style2"
            navList={props.categoryNavigation}
            sidebarHeight={sidebarHeight || "85vh"}
          />
        </Box>

        <Box className="pageContent" ref={pageContentRef}>
          {/* SERVICE LIST AREA */}
          <Section2 serviceList={props.serviceList} />

          {/* OFFER BANNER AREA */}
          <Section3 />

          {/* TOP CATEGORY AREA */}
          <Box my={6} className="categories">
            <Section4 categoryList={props.topCategories} />
          </Box>
        </Box>
      </StyledContainer>

      {/* POPULAR PRODUCT AREA */}
      <Section5 products={props.popularProducts} />

      {/* TOP SALES PRODUCTS AREA */}
      <Section6 products={props.topSailedProducts} />

      {/* ALL PRODUCTS AREA */}
      <Section7 products={props.allProducts} />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-5.png" />

      {/* MOBILE NAVIGATION WITH SIDE NAVABAR */}
      <MobileNavigationBar2>
        <SideNavbar
          navList={props.categoryNavigation}
          lineStyle="dash"
          sidebarStyle="style2"
        />
      </MobileNavigationBar2>
    </ShopLayout1>
  );
};
export const getStaticProps = async () => {
  const allProducts = await api.getAllProducts();
  const serviceList = await api.getServiceList();
  const topCategories = await api.getTopCategories();
  const carouselData = await api.getMainCarouselData();
  const popularProducts = await api.getPopularProducts();
  const topSailedProducts = await api.getTopSailedProducts();
  const categoryNavigation = await api.getCategoryNavigation();
  return {
    props: {
      allProducts,
      serviceList,
      carouselData,
      topCategories,
      popularProducts,
      topSailedProducts,
      categoryNavigation,
    },
  };
};
export default GiftShop;


// import { Box, useTheme } from "@mui/material";
// import axios from "axios";
// import SEO from "components/SEO";
// import Setting from "components/Setting";
// import Offers from "pages-sections/market-2/Offers";
// import Section1 from "pages-sections/market-2/Section1";
// import Section2 from "pages-sections/market-2/Section2";
// import Section3 from "pages-sections/market-2/Section3";
// import Section4 from "pages-sections/market-2/Section4";
// import Section5 from "pages-sections/market-2/Section5";
// import Section6 from "pages-sections/market-2/Section6";
// import Section7 from "pages-sections/market-2/Section7";
// import Section8 from "pages-sections/market-2/Section8";
// import Section9 from "pages-sections/market-2/Section9";
// import ShopLayout1 from "components/layouts/ShopLayout1";
// // import api from "utils/_api_/market-2"; // =======================================================
// import api from '../src/utils/__api__/market-2'
// import { useEffect, useState } from "react";
// // =======================================================
// const Market = (props) => {
 
//   const theme = useTheme();
//   return (
//     <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
//       <SEO title="Market v2" />
//       <Box bgcolor="#F6F6F6">
//         {/* HERO SLIDER AND GRID */}
//         <Section1 carouselData={props.mainCarouselData} />

//         {/* SERVICE CARDS */}
//         <Section2 serviceList={props.serviceList} />

//         {/* CATEGORIES AND ANIMATED OFFER BANNER */}
//         <Section3 categories={props.categories} />

//         {/* DEALS OF THE DAY AND OFFER BANNERS */}
//         <Section4 products={props.products} />

//         {/* TOP OFFER BANNERS */}
//         <Offers />

//         {/* PRODUCT ROW WITH ELECTRONICS CATEGORY LIST */}
//         <Section5 data={props.electronicsProducts} />

//         {/* OFFER BANNER */}
//         <Section6 />

//         {/* PRODUCT ROW WITH MEN'S FASHION CATEFORY LIST */}
//         <Section5 data={props.menFashionProducts} />

//         {/* OFFER BANNER */}
//         <Section7 />

//         {/* PRODUCT ROW WITH WOMEN'S FASHION CATEFORY LIST */}
//         <Section5 data={props.womenFashionProducts} />

//         {/*  FEATURED BRANDS */}
//         <Section8 brands={props.brands} />

//         {/* SELECTED PRODUCTS */}
//         <Section9 />
//       </Box>

//       {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
//       <Setting />
//     </ShopLayout1>
//   );
// };

// export const getStaticProps = async () => {
//   const brands = await api.getBrands();
//   const products = await api.getProducts();
//   const serviceList = await api.getServices();
//   const categories = await api.getCategories();
//   const mainCarouselData = await api.getMainCarouselData();
//   const menFashionProducts = await api.getMenFashionProducts();
//   const electronicsProducts = await api.getElectronicsProducts();
//   const womenFashionProducts = await api.getWomenFashionProducts();
//   return {
//     props: {
//       brands,
//       products,
//       categories,
//       serviceList,
//       mainCarouselData,
//       menFashionProducts,
//       electronicsProducts,
//       womenFashionProducts,
//     },
//   };
// };
// export default Market;

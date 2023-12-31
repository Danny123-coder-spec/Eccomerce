import Link from "next/link";
import { Box, Button, Card, Grid, styled, useTheme } from "@mui/material";
import { H3, H6, Paragraph } from "components/Typography";
import bg from "../../assets/hero2.jpeg";
import Image from "next/image";
import first from "../../assets/first.jpeg";
import second from "../../assets/second.jpeg";
const boxStyle = {
  height: 230,
  display: "flex",
  borderRadius: 0,
  boxShadow: "none",
  alignItems: "center",
};
// const LeftContentBox = () => {

//   // background: theme.palette.primary[100],
//  style={{
//   backgroundImage: "url('/assets/images/Gift Shop/first.jpeg')",
//   // backgroundImage: "url('/as')",
//   backgroundSize: "contain",
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center",
//  }}
  
  
// };
const RightContentBox = styled(Card)(({ theme }) => ({
  ...boxStyle,
  background: theme.palette.primary[100],
  backgroundImage: "url('/assets/images/Gift Shop/Offer 1.png')",
  backgroundSize: "contain",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  display: "block",
}));
const RightContent = styled(Box)({
  paddingLeft: 60,
  "& p": {
    fontSize: 13,
    lineHeight: 1.4,
  },
});
const StyledButton = styled(Button)({
  fontWeight: 600,
  fontSize: "12px",
  marginTop: "5px",
  padding: "4px 12px",
  textDecoration: "underline",
});
const Section3 = () => {
  const { breakpoints } = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={7} md={7}>
        <Link href="/sale-page-1">
          {/* <LeftContentBox/> */}
         
           <Image
            src={first}
            style={{ width: "100%", height: "80%" , resizeMode: "contain"}}
            
          />
        </Link>
      </Grid>

      <Grid
        item
        xs={12}
        sm={5}
        md={5}
        sx={{
          pl: "24px !important",
          [breakpoints.down("sm")]: {
            pl: "0 !important",
          },
        }}
      >
        <Link href="/sale-page-1">
        
          <Image
            src={second}
            style={{ width: "100%", height: "80%", resizeMode: "contain" }}
            className="w-full "
          />
        </Link>
      </Grid>
    </Grid>
  );
};
export default Section3;

{/* <RightContentBox
            sx={{
              p: "20px",
            }}
          >
           
          </RightContentBox> */}
 {/* <Box textAlign="center">
              <H6>Shop Online Gift Under</H6>
              <H3>$20.00</H3>
              <StyledButton>Shop Now</StyledButton>
            </Box>
            <Box className="content" /> */}

{/* <LeftContentBox>
            <RightContent px="20px">
              <H6>Holiday’s Offer!</H6>
              <H3>Sale 50% Off</H3>
              <Paragraph
                sx={{
                  mt: 1,
                }}
              >
                Use Code : Holi50
              </Paragraph>

              <Box>
                <StyledButton>Shop Now</StyledButton>
              </Box>
            </RightContent>
          </LeftContentBox>  */}
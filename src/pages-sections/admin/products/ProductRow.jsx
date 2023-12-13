import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Grid } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { Delete, Description, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { IoIosClose } from "react-icons/io";
import BazaarSwitch from "components/BazaarSwitch";
import Modal from "@mui/material/Modal";
import { Paragraph, Small } from "components/Typography";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Image from "next/image";
import { currency } from "lib";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../StyledComponents";
import { baseURL } from "../../../../src/axios";

// ========================================================================

// ========================================================================
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

const ProductRow = ({ product }) => {
  const { category, name, price, image, brand, id, description } = product;
  const router = useRouter();
  const [open, setOpen] = useState(null);
  // const [productPulish, setProductPublish] = useState(published);

  const handleOpen = (id) => setOpen(id);
  const handleClose = () => setOpen(null);

  const handleDelete = async () => {
    try {
      const response = await baseURL.delete(
        `/admin/products/getSingleProduct/${id}`
      );
      console.log(response.data);
      router.reload();
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
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
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Image
            src={image}
            height={40}
            width={40}
            alt=""
            className="object-contain"
          />
          <Box>
            <Paragraph>{name}</Paragraph>
            <Small color="grey.600">#{id.split("-")[0]}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      {/* <StyledTableCell align="left">
        <Avatar
          src={brand}
          sx={{
            width: 55,
            height: "auto",
            borderRadius: 0,
          }}
        />
      </StyledTableCell> */}

      <StyledTableCell align="left">Ghc {price}</StyledTableCell>

      <StyledTableCell align="left">
        {/* <BazaarSwitch
          color="info"
          checked={productPulish}
          onChange={() => setProductPublish((state) => !state)}
        /> */}
        <p className="truncate w-[6rem]">{description}</p>
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/products/${id}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye onClick={() => handleOpen(id)} />
        </StyledIconButton>

        <StyledIconButton>
          <Delete onClick={handleDelete} />
        </StyledIconButton>
      </StyledTableCell>

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
                src={image}
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
                {name}
              </div>
              <div className="text-gray-400 pt-3 font-semibold text-[0.9rem]">
                CATEGORY:{category}
              </div>
              <div className="">
                <Typography
                  className="font-bold text-xl text-[#D23F57]"
                  id="transition-modal-price"
                  sx={{ mt: 2 }}
                >
                  Ghc {price}
                </Typography>

                <div className="flex flex-row pt-2 items-center gap-4">
                  <div className="flex gap-[0.127rem]">
                    {/* Dynamically render review icons based on average rating */}
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        size={18}
                        color={
                          index < calculateAverageRating(id)
                            ? "#FDCC0D"
                            : "#e4e5e9"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {
                      reviewsData.filter(
                        (review) => review.product === id
                      ).length
                    }{" "}
                    Reviews
                  </span>
                </div>
              </div>
              <Typography
                className="text-gray-500 text-[0.9rem] "
                id="transition-modal-description"
                sx={{ mt: 2 }}
              >
                {description}
              </Typography>
              <button
                onClick={handleDelete}
                className="bg-[#D23F57] text-white font-semibold px-4 py-2.5 rounded-sm mt-6 hover:bg-[#e11537] transition-all hover:text-white duration-100 cursor-pointer"
              >
                Delete Product
              </button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </StyledTableRow>
  );
};
export default ProductRow;

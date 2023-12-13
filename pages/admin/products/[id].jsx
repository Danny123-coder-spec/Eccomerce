// import { Box } from "@mui/material";
// import * as yup from "yup";
// import { H3 } from "components/Typography";
// import { ProductForm } from "pages-sections/admin";
// import VendorDashboardLayout from "components/layouts/vendor-dashboard"; // form field validation schema

// const validationSchema = yup.object().shape({
//   name: yup.string().required("required"),
//   category: yup.string().required("required"),
//   description: yup.string().required("required"),
//   stock: yup.number().required("required"),
//   price: yup.number().required("required"),
//   sale_price: yup.number().required("required"),
//   tags: yup.object().required("required"),
// }); // =============================================================================

// EditProduct.getLayout = function getLayout(page) {
//   return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
// }; // =============================================================================

// export default function EditProduct(){
//   const INITIAL_VALUES = {
//     name: "",
//     tags: "",
//     stock: "",
//     price: "",
//     category: "",
//     sale_price: "",
//     description: "",
//   };

//   const handleFormSubmit = () => {};

//   return (
//     <Box py={4}>
//       <H3 mb={2}>Edit Product</H3>

//       <ProductForm
//         initialValues={INITIAL_VALUES}
//         validationSchema={validationSchema}
//         handleFormSubmit={handleFormSubmit}
//       />
//     </Box>
//   );
// }


import { Box } from "@mui/material";
import * as yup from "yup";
import { useRouter } from "next/router";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard"; // =============================================================================
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { baseURL } from "../../../src/axios";

import { useEffect, useState } from "react";
import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Divider } from "@mui/material";
import { firebaseConfig, firebaseStorageUrl } from "utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, firebaseStorageUrl);

// const storage = getStorage(app, firebaseStorageUrl)

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUploadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);

  const storageReference = ref(storage, `eccomerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

EditProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "electronics",
  sale_price: 0,
  stock: 0,
  tags: 0,
  imageUrl: "",
};
// =============================================================================
export default function EditProduct() {
  const [product, setProduct] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  async function handleImage(event) {
    // console.log(event.target.files);
    const extractImageUrl = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );
    // console.log(extractImageUrl);

    if (extractImageUrl !== "") {
      setProduct({
        ...product,
        imageUrl: extractImageUrl,
      });
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.string().required("required"),
    description: yup.string().required("required"),
    stock: yup.number().required("required"),
    price: yup.number().required("required"),
    sale_price: yup.number().required("required"),
    tags: yup.number(),
  });

  // console.log(formData);

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const response = await baseURL.get( `/admin/products/getSingleProduct/${id}`);
        setProduct(response?.data)
      } catch (error) {
        console.log('Error fetching product', error.message);
      }
    }
    fetchProducts();
  }, [id]);

  // const handleInputChange = (e) => {
  //   const {name, value} = e.target;
  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     [name]:value,
  //   }));

  // }

  const handleFormSubmit = async () => {
    try {
      setSubmitting(true);

      const response = await baseURL.put(`/admin/products/getSingleProduct/${id}`, product)
      // console.log("Form values:", values);
      console.log(response?.data);

      if (response?.data?.status === 200) {
       return  toast.success("Product updated successfully"); 
        
      } else {
        return toast.error("Update failed");
      }
    } catch (error) {
      // Handle errors here, you might want to log the error or show a specific message
      console.log(error.message);
      // console.error("Error creating product:", error.message);
      toast.error("Unable to update product");
    }finally {
      setSubmitting(false); // Set the state back to false when form submission completes
    }
  };

  const handleFileDelete = (file) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

  return (
    <Box py={4}>
      <ToastContainer />
      <H3 mb={2}>Edit Product</H3>

      <Card
        sx={{
          p: 6,
        }}
      >
        <Formik onSubmit={handleFormSubmit} initialValues={product}>
          {({
            values,

            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    color="info"
                    size="medium"
                    placeholder="Name"
                    value={product.name}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setProduct((prevData) => ({
                        ...prevData,
                        name: e.target.value,
                      }))
                    }
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="category"
                    label="Select Category"
                    color="info"
                    size="medium"
                    placeholder="Category"
                    onBlur={handleBlur}
                    value={product.category}
                    onChange={(e) =>
                      setProduct((prevData) => ({
                        ...prevData,
                        category: e.target.value,
                      }))
                    }
                    select
                    SelectProps={{
                      multiple: false,
                    }}
                  >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="fashion">Fashion</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    py={4}
                    px={{
                      md: 10,
                      xs: 4,
                    }}
                    display="flex"
                    minHeight="200px"
                    alignItems="center"
                    borderRadius="10px"
                    border="1.5px dashed"
                    flexDirection="column"
                    borderColor="grey.300"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <Button
                      type="button"
                      variant="outlined"
                      color="info"
                      sx={{
                        px: 4,
                        my: 4,
                      }}
                    >
                      <input
                        className="bg-transparent border-none"
                        type="file"
                        
                        onChange={handleImage}
                        accept="image/"
                        max="1000000"
                      />
                    </Button>

                    <span color="grey.600"></span>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    rows={6}
                    multiline
                    fullWidth
                    color="info"
                    size="medium"
                    name="description"
                    label="Description"
                    onBlur={handleBlur}
                    value={product.description}
                    onChange={(e) =>
                      setProduct((prevData) => ({
                        ...prevData,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Description"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="stock"
                    color="info"
                    size="medium"
                    label="Stock"
                    placeholder="Stock"
                    onBlur={handleBlur}
                    value={product.stock}
                    onChange={(e) =>
                      setProduct((prevData) => ({
                        ...prevData,
                        stock: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="tags"
                    label="Tags"
                    color="info"
                    size="medium"
                    placeholder="Tags"
                    onBlur={handleBlur}
                    value={product.tags}
                    onChange={(e) =>
                      setProduct((prevData) => ({
                        ...prevData,
                        tags: e.target.value,
                      }))
                    }
                    error={!!touched.tags && !!errors.tags}
                    helperText={touched.tags && errors.tags}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="price"
                    color="info"
                    size="medium"
                    type="number"
                    onBlur={handleBlur}
                    value={product.price}
                    label="Regular Price"
                    onChange={(e) =>
                      setProduct((prevData) => ({
                        ...prevData,
                        price: e.target.value,
                      }))
                    }
                    placeholder="Regular Price"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    color="info"
                    size="medium"
                    type="number"
                    name="sale_price"
                    label="Sale Price"
                    onBlur={handleBlur}
                    value={product.sale_price}
                    onChange={(e) =>
                      setProduct((prevData) => ({
                        ...prevData,
                        sale_price: e.target.value,
                      }))
                    }
                    placeholder="Sale Price"
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Button
                    variant="contained"
                    className="bg-blue-400 text-white hover:bg-blue-500"
                    type="submit"
                  >
                    {submitting ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white ..."
                        viewBox="0 0 24 24"
                      >
                        {/* ... (loading spinner content) */}
                      </svg>
                    ) : (
                      "Update product"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}

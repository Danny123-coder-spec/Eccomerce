import { useState } from "react";
import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";
import { firebaseConfig, firebaseStorageUrl } from "utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref
} from "firebase/storage";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Divider } from "@mui/material";

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
const ProductForm = (props) => {
  const { initialValues, validationSchema, handleFormSubmit } = props;
  const [files, setFiles] = useState([]);
  const [img, setImg] = useState("");


  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files) => {
    files.forEach((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(files);
  };

  async function handleImage(event) {
    console.log(event.target.files);
    const extractImageUrl = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );
    console.log(extractImageUrl);

   
  }

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };
  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
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
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
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
                  value={values.category}
                  onChange={handleChange}
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                  select
                  SelectProps={{
                    multiple: false,
                  }}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                </TextField>
              </Grid>

              {/* <DropZone onChange={(files) => handleChangeDropZone(files)} /> */}
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

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index} onChange={handleImage}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>
              {/* onChange={(e) => setImg(e.target.files[0])} */}
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
                  onChange={handleChange}
                  placeholder="Description"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
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
                  value={values.stock}
                  onChange={handleChange}
                  error={!!touched.stock && !!errors.stock}
                  helperText={touched.stock && errors.stock}
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
                  value={values.tags}
                  onChange={handleChange}
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
                  value={values.price}
                  label="Regular Price"
                  onChange={handleChange}
                  placeholder="Regular Price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
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
                  onChange={handleChange}
                  placeholder="Sale Price"
                  value={values.sale_price}
                  error={!!touched.sale_price && !!errors.sale_price}
                  helperText={touched.sale_price && errors.sale_price}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" className="bg-blue-400 text" type="submit">
                  Save product
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};
export default ProductForm;

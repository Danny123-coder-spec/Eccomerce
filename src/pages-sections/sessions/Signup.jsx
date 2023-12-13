import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Button, Checkbox, Box, FormControlLabel } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, Grid, MenuItem, TextField, styled, alpha } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const router = useRouter();

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        values
      );
      console.log(response.data);
      if (response.data.status === 200) {
        toast.success("Registration successful. Please Login");
        router.push("/login");
      } else if (response.data.status === 400) {
        toast.error("User already exists. Please Login");
      } else {
        toast.error(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Registration failed: ${response.data.message}`);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        {/* <BazaarImage
          src="/assets/images/logo.svg"
          sx={{
            m: "auto",
          }}
        /> */}

        <div className="flex justify-center">
          <Image height={50} width={70} src={logo} alt="logo" />
        </div>

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Create Your Account
        </H1>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          label="Full Name"
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder="Ralph Adwards"
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email or Phone Number"
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Password"
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label="Retype Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <Grid item sm={6} xs={12}>
          <TextField
            select
            fullWidth
            color="info"
            size="medium"
            name="role"
            onBlur={handleBlur}
            placeholder="Role"
            onChange={handleChange}
            value={values.role}
            label="Select Role"
            error={!!touched.role && !!errors.role}
            helperText={touched.role && errors.role}
          >
            <MenuItem value="customer">customer</MenuItem>
            
            <MenuItem value="vendor">vendor</MenuItem>
          </TextField>
        </Grid>

        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={values.agreement || false}
            />
          }
          label={
            <FlexBox
              flexWrap="wrap"
              alignItems="center"
              justifyContent="flex-start"
            >
              By signing up, you agree to
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button
          fullWidth
          type="submit"
          className="bf-btn bg-[#D23F57] text-white hover:bg-[#D23F57]"
          variant="contained"
          sx={{
            height: 44,
          }}
        >
          Create Account
        </Button>
      </form>

      <SocialButtons />
      <FlexRowCenter mt="1.25rem">
        <Box>Already have an account?</Box>
        <Link href="/login" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Login
            </H6>
          </a>
        </Link>
      </FlexRowCenter>
    </Wrapper>
  );
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  role: "customer",
  agreement: false,
};
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  role: yup.string().required("Role is required"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});
export default Signup;

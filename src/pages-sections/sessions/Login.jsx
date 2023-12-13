import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, Box, styled } from "@mui/material";
import axios from "axios";
import { Grid, MenuItem, TextField } from "@mui/material";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { createRouter } from "next/router";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": { ...googleStyle, "&:hover": googleStyle },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  // const {use, setUser, isAuthUser, setIsAuthUser} = useAppContext();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const router = useRouter();
  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/auth",
        values
      );
      console.log(response.data);
      console.log(response.data.auth.role);

      if (response.data.status === 200) {
        toast.success("Login successfull");
        // setIsAuthUser(true)

        const userRole = response.data.auth.role;

        switch (userRole) {
          case "admin":
            router.push("/vendor/dashboard");
            break;
          case "vendor":
            router.push("/vendor/dashboard");
            break;
          default:
            router.push("/");
        }
      } else {
        toast.error(`Login failed ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
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
          Welcome To Shop
        </H1>

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
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
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

        <Button
          fullWidth
          type="submit"
          className="bg-[#D23F57] text-white hover:bg-[#D23F57]"
          variant="contained"
          sx={{
            height: 44,
          }}
        >
          Login
        </Button>
      </form>

      <SocialButtons />

      <FlexRowCenter mt="1.25rem">
        <Box>Don&apos;t have account?</Box>
        <Link href="/signup" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Sign Up
            </H6>
          </a>
        </Link>
      </FlexRowCenter>

      <FlexBox
        justifyContent="center"
        bgcolor="grey.200"
        borderRadius="4px"
        py={2.5}
        mt="1.25rem"
      >
        Forgot your password?
        <Link href="/reset-password" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox>
    </Wrapper>
  );
};

const initialValues = {
  email: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required"),
});
export default Login;

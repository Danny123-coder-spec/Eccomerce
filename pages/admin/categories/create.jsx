import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { CategoryForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import api from "utils/__api__/products";

// =============================================================================
CreateCategory.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreateCategory() {
  const INITIAL_VALUES = {
    name: "",
    parent: [],
    featured: false,
  };

  // form field validation schema
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
  });
  const handleFormSubmit = async(values) => {
    try {
      const formData = new FormData()
      formData.append("name", values.name);
      formData.append("parent", values.parent);
      formData.append("featured", values.featured);
      
      const response = await axios.post('http://localhost:3000/api/admin/categories/addCategory', {...values});
      console.log("Form values:", values);
      console.log(response);
      
      if(response?.data?.status === 500){

      return toast.error('Category creation failed');
      }
      
      return toast.success('Category created successfully');
        // toast.error('Unable to create product');
     
    } catch (error) {
      // Handle errors here, you might want to log the error or show a specific message
      console.error("Error creating product:", error);
      toast.error('Unable to create product');
    }
  };
  return (
    <Box py={4}>
      <ToastContainer/>
      <H3 mb={2}>Create Category</H3>

      <CategoryForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}

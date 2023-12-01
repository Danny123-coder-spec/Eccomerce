import { Box } from "@mui/material";
import * as yup from "yup";
import { useRouter } from "next/router";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard"; // =============================================================================
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

CreateProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function CreateProduct() {
  const INITIAL_VALUES = {
    name: "",
    tags: 0,
    stock: 0,
    price: "",
    category: "Electronics",
    sale_price: 0,
    description: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.string().required("required"),
    description: yup.string().required("required"),
    stock: yup.number().required("required"),
    price: yup.number().required("required"),
    sale_price: yup.number().required("required"),
    tags: yup.number(),
  });

  

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("stock", values.stock)
      formData.append("price", values.price)
      formData.append("sale_price", values.sale_price)
      formData.append("description", values.description)
      formData.append("category", values.category)
      const response = await axios.post('http://localhost:3000/api/admin/products/add-Product', {...values});
      console.log("Form values:", values);
      console.log(response);
      
      if(response?.data?.status === 200) {
        return toast.success('Product created successfully');
      } else {
        return toast.error('Product creation failed')
      }
     
    } catch (error) {
      // Handle errors here, you might want to log the error or show a specific message
      console.error("Error creating product:", error.message);
      toast.error('Unable to create product');

    }
  };
  

  return (
    <Box py={4}>
      <ToastContainer/>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}

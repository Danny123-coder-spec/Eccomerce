import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { useState, useEffect } from "react";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { ProductRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { baseURL } from "../../../src/axios";
import Router, { useRouter } from "next/router";
// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    align: "left",
  },
  // {
  //   id: "brand",
  //   label: "Brand",
  //   align: "left",
  // },
  {
    id: "price",
    label: "Price",
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

ProductList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function ProductList(props) {
  const [productsData, setProductData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { products } = props; // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID

  // const filteredProducts = productsData.map((item) => ({
  //   id: item?._id,
  //   name: item.name,
  //   // brand: item.brand,
  //   price: item?.price,
  //   image: item?.imageUrl,
  //   description: item?.description,
  //   category: item?.category,
  // }));

  const filteredProducts = productsData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.price.toString().includes(searchValue.toLowerCase()) ||
        item.description.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => ({
      id: item?._id,
      name: item.name,
      price: item?.price,
      image: item?.imageUrl,
      description: item?.description,
      category: item?.category,
    }));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredProducts,
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await baseURL.get("/admin/products/getAllProduct");
      setProductData(response?.data);
    };

    fetchAllProducts();
  }, []);

  const router = useRouter();

  return (
    <Box py={4}>
      <H3 mb={2}>Product List</H3>

      <SearchArea
        handleSearch={(value) => setSearchValue(value)}
        buttonText="Add Product"
        handleBtnClick={() => router.push("/admin/products/create")}
        searchPlaceholder="Search Product..."
      />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={products.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((product, index) => (
                  <ProductRow product={product} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(products.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const products = await api.products();
  return {
    props: {
      products,
    },
  };
};

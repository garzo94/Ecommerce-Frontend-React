import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography, Box, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useSnackbar } from "notistack";
import ItemsCar from "./ItemsCar";
import { postOrders } from "../pages/features/orderSlice";
import { clearCarItems } from "../pages/features/carSlice";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

const validationSchema = yup.object({
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postalcode: yup.string().required("Postal code is required"),
  country: yup.string().required("Country is required"),
});

export default function FormLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { totalPrice } = useAppSelector((state) => state.car);
  const { orderItems } = useAppSelector((state) => state.order);
  const [order, setOrder] = useState(false);
  //ARUwE3S7TQRrMO_DpQ36HPpq-oBhvlYaNlAmG9A14WCabr0znzMZwYuUy_QSzmSrK0QQUtJE-h3ZcvIr
  const dataItemsOrder = orderItems.map((order) => {
    return {
      idprod: order.id_prod,
      qty: order.total,
      price: order.total * order.price,
    };
  });
  const [sdkReady, setSdkReady] = useState(false);

  const addPaypal = () => {
    const script = document.createElement("script");
    script.type = "text/javasript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARUwE3S7TQRrMO_DpQ36HPpq-oBhvlYaNlAmG9A14WCabr0znzMZwYuUy_QSzmSrK0QQUtJE-h3ZcvIr&locale=en_US";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  // adding script
  useEffect(() => {
    addPaypal();
  }, []);

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      postalcode: "",
      country: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        postOrders({
          data: {
            orderItems: dataItemsOrder,
            totalPrice: totalPrice,
            shippingAddress: {
              address: values.address,
              city: values.city,
              postalcode: values.postalcode,
              country: values.country,
            },
          },
          token: localStorage.getItem("authToken")!,
        })
      );
      dispatch(
        clearCarItems({
          token: localStorage.getItem("authToken")!,
        })
      );
      navigate("/");
      enqueueSnackbar("Your order was made successfully!");
    },
  });

  function handleOrder() {
    console.log("que pedo");
    formik.handleSubmit();
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          width: { lg: "50%", md: "60%", sm: "70%", xs: "100%" },
          textAlign: "center",
          padding: "3rem",
          border: "1px solid gray",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { lg: "93%", md: "95%", xm: "100%", xs: "90%" },
            mt: 1,
            bgcolor: "rgba(204,193,185,0.5)",
            p: 2,
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Total section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid gray",
            }}
          >
            <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
              Total
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "600",
              }}
            >
              $ {totalPrice}.00
            </Typography>
          </Box>
          {/* Sub-total section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>Subtotal</Typography>
            <Typography>${totalPrice}.00</Typography>
          </Box>
          {/* Delivery */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              borderBottom: "1px solid gray",
            }}
          >
            <Typography>Delivery</Typography>
            <Typography>$ 00.00</Typography>
          </Box>
          {/* <Divider /> */}
          <Typography sx={{ alignSelf: "flex-start", mt: 1 }}>
            Order Items
          </Typography>
          <ItemsCar />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography sx={{ pb: 2, fontSize: 20, mt: 2 }}>
              Shipping
            </Typography>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              size="small"
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              size="small"
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              size="small"
              id="postalcode"
              name="postalcode"
              label="Postal Code"
              value={formik.values.postalcode}
              onChange={formik.handleChange}
              error={
                formik.touched.postalcode && Boolean(formik.errors.postalcode)
              }
              helperText={formik.touched.postalcode && formik.errors.postalcode}
            />
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              size="small"
              id="country"
              name="country"
              label="Country"
              type="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Box>
          <Box sx={{ p: 3, mt: 5 }}>
            <PayPalButton amount={totalPrice} onSuccess={handleOrder} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

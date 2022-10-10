import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography, Box, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useSnackbar } from "notistack";
import ItemsCar from "./ItemsCar";

const validationSchema = yup.object({
  address: yup.string().email().required("Address is required"),
  city: yup.string().required("City is required"),
  postalcode: yup.string().required("Postal code is required"),
  country: yup.string().required("Country is required"),
});

export default function FormLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { totalPrice } = useAppSelector((state) => state.car);

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      postalcode: "",
      country: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("submited!");
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "40%",
          textAlign: "center",
          padding: "3rem",
          border: "1px solid gray",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ pb: 2, fontSize: 20 }}>Shipping</Typography>
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
          error={formik.touched.postalcode && Boolean(formik.errors.postalcode)}
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

          <Button
            //   onClick={() => navigate("/order")}
            sx={{
              mt: "50px",
              color: "white",
              bgcolor: "black",
              borderRadius: "10px",
              letterSpacing: "2px",

              "&:hover": {
                boxShadow: "3px 3px 10px rgba(0,0,0,0.5)",
                bgcolor: "black",
              },
            }}
            type="submit"
          >
            Order
          </Button>
        </Box>
      </form>
    </>
  );
}

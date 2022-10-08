import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginUser } from "../pages/features/authUserSlice";
import { useSnackbar } from "notistack";
import { getCarItems } from "../pages/features/carSlice";

const validationSchema = yup.object({
  username: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function FormLogin() {
  const { isAuthenticated } = useAppSelector((state) => state.login);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.login);

  useEffect(() => {
    if (error !== "") {
      setDisplay("block");
    }
  }, [error]);
  const [display, setDisplay] = useState("none");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      dispatch(getCarItems(localStorage.getItem("authToken")));
    },
  });

  useEffect(() => {
    if (isAuthenticated && error === "") {
      enqueueSnackbar("You have successfully logged in!");
    }
  }, [error, isAuthenticated]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: "70%", textAlign: "center" }}
    >
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        size="small"
        id="username"
        name="username"
        label="Email"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        size="small"
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button
        sx={{
          bgcolor: "black",
          "&:hover": {
            backgroundColor: "black",
            boxShadow: "5px 5px 10px rgba(0,0,0,0.4)",
          },
        }}
        variant="contained"
        fullWidth
        type="submit"
      >
        Login
      </Button>
      <p
        style={{
          color: "red",
          fontFamily: "sans-serif",
          display: `${display}`,
          fontSize: 15,
        }}
      >
        {error}
      </p>
    </form>
  );
}

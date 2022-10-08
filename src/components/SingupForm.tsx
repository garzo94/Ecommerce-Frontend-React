import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginUser } from "../pages/features/authUserSlice";
import { useSnackbar } from "notistack";
import { getCarItems } from "../pages/features/carSlice";
import { signupUser } from "../pages/features/authUserSlice";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function SignupForm() {
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
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signupUser(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated && error === "") {
      enqueueSnackbar("You have successfully sign up!");
    }
  }, [error, isAuthenticated]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: "70%", textAlign: "center" }}
    >
      {" "}
      <Typography>Register</Typography>
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        size="small"
        id="name"
        name="name"
        label="Username"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        size="small"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
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
        Sign up
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

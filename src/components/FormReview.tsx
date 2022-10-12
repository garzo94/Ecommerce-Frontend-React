import React, { useState, useEffect } from "react";
import { TextField, Box, Rating, Button, Typography } from "@mui/material";
import { postReview } from "../pages/features/orderSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useSnackbar } from "notistack";
interface idType {
  id: number;
}
export default function FormReview({ id }: idType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  //handle errors
  const { error } = useAppSelector((state) => state.order);
  useEffect(() => {
    if (error !== "") {
      enqueueSnackbar(error);
    }
  }, [handleSubmit]);
  // end errors

  function handleSubmit() {
    dispatch(
      postReview({
        id: id,
        data: { rating: ratingValue, comment: value },
        token: localStorage.getItem("authToken")!,
      })
    );
    navigate(``);
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Review this product:
      </Typography>
      <Rating
        precision={0.5}
        onChange={(event, newValue) => {
          setRatingValue(newValue!);
        }}
      />
      <TextField
        sx={{ mt: 2 }}
        onChange={handleChange}
        label="Enter your review"
        multiline
        maxRows={4}
      />
      <Button
        onClick={handleSubmit}
        sx={{
          color: "white",
          bgcolor: "black",
          mt: 1,
          "&:hover": {
            bgcolor: "black",
            boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
}

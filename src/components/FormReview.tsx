import React, { useState } from "react";
import { TextField, Box, Rating, Button, Typography } from "@mui/material";
import { postReview } from "../pages/features/orderSlice";
import { useAppDispatch } from "../hooks/hooks";
import { useDispatch } from "react-redux";
interface idType {
  id: number;
}
export default function FormReview({ id }: idType) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  console.log(ratingValue, "ratinggg");
  function handleSubmit() {
    dispatch(
      postReview({
        id: id,
        data: { rating: ratingValue, comment: value },
        token: localStorage.getItem("authToken")!,
      })
    );
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
        sx={{ color: "white", bgcolor: "black", mt: 1 }}
      >
        Submit
      </Button>
    </Box>
  );
}

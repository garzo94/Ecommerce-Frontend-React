import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
const sigleProduct = {
  _id: "1",
  name: "Car20",
  image: "/images/airpodes.jpg",
  description: "Acool description goes here!",
  brand: "My brand",
  Category: "My category",
  price: 45.56,
  countInStock: 10,
  rating: 4.5,
  numReviews: 12,
};

export default function Main() {
  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <Box sx={{ width: "50%", height: "30rem", p: 5 }}>
        <CardMedia
          component="img"
          height="100%"
          image="src\assets\images\airpods.jpg"
          alt="green iguana"
        />
      </Box>
      <Box sx={{ width: "50%", p: 5 }}>
        <Typography sx={{ fontSize: 18 }} color="text.primary">
          Air Pods
        </Typography>
      </Box>
    </Box>
  );
}

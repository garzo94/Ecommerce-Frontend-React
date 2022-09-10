import React from "react";
import products from "../../data";
import { Grid, Box, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { CardItem } from "../../types/Types";
import image from "../../assets/images/back.jpg";
import Footer from "./Footer";

export default function Main() {
  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Box
        sx={{
          height: "100% ",
          width: "100%",
          position: "relative",
          bgcolor: "black",
        }}
      >
        <Box
          component="img"
          src="src\assets\back.jpg"
          sx={{ height: "100%", width: "100%", objectFit: "contain" }}
        ></Box>
        <Typography
          sx={{
            position: "absolute",
            fontSize: { lg: 90, md: 80, sm: 60, xs: 40 },
            left: { sm: -590, xs: -600 },
            color: "#fff",
            top: { sm: 75, top: 35 },
            fontFamily: "'Russo One', sans-serif",
            marginLeft: 80,
          }}
        >
          {" "}
          DrumShop
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            fontSize: { lg: 20, md: 15, sm: 15, xs: 10 },
            left: { sm: -583, xs: -598 },
            color: "#fff",
            top: { md: 185, sm: 148, xs: 85 },
            fontFamily: "'Russo One', sans-serif",
            marginLeft: 80,
          }}
        >
          {" "}
          Drum to live. Drum to live
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          p: 10,

          display: "flex",

          justifyContent: "center",
          bgcolor: "rgb(204,193,185)",
        }}
      >
        {products.map((product: CardItem) => {
          return (
            <Grid key={product._id} item>
              <ProductCard
                name={product.name}
                img={product.image}
                desc={product.description}
                rating={product.rating}
                price={product.price}
                reviews={product.numReviews}
              />
            </Grid>
          );
        })}
      </Grid>
      <Footer />
    </Box>
  );
}

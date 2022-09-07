import React from "react";
import products from "../../data";
import { Grid, Box } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { CardItem } from "../../types/Types";
import image from "../../assets/images/back.jpg";
import Footer from "./Footer";

export default function Main() {
  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Box
        sx={{
          height: "100%",
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
        <h1
          style={{
            position: "absolute",
            fontSize: "5.5rem",
            color: "#fff",
            top: 100,
            fontFamily: "'Russo One', sans-serif",
            marginLeft: 80,
          }}
        >
          {" "}
          DrumShop
        </h1>
        <h6
          style={{
            position: "absolute",
            fontSize: "1rem",
            color: "#fff",
            top: 210,
            fontFamily: "sans-serif",
            marginLeft: 90,
          }}
        >
          Live to drum. Drum to live.
        </h6>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          p: 5,
          pb: 35,
          display: "flex",
          flexDirection: "center",
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

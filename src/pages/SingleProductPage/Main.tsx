import React from "react";

import CardMedia from "@mui/material/CardMedia";
import { Box, Typography, Stack, Button, Link, Rating } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Footer from "../WelcomePage/Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
    <Box sx={{ height: "100%", display: "flex", position: "relative" }}>
      <Box sx={{ width: "50%", height: "30rem", p: 5, pb: 32 }}>
        <CardMedia
          component="img"
          height="100%"
          image="src\assets\images\Drum1.png"
          alt="green iguana"
          sx={{ objectFit: "contain" }}
        />
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            pt: 0,
            gap: 1,

            position: "absolute",
          }}
        >
          <a
            href="https://twitter.com/alex_garzo"
            target="_blank"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/garzo94"
            target="_blank"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/alexander-garzo/"
            target="_blank"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            <LinkedInIcon />
          </a>
        </Stack>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bgcolor: "rgb(204,193,185)",
          top: 0,
          left: 0,
          width: "25%",
          height: "100%",
          zIndex: "-1",
        }}
      ></Box>
      <Box sx={{ width: "50%", textAlign: "start" }}>
        <Typography
          sx={{
            fontSize: 50,
            mt: 10,
            ml: 8,
            fontWeight: "600",
          }}
        >
          Air Pods
        </Typography>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            ml: 8,
            alignItems: "end",
            justifyContent: "start",
          }}
        >
          <Rating
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />
          <Typography
            sx={{ fontSize: 12, mb: 0, ml: 1 }}
            color="text.secondary"
            gutterBottom
          >
            {`12 reviews`}
          </Typography>
        </Stack>
        <Typography sx={{ ml: 8, mt: 3.5, fontSize: 30, fontWeight: "600" }}>
          $ 20.45
        </Typography>
        <Typography sx={{ ml: 8, pr: 2, fontSize: 14, textAlign: "justify" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et quidem
          iure fortasse, sed tamen non gravissimum est testimonium multitudinis.
          Philosophi autem in suis lectulis plerumque moriuntur. Pudebit te,
          inquam, illius tabulae, quam Cleanthes sane commode verbis depingere
          solebat. Duo Reges: autem in suis lectulis plerumque moriuntur.
          Pudebit te, inquam, illius tabulae, quam Cleanthes sane commode verbis
          depingere solebat. Duo Reges:
        </Typography>
        <Button
          startIcon={<ShoppingCartIcon />}
          sx={{
            color: "white",

            bgcolor: "black",
            borderRadius: "15px",
            width: "40%",
            letterSpacing: "1px",
            ml: 8,
            mt: 2,
            transition: "0.5s",
            "&:hover": {
              letterSpacing: "1.5px",
              bgcolor: "black",
            },
            "&::before": {
              content: "''",
              position: "absolute",
              top: 0,
              left: 15,
              width: "40%",
              height: "100%",
              background:
                "linear-gradient(to left, rgba(255,255,255,0.2), transparent) ",
              transform: "skewX(45deg) translateX(0) ",
              transition: "0.5s",
            },
            "&:hover::before": {
              transform: "skewX(45deg) translateX(30%)",
            },
          }}
        >
          Add to Car
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import { CardMedia } from "@mui/material";
import { Box, Typography, Stack, Button, Link, Rating } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Footer from "../WelcomePage/Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getProduct } from "../features/productSlice";
export default function Main() {
  const { singleProduct, loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  console.log(singleProduct.rating);
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProduct({ id }));
    }
  }, [id]);

  return (
    <Box
      sx={{
        // height: { lg: "135vh", md: "135vh", sm: "190vh", xs: "110vh" },
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
        }}
      >
        <Box
          sx={{
            p: { lg: 5, md: 5, sm: 5, xs: 0 },
            // pb: 32,
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={`http://127.0.0.1:8000${singleProduct?.image}`}
            alt="Drum image"
            sx={{ objectFit: "contain", pt: { lg: 0, md: 0, xs: 5 } }}
          />
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              pt: 0,
              gap: 1,
              top: { sm: 15, xs: 15 },
              left: 4,
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
        <Box
          sx={{
            width: { lg: "45%", md: "50%", sm: "70%", xs: "72%" },
            ml: { lg: 0, md: 0, sm: "auto", xs: "auto" },
            py: { lg: 10, md: 10, sm: -15, xs: 5 },
            textAlign: "start",
          }}
        >
          <Typography
            sx={{
              fontSize: 50,
              fontWeight: "600",
            }}
          >
            {singleProduct.name}
          </Typography>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
            }}
          >
            <Rating
              key={"rating"}
              name="half-rating-read"
              value={parseInt(singleProduct.rating)}
              precision={0.5}
              readOnly
            />
            <Typography
              sx={{ fontSize: 12, mb: 0, ml: 1 }}
              color="text.secondary"
              gutterBottom
            >
              {singleProduct.numReviews + " reviews"}
            </Typography>
          </Stack>
          <Typography sx={{ mt: 3.5, fontSize: 30, fontWeight: "600" }}>
            {"$ " + singleProduct.price}
          </Typography>
          <Typography sx={{ pr: 3, fontSize: 14, textAlign: "justify" }}>
            {singleProduct.description}
          </Typography>
          <Button
            startIcon={<ShoppingCartIcon />}
            sx={{
              color: "white",

              bgcolor: "black",
              borderRadius: "15px",
              width: { lg: "40%", md: "50%", xs: "60%" },
              letterSpacing: "1px",

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
      </Box>

      <Footer />
    </Box>
  );
}

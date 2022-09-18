import React from "react";
import { Box, Typography, CardMedia, Button, IconButton } from "@mui/material";
import image from "C:/Users/alex2/Desktop/Projects/react/Ecommerce/src/assets/images/Drum1.png";
import IncrementBtn from "../../components/incrementBtn";
import CloseIcon from "@mui/icons-material/Close";

export default function Main() {
  return (
    <Box className="sdf" sx={{ display: "flex", width: "100%", mt: 8 }}>
      <Typography
        sx={{
          position: "absolute",
          left: "100px",
          top: "85px",
          fontWeight: "600",
          fontSize: "50px",
        }}
      >
        Shoping Car{" "}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
        <Box
          sx={{
            p: 2,
            mt: 4,
            mx: 25,
            display: "flex",
            borderBottom: "1px solid gray",
            position: "relative",
          }}
        >
          <IconButton size="large" sx={{ position: "absolute", right: "10px" }}>
            <CloseIcon />
          </IconButton>
          <CardMedia
            component="img"
            height="100%"
            image={image}
            alt="Drum image"
            sx={{ objectFit: "contain", width: "150px", height: "150px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              p: 2,
              pl: 3,
            }}
          >
            <Typography
              variant="h1"
              component="h2"
              sx={{ fontSize: "20px", fontWeight: 700 }}
            >
              $ 22.95
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>Product Name</Typography>
            <Typography sx={{ fontSize: "14px", mb: 1 }}>
              Brand - Category
            </Typography>
            <IncrementBtn />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "20%",
          mt: 0,
          bgcolor: "rgba(204,193,185,0.5)",
          p: 2,
          borderRadius: "15px",
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
            $ 150.00
          </Typography>
        </Box>
        {/* Sub-total section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography>Subtotal</Typography>
          <Typography>$ 150.00</Typography>
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

        <Button
          sx={{
            mt: "50px",
            color: "white",
            bgcolor: "rgba(0,0,0,0.6)",
            borderRadius: "10px",
            letterSpacing: "2px",

            "&:hover": {
              background: "black",
            },
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}

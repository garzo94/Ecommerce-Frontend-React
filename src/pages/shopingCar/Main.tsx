import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Button, IconButton } from "@mui/material";
import IncrementBtn from "../../components/incrementBtn";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCarItems } from "../features/carSlice";
import { getProduct, getProducts } from "../features/productSlice";

export default function Main() {
  const { items } = useAppSelector((state) => state.car);
  const { products } = useAppSelector((state) => state.products);

  const { qty } = useAppSelector((state) => state.quantity);
  const [totalShoping, setTotalShoping] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCarItems());
  }, [qty]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const itemsValues = items.map((it) => it.id_prod);

  const productsCar = products.filter((obj) => {
    return itemsValues.includes(obj._id);
  });

  function totalProdInCar(id: number): number {
    items.map((it) => {
      if (id === it.id_prod) {
        return it.total;
      }
    });
    return 5;
  }

  function totalMoney() {
    let total = 0;
    items.map((it) => {
      productsCar.map((prod) => {
        if (it.id_prod === prod._id) {
          total += prod.price * it.total;
        }
      });
    });
    setTotalShoping(total);
  }
  useEffect(() => {
    totalMoney();
  }, [items]);

  console.log(productsCar, "prod");

  const itemsCar = productsCar.map((prod) => {
    return (
      <Box
        key={prod._id}
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
          image={`http://127.0.0.1:8000${prod.image}`}
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
            $ {prod.price}
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>Product Name</Typography>
          <Typography sx={{ fontSize: "14px", mb: 1 }}>
            {prod.brand} - {prod.category}
          </Typography>
          <IncrementBtn disable={false} idprod={totalProdInCar(prod._id)} />
        </Box>
      </Box>
    );
  });

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
        {itemsCar}
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
            $ {totalShoping}.00
          </Typography>
        </Box>
        {/* Sub-total section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography>Subtotal</Typography>
          <Typography>$ {`${totalShoping}`}.00</Typography>
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
            bgcolor: "black",
            borderRadius: "10px",
            letterSpacing: "2px",

            "&:hover": {
              background: "rgba(0,0,0,0.7)",
            },
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}

{
  /* <Box
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
        </Box> */
}

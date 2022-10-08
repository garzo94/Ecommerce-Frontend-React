import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Button, IconButton } from "@mui/material";
import IncrementBtn from "../../components/incrementBtn";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCarItems, deleteCarItems } from "../features/carSlice";
import { getProduct, getProducts } from "../features/productSlice";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

export default function Main() {
  const { items } = useAppSelector((state) => state.car);
  const { products } = useAppSelector((state) => state.products);

  const { qty } = useAppSelector((state) => state.quantity);
  const [totalShoping, setTotalShoping] = useState(0);
  const dispatch = useAppDispatch();
  const empty = (
    <Box>
      <LocalGroceryStoreIcon
        sx={{ color: "rgba(0,0,0,0.5)", fontSize: 100, mt: 10 }}
      />
      <Typography sx={{ fontWeight: "600" }}>Your car is empty</Typography>
    </Box>
  );

  useEffect(() => {
    dispatch(getCarItems(localStorage.getItem("authToken")));
  }, [qty]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  function handleDeleteItem(id: number) {
    const token = localStorage.getItem("authToken");
    dispatch(deleteCarItems({ id: id, token: token }));
    dispatch(getCarItems(token));
  }

  const itemsValues = items.map((it) => it.id_prod);

  const productsCar = products.filter((obj) => {
    return itemsValues.includes(obj._id);
  });

  function totalProdInCar(id: number) {
    let totalProd;
    items.map((it) => {
      if (id === it.id_prod) {
        totalProd = it.total;
        return it.total;
      }
    });
    return totalProd;
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

  const itemsCar = productsCar.map((prod) => {
    return (
      <Box
        key={prod._id}
        sx={{
          p: 2,
          mt: 4,
          mx: { lg: 25, md: 25, sm: 0, xs: 0 },
          display: "flex",
          borderBottom: "1px solid gray",
          position: "relative",
          width: { lg: "60%", md: "60%", sm: "90%", xs: "90%" },
        }}
      >
        <IconButton
          onClick={() => handleDeleteItem(prod._id)}
          size="large"
          sx={{
            position: "absolute",
            right: { lg: "10px", md: "10px", sm: "20px", xs: "20px" },
          }}
        >
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
          <IncrementBtn
            disable={false}
            idprod={prod._id}
            currentTotal={totalProdInCar(prod._id)}
          />
        </Box>
      </Box>
    );
  });

  return (
    <Box
      className="sdf"
      sx={{
        display: "flex",
        flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
        alignItems: "center",
        width: "100%",
        mt: 8,
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          left: { lg: "100px", md: "80px", sm: "50px", xs: "25px" },
          top: "85px",
          fontWeight: "600",
          fontSize: { lg: "50px", md: "50px", sm: "30px", xs: "25px" },
        }}
      >
        Shoping Car{" "}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { lg: "60%", md: "60%", sm: "100%", xs: "100%" },
        }}
      >
        {items.length === 0 ? empty : itemsCar}
      </Box>
      {/* $$$$$$ CHeck out section $$$$$$$$ */}
      <Box
        sx={{
          width: { lg: "20%", md: "20%", xm: "100%", xs: "90%" },
          mt: 1,
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

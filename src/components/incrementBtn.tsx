import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { quantity } from "../pages/features/quantitySlice";
import { updateCarItems } from "../pages/features/carSlice";

interface Props {
  disable: boolean;
  idprod?: number;
  currentTotal?: number;
}

export default function IncrementBtn({ disable, idprod, currentTotal }: Props) {
  const { qty } = useAppSelector((state) => state.quantity);

  const [counter, setCounter] = useState(currentTotal ? currentTotal : 1);
  const total = currentTotal ? currentTotal : counter;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(quantity(counter));
    if (idprod) {
      dispatch(
        updateCarItems({
          data: { id: idprod, total: counter },
          token: localStorage.getItem("authToken")!,
        })
      );
    }
  }, [counter]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "start",
        alignItems: "center",
        pt: 1,
      }}
    >
      <Button
        size="small"
        disabled={disable}
        sx={{
          border: "1px solid gray",
          color: "black",
          minWidth: "20PX",
          height: "20px",
        }}
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </Button>

      {
        <Typography
          sx={{
            color: "black",
            mx: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentTotal ? currentTotal : counter}
        </Typography>
      }

      {
        <Button
          disabled={counter <= 0 || disable}
          sx={{
            border: "1px solid gray",
            borderRadius: "5px",
            color: "black",
            minWidth: "20PX",
            height: "20px",
          }}
          size="small"
          onClick={() => {
            setCounter(counter - 1);
          }}
        >
          -
        </Button>
      }

      <Typography sx={{ pr: 1 }}>Qty:</Typography>
    </Box>
  );
}

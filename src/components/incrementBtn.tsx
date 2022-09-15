import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useAppDispatch } from "../hooks/hooks";
import { quantity } from "../pages/features/quantitySlice";

export default function IncrementBtn() {
  const [counter, setCounter] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(quantity(counter));
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
          {counter}
        </Typography>
      }

      {
        <Button
          disabled={counter <= 0}
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

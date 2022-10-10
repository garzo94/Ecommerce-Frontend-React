import React from "react";
import { Box } from "@mui/material";
import FormOrder from "../../components/FormOrder";
export default function PlaceOrder() {
  return (
    <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
      <FormOrder />
    </Box>
  );
}

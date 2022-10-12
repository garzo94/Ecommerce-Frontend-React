import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { orderItems } from "../pages/features/orderSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
} from "@mui/material";
export default function ItemsCar() {
  type objType = {
    name: string;
    image: string;
    total: number;
    price: number;
    id_prod: number;
  };

  const { products } = useAppSelector((state) => state.products);
  const { items } = useAppSelector((state) => state.car);
  const [totalPrice, setTotalPrice] = useState(0);
  const itemsValues = items.map((it) => it.id_prod);
  const dispatch = useAppDispatch();
  const productsCar = products.filter((obj) => {
    return itemsValues.includes(obj._id);
  });

  let data: objType[] = [];

  // Data for order items
  productsCar.forEach((obj, index) => {
    const myitem = items[index];
    data.push({
      name: obj.name,
      image: obj.image,
      total: myitem.total!,
      price: obj.price,
      id_prod: obj._id,
    });
  });
  useEffect(() => {
    dispatch(orderItems(data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidht: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <CardMedia
                  component="img"
                  height="100%"
                  image={`http://127.0.0.1:8000${row.image}`}
                  alt="Drum image"
                  sx={{ objectFit: "contain", width: "75px", height: "75px" }}
                />
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">${row.price * row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

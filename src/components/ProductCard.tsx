import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  Rating,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type propType = {
  name: string;
  img: string;
  desc: string;
  rating: number;
  price: number;
  reviews: number;
  id: string;
};

export default function ProducCard({
  name,
  img,
  desc,
  rating,
  price,
  reviews,
  id,
}: propType) {
  console.log(img);
  return (
    <Link to={`product/${id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          minWidth: 275,
          borderRadius: "20px",
          position: "aboslute",

          transition: "0.5s",
          "&:hover": {
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;",
            transform: "translateY(-5%)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="green iguana"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 20, fontWeight: "600" }}
            color="text.primary"
            gutterBottom
          >
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {desc.substring(0, 35) + "..."}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              readOnly
            />
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              {`${reviews} reviews`}
            </Typography>
          </Stack>
          <Typography
            sx={{ fontSize: 18, mt: 1.5, fontWeight: "600" }}
            color="text.primary"
            gutterBottom
          >
            {`$ ${price}`}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            startIcon={<ShoppingCartIcon />}
            sx={{
              color: "white",

              bgcolor: "black",
              borderRadius: "15px",
              width: "100%",
              letterSpacing: "1px",
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
            Buy Now
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}

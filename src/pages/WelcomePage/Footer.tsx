import { Box, Typography, Stack, IconButton, Link } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Footer() {
  return (
    <Box sx={{ bottom: 0, bgcolor: "black" }}>
      <Box sx={{ p: 5, pb: 0 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.5)",
            fontFamily: " sans-serif",
            letterSpacing: "1px",
            fontStyle: "italic",
          }}
        >
          Alexander Garzo
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "sans-serif",
            letterSpacing: "1px",
            fontStyle: "italic",
          }}
        >
          FullStack Developer
        </Typography>
      </Box>

      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
          pt: 2,
          gap: 1,
        }}
      >
        <a
          href="https://twitter.com/alex_garzo"
          target="_blank"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <TwitterIcon />
        </a>
        <a
          href="https://github.com/garzo94"
          target="_blank"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/alexander-garzo/"
          target="_blank"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <LinkedInIcon />
        </a>
      </Stack>
      <Box
        sx={{
          bgcolor: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.1)",
          p: 2,
        }}
      >
        CopyRight <span>&#169;</span>{" "}
        <a
          href="https://www.linkedin.com/in/alexander-garzo/"
          style={{ color: "rgba(255,255,255,0.1)" }}
        >
          Alexander Garzo
        </a>{" "}
      </Box>
    </Box>
  );
}

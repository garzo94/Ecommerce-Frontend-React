import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Popover,
} from "@mui/material";
import { getCarItems } from "../features/carSlice";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import FormLogin from "../../components/FormLogin";
import { unwrapResult } from "@reduxjs/toolkit";
import { logout } from "../features/authUserSlice";
import { useSnackbar } from "notistack";
import SignupForm from "../../components/SingupForm";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Header = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, loggedIn } = useAppSelector((state) => state.car);
  const { isAuthenticated, error } = useAppSelector((state) => state.login);
  const [formType, setFormType] = useState("");
  const { qty } = useAppSelector((state) => state.quantity);
  const [total, setTotal] = React.useState<number>(0);
  const LoginLoggout = loggedIn ? "Logout" : "Login";

  const pages = ["Car", "SignUp", `${LoginLoggout}`];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // ############  Poper Login ##############
  const [anchorElLogin, setAnchorElLogin] = useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorElLogin(null);
  };
  const openLogin = Boolean(anchorElLogin);
  const id = openLogin ? "Login" : undefined;
  // ########## close poper login #########

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated]);

  function handleNavigate(
    event: React.MouseEvent<HTMLButtonElement>,
    page: string
  ) {
    if (page === "Login") {
      setFormType(page);
      setAnchorElLogin(event.currentTarget);
    }
    if (page === "Car") {
      setFormType(page);

      loggedIn
        ? navigate("/car/")
        : enqueueSnackbar("Login to see your shopping car!");
    }

    if (page === "SignUp") {
      setFormType(page);
      setAnchorElLogin(event.currentTarget);
    }

    if (page === "Logout") {
      dispatch(logout());
    }
  }
  console.log(isAuthenticated, "authhh");
  function totalItmes() {
    let total = 0;
    Object.entries(items).forEach(([key, value]) => {
      total += value.total;
    });

    setTotal(total);
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  React.useEffect(() => {
    totalItmes();
  }, [items]);
  React.useEffect(() => {
    dispatch(getCarItems(localStorage.getItem("authToken"))).then(unwrapResult);
  }, [isAuthenticated]);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#000",
        boxShadow: "rgba(255, 255, 255, 0.1) 0px 4px 12px;",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Russo One', sans-serif",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DrumShop
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", gap: 15 },
              justifyContent: "flex-end",
              mr: 5,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e) => handleNavigate(e, page)}
                aria-describedby={id}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 2px 5px rgba(255,255,255,0.1)",
                  borderTop: "1px solid rgba(255,255,255,0.2) ",
                  borderBottom: "1px solid rgba(255,255,255,0.2) ",

                  borderRadius: "15px",
                  width: "85px",
                  letterSpacing: "1px",
                  transition: "0.5s",
                  "&:hover": {
                    letterSpacing: "1.5px",
                    background: "rgba(204,193,185,0.2)",
                  },
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 15,
                    width: "40%",

                    height: "100%",
                    background:
                      "linear-gradient(to left, rgba(255,255,255,0.1), transparent) ",
                    transform: "skewX(45deg) translateX(0) ",
                    transition: "0.5s",
                  },
                  "&:hover::before": {
                    transform: "skewX(45deg) translateX(30%)",
                  },
                }}
              >
                {page === "Car" ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <ShoppingCart />
                    Car
                    {total! >= 1 && total ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-17px",
                          right: "-16px",
                          height: "22px",
                          width: "22px",
                          backgroundColor: "rgba(255, 0, 0, 0.3)",
                          borderRadius: "50%",
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid rgba(255, 0, 0, 0.2)",
                          color: "rgba(255,255,255,0.8)",
                          fontWeight: 600,
                        }}
                      >
                        <span>{total}</span>
                      </div>
                    ) : null}
                  </Box>
                ) : (
                  page
                )}
              </Button>
            ))}
            <Popover
              id={id}
              open={openLogin}
              anchorEl={anchorElLogin}
              onClose={handleClose}
              PaperProps={{
                style: {
                  height: "300px",
                  width: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {formType === "Login" ? <FormLogin /> : <SignupForm />}
            </Popover>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { lg: "none", md: "none", sm: "block", xs: "block" },
              ml: 5,
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import IndexWelcomePage from "./pages/WelcomePage/IndexWelcomePage";
import "./App.css";
import IndexSingleProduc from "./pages/SingleProductPage/IndexSingleProduc";
import { SnackbarProvider } from "notistack";

import ShopingPage from "./pages/shopingCar/ShopingPage";
import MainOrder from "./pages/PlaceOrder/MainOrder";
function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<IndexWelcomePage />} />
            <Route path="/product/:id" element={<IndexSingleProduc />} />
            <Route path="/car/" element={<ShopingPage />} />
            <Route path="/order" element={<MainOrder />} />
          </Routes>
        </Box>
      </Router>
    </SnackbarProvider>
  );
}

export default App;

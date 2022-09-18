import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import IndexWelcomePage from "./pages/WelcomePage/IndexWelcomePage";
import "./App.css";
import IndexSingleProduc from "./pages/SingleProductPage/IndexSingleProduc";

import ShopingPage from "./pages/shopingCar/ShopingPage";
function App() {
  return (
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
          <Route path="/cart/:id" element={<ShopingPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerLogin from "../pages/FoodpartnerLogin";
import FoodPartnerRegister from "../pages/FoodpartnerRegister";
import NotFound from "../pages/NotFound";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

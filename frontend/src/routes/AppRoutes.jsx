import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import RestaurantRedirect from "./RestaurantRedirect";
import Home from "../pages/Home";
import PublicMenu from "../pages/PublicMenu";
import OwnerRegister from "../pages/Owner";
import OwnerLogin from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CreateRestaurant from "../pages/CreateRestaurant";
import CreateMenu from "../pages/CreateMenu";
import ShowMenus from "../pages/ShowMenus";
import ManageMenuItems from "../pages/ManageMenuItems";
import AddMenuItem from "../pages/AddMenuItem";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/menu/:restaurantId" element={<PublicMenu />} />
        <Route path="/register" element={<OwnerRegister />} />
        <Route path="/login" element={<OwnerLogin />} />
        <Route
          path="/restaurant/:restaurantId"
          element={<RestaurantRedirect />}
        />
        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-restaurant"
          element={
            <ProtectedRoute>
              <CreateRestaurant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage/restaurant/:restaurantId/menu/create"
          element={
            <ProtectedRoute>
              <CreateMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage/restaurant/:restaurantId/menus"
          element={
            <ProtectedRoute>
              <ShowMenus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu/:menuId/items"
          element={
            <ProtectedRoute>
              <ManageMenuItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu/:menuId/items/add"
          element={
            <ProtectedRoute>
              <AddMenuItem />
            </ProtectedRoute>
          }
        />

        {/* 🔁 IMPORTANT REDIRECT (THIS FIXES YOUR ERROR) */}
        <Route
          path="/restaurant/:restaurantId"
          element={
            <Navigate to="/manage/restaurant/:restaurantId/menus" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

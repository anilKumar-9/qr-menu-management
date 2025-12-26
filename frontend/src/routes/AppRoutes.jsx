import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import RestaurantRedirect from "./RestaurantRedirect";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/menu/:restaurantId" element={<PublicMenu />} />
        <Route path="/register" element={<OwnerRegister />} />
        <Route path="/login" element={<OwnerLogin />} />

        {/* REDIRECT */}
        <Route
          path="/restaurant/:restaurantId"
          element={<RestaurantRedirect />}
        />

        {/* PROTECTED */}
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
          path="/manage/restaurant/:restaurantId/menus"
          element={
            <ProtectedRoute>
              <ShowMenus />
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
      </Routes>
    </BrowserRouter>
  );
}

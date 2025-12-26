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


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:restaurantId" element={<PublicMenu />} />
        <Route path="/register" element={<OwnerRegister />} />
        <Route path="/login" element={<OwnerLogin />} />

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

        <Route path="/menu/:menuId/items" element={<ManageMenuItems />} />

        <Route path="/menu/:menuId/items/add" element={<AddMenuItem />} />

        <Route
          path="/restaurant/:restaurantId"
          element={<Navigate to="menus" replace />}
        />

        <Route
          path="/restaurant/:restaurantId/menus"
          element={<ManageMenus />}
        />
      </Routes>
    </BrowserRouter>
  );
}

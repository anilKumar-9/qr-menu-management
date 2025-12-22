import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicMenu from "../pages/PublicMenu";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/menu/:restaurantId" element={<PublicMenu />} />

      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PublicMenu from "../pages/PublicMenu";
import OwnerRegister from "../pages/Owner";
import OwnerLogin from "../pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:restaurantId" element={<PublicMenu />} />
        <Route path="/register" element={<OwnerRegister/>} />
         <Route path="/login" element={<OwnerLogin/>} /> 
      </Routes>
    </BrowserRouter>
  
  );
}

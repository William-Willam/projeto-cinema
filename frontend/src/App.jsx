//importação das biblioteca do react
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importaçao das paginas
import Home from "./pages/Home";

export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
  </Routes>
  </BrowserRouter>
);
}

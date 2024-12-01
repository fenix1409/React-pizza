import { Route, Routes } from "react-router-dom"
import { Basket, Home } from "../pages"

const CustomRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/basket" element={<Basket/>}/>
    </Routes>
  )
}

export default CustomRoutes
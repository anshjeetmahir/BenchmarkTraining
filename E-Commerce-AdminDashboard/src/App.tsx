import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Auth/Login";
import ProductPage from "./pages/Product/ProductPage";
import Users from "./pages/User/UserPage";
import UserDetails from "./pages/User/UserDetail";
import CartPage from "./pages/Cart/CartPage";
import CartDetail from "./pages/Cart/CartDetail";
import ProductDetail from "./pages/Product/ProductDetail";
import BlogPage from "./pages/Blog/BlogPage";
import RecipesPage from "./pages/Ouotes Recipie/RecipesPage";
import BlogDetailPage from "./pages/Blog/BlogDetail";
import Logout from "./pages/Auth/Logout";
import Orders from "./pages/Orders/OrderPage";
import OrderDetail from "./pages/Orders/OrderDetail";
import NotFound from "./pages/Auth/NotFound"
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";


function App() {


  return (
    <Router>
      <ThemeToggle>
        <Sidebar />
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="admin/products" element={<ProductPage />} />
            <Route path="admin/products/:id" element={<ProductDetail />} />
            <Route path="admin/cart" element={<CartPage />} />
            <Route path="/admin/cart/:id" element={<CartDetail />} />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="admin/orders/:id" element={<OrderDetail />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/:id" element={<UserDetails />} />
            <Route path="/admin/blog-comment" element={<BlogPage />} />
            <Route path="/admin/blog-comment/:id" element={<BlogDetailPage />} />
            <Route path="/admin/quotes-recipes" element={<RecipesPage />} />
            <Route path="/admin/logout" element={<Logout />} />


          </Route>

          <Route path="*" element={< NotFound />} />
        </Routes>
      </ThemeToggle>
    </Router>
  )
}

export default App

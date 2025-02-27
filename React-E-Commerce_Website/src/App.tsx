
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./Pages/Home";
import { SidebarTrigger } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import ModifyProducts from "./Pages/ModifyProduct";
import ChangeProduct from "./components/ChangeProduct";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex-1 p-4">
              <div className="flex justify-between items-center">
                <SidebarTrigger >
                  <span>
                    <Button variant="outline">Toggle Sidebar</Button>
                  </span>
                </SidebarTrigger>

              </div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/category/:category" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/products/modify" element={<ModifyProducts />} />
                <Route path="/products/modify/add" element={<ChangeProduct />} />
                <Route path="/products/modify/edit/:id" element={<ChangeProduct />} />
                <Route path="/products/modify/delete/:id" element={<ChangeProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" />
                <Route path="/user" />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import CategoryPage from "@/react-app/pages/CategoryPage";
import AdminLogin from "@/react-app/pages/AdminLogin";
import AdminDashboard from "@/react-app/pages/AdminDashboard";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { CartProvider } from "@/react-app/context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Admin routes - no header/footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Public routes - with header/footer */}
            <Route path="/*" element={
              <>
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categoria/:slug" element={<CategoryPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

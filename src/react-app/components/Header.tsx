import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Menu, X, Heart, Lock } from "lucide-react";
import { useCart } from "@/react-app/context/CartContext";
import CartSidebar from "./CartSidebar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="bg-white shadow-lg border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
                           {" "}
              <img // Caminho da imagem atualizado para a nova pasta
                src="/images/logo.png"
                alt="Silmara Semi Joias e Perfumaria"
                className="h-12 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-rose-900 opacity-0">
                  Silmara
                </h1>
                <p className="text-xs text-rose-600">Semi Jóias e Perfumaria</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
              >
                Início
              </Link>
              <Link
                to="/categoria/semi-joias"
                className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
              >
                Semi-jóias
              </Link>
              <Link
                to="/categoria/perfumaria"
                className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
              >
                Perfumaria
              </Link>
              <Link
                to="/categoria/maquiagem"
                className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
              >
                Maquiagem
              </Link>
              <Link
                to="/categoria/moda-intima"
                className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
              >
                Moda Íntima
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-rose-800 hover:text-rose-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-rose-800 hover:text-rose-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              {/* Botão de Login Admin */}             {" "}
              <Link
                to="/admin/login"
                className="p-2 text-rose-800 hover:text-rose-600 transition-colors"
              >
                                <Lock className="w-6 h-6" />             {" "}
              </Link>
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-rose-800 hover:text-rose-600 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-rose-100">
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link
                  to="/categoria/semi-joias"
                  className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Semi-jóias
                </Link>
                <Link
                  to="/categoria/perfumaria"
                  className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Perfumaria
                </Link>
                <Link
                  to="/categoria/maquiagem"
                  className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Maquiagem
                </Link>
                <Link
                  to="/categoria/moda-intima"
                  className="text-rose-800 hover:text-rose-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Moda Íntima
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

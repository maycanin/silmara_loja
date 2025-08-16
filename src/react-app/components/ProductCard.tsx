import { ShoppingCart, Heart, ExternalLink } from 'lucide-react';
import { Product } from '@/shared/types';
import { useCart } from '@/react-app/context/CartContext';
import { generateWhatsAppLink, trackProductClick } from '@/react-app/hooks/useAPI';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleBuyNow = async () => {
    await trackProductClick(product.id);
    const whatsappUrl = generateWhatsAppLink(product);
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-rose-100">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50">
        <img 
          src={product.image_url || '/placeholder-product.jpg'} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
            <Heart className="w-5 h-5 text-rose-500" />
          </button>
        </div>
        {product.brand && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              {product.brand}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-rose-900 mb-2 line-clamp-2 group-hover:text-rose-700 transition-colors">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-rose-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-rose-600">
            R$ {product.price.toFixed(2)}
          </div>
          {product.category_name && (
            <span className="text-xs text-rose-400 bg-rose-50 px-2 py-1 rounded-full">
              {product.category_name}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Comprar
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/react-app/context/CartContext';
import { generateWhatsAppCartLink } from '@/react-app/hooks/useAPI';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();

  const handleWhatsAppCheckout = () => {
    const whatsappUrl = generateWhatsAppCartLink(items);
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-rose-100">
            <h2 className="text-xl font-bold text-rose-900 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Carrinho
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-rose-50 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-rose-800" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-rose-300 mx-auto mb-4" />
                <p className="text-rose-600 text-lg">Seu carrinho está vazio</p>
                <p className="text-rose-400 text-sm mt-2">Adicione produtos para continuar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-rose-50 rounded-lg">
                    <img 
                      src={item.product.image_url || '/placeholder-product.jpg'} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-rose-900 text-sm">{item.product.name}</h3>
                      <p className="text-rose-600 font-bold">R$ {item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-rose-200 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4 text-rose-700" />
                          </button>
                          <span className="mx-2 font-medium text-rose-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-rose-200 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4 text-rose-700" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-rose-500 hover:text-rose-700 text-sm transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-rose-100 p-6 bg-rose-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-rose-900">Total:</span>
                <span className="text-xl font-bold text-rose-600">R$ {total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Finalizar via WhatsApp
              </button>
              
              <button 
                onClick={clearCart}
                className="w-full mt-2 text-rose-600 hover:text-rose-700 font-medium py-2 transition-colors"
              >
                Limpar Carrinho
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

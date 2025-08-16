import { Filter, X } from 'lucide-react';

interface ProductFiltersProps {
  brands: string[];
  selectedBrand: string;
  minPrice: string;
  maxPrice: string;
  onBrandChange: (brand: string) => void;
  onMinPriceChange: (price: string) => void;
  onMaxPriceChange: (price: string) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

export default function ProductFilters({
  brands,
  selectedBrand,
  minPrice,
  maxPrice,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
  isLoading = false
}: ProductFiltersProps) {
  const hasActiveFilters = selectedBrand || minPrice || maxPrice;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-rose-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-rose-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={onClearFilters}
            className="text-rose-500 hover:text-rose-700 text-sm font-medium transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Limpar
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-rose-800 mb-3">
            Faixa de Preço
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-rose-600 mb-1">Mínimo</label>
              <input 
                type="number"
                placeholder="R$ 0"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-rose-600 mb-1">Máximo</label>
              <input 
                type="number"
                placeholder="R$ 1000"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-rose-800 mb-3">
            Marca
          </label>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-rose-100 rounded-lg"></div>
            </div>
          ) : (
            <select 
              value={selectedBrand}
              onChange={(e) => onBrandChange(e.target.value)}
              className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="">Todas as marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          )}
        </div>

        {/* Quick Price Filters */}
        <div>
          <label className="block text-sm font-medium text-rose-800 mb-3">
            Filtros Rápidos
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => {
                onMinPriceChange('');
                onMaxPriceChange('50');
              }}
              className="px-3 py-2 text-sm bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors"
            >
              Até R$ 50
            </button>
            <button 
              onClick={() => {
                onMinPriceChange('50');
                onMaxPriceChange('100');
              }}
              className="px-3 py-2 text-sm bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors"
            >
              R$ 50 - R$ 100
            </button>
            <button 
              onClick={() => {
                onMinPriceChange('100');
                onMaxPriceChange('200');
              }}
              className="px-3 py-2 text-sm bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors"
            >
              R$ 100 - R$ 200
            </button>
            <button 
              onClick={() => {
                onMinPriceChange('200');
                onMaxPriceChange('');
              }}
              className="px-3 py-2 text-sm bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors"
            >
              Acima R$ 200
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

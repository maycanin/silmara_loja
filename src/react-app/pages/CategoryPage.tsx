import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Grid, List } from 'lucide-react';
import { useProducts, useBrands } from '@/react-app/hooks/useAPI';
import ProductCard from '@/react-app/components/ProductCard';
import ProductFilters from '@/react-app/components/ProductFilters';

export default function CategoryPage() {
  const { slug } = useParams();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filters = {
    category: slug,
    brand: selectedBrand || undefined,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  };

  const { products, loading } = useProducts(filters);
  const { brands, loading: brandsLoading } = useBrands();

  const handleClearFilters = () => {
    setSelectedBrand('');
    setMinPrice('');
    setMaxPrice('');
  };

  const categoryNames: Record<string, string> = {
    'semi-joias': 'Semi-jóias',
    'perfumaria': 'Perfumaria',
    'maquiagem': 'Maquiagem',
    'moda-intima': 'Moda Íntima',
    'brincos': 'Brincos',
    'colares': 'Colares',
    'pulseiras': 'Pulseiras',
    'aneis': 'Anéis',
    'perfume-masculino': 'Perfumes Masculinos',
    'perfume-feminino': 'Perfumes Femininos',
    'importados': 'Perfumes Importados',
    'nacionais': 'Perfumes Nacionais',
    'rosto': 'Maquiagem para Rosto',
    'olhos': 'Maquiagem para Olhos',
    'labios': 'Maquiagem para Lábios',
    'intima-masculino': 'Moda Íntima Masculina',
    'intima-feminino': 'Moda Íntima Feminina',
  };

  const categoryName = categoryNames[slug || ''] || 'Produtos';

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link 
            to="/" 
            className="text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Início
          </Link>
          <span className="text-rose-400">/</span>
          <span className="text-rose-900 font-medium">{categoryName}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-rose-900 mb-2">
              {categoryName}
            </h1>
            <p className="text-rose-600">
              {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-sm text-rose-600">Visualização:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white text-rose-500 hover:bg-rose-50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              brands={brands}
              selectedBrand={selectedBrand}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onBrandChange={setSelectedBrand}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onClearFilters={handleClearFilters}
              isLoading={brandsLoading}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-64 bg-rose-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-rose-200 rounded mb-2"></div>
                      <div className="h-4 bg-rose-200 rounded w-2/3 mb-4"></div>
                      <div className="h-8 bg-rose-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
                  <Grid className="w-12 h-12 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-rose-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-rose-600 mb-4">
                  Tente ajustar os filtros ou procurar em outra categoria
                </p>
                <button 
                  onClick={handleClearFilters}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

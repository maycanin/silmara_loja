import { Link } from "react-router";
import { Sparkles, Heart, Star, ArrowRight } from "lucide-react";
import { useCategories, useProducts } from "@/react-app/hooks/useAPI";
import ProductCard from "@/react-app/components/ProductCard";

export default function Home() {
  const { categories } = useCategories();
  const { products, loading } = useProducts();

  const featuredProducts = products.slice(0, 8);
  const mainCategories = categories.filter((cat) => !cat.parent_id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
                         {" "}
            <img // Caminho da imagem atualizado para a nova pasta
              src="/images/logo.png"
              alt="Silmara Semi Joias e Perfumaria"
              className="h-56 w-auto"
            />
          </div>

          <h1 className="text-4xl md:text-4xl font-bold text-rose-900 mb-6">
            Beleza e elegância{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
              para o seu dia a dia.
            </span>
          </h1>

          <p className="text-xl text-rose-700 mb-8 max-w-3xl mx-auto">
            Descubra nossa coleção exclusiva de semi-jóias, perfumaria,
            maquiagem e moda íntima. Peças únicas para realçar sua elegância
            natural.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/categoria/semi-joias"
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Explorar Semi-jóias
            </Link>
            <Link
              to="/categoria/perfumaria"
              className="border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-200"
            >
              Ver Perfumes
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-4">
              Nossas Categorias
            </h2>
            <p className="text-rose-600 text-lg max-w-2xl mx-auto">
              Encontre exatamente o que você procura em nossa seleção cuidadosa
              de produtos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainCategories.map((category) => (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                      {category.slug === "semi-joias" && (
                        <Sparkles className="w-8 h-8 text-white" />
                      )}
                      {category.slug === "perfumaria" && (
                        <Heart className="w-8 h-8 text-white" />
                      )}
                      {category.slug === "maquiagem" && (
                        <Star className="w-8 h-8 text-white" />
                      )}
                      {category.slug === "moda-intima" && (
                        <Heart className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h3 className="font-bold text-xl text-rose-900 group-hover:text-rose-700 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 text-rose-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-rose-600 text-lg max-w-2xl mx-auto">
              Seleção especial dos nossos produtos mais queridos
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="h-64 bg-rose-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-rose-200 rounded mb-2"></div>
                    <div className="h-4 bg-rose-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-rose-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/categoria/semi-joias"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Ver Todos os Produtos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-rose-900 mb-2">
                Qualidade Garantida
              </h3>
              <p className="text-rose-600">
                Produtos selecionados com o máximo cuidado e qualidade
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-rose-900 mb-2">
                Atendimento Personalizado
              </h3>
              <p className="text-rose-600">
                Suporte dedicado via WhatsApp para suas dúvidas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-rose-900 mb-2">
                Novidades Sempre
              </h3>
              <p className="text-rose-600">
                Lançamentos frequentes e tendências atualizadas
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

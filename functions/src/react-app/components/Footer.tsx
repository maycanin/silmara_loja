import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://mocha-cdn.com/0198b40c-a417-7c21-a141-1a463d0644ea/WhatsApp_Image_2025-08-14_at_19.37.5.png" 
                alt="Silmara Semi Jóias e Perfumaria"
                className="h-12 w-auto filter brightness-0 invert"
              />
              <div>
                <h3 className="text-xl font-bold">Silmara</h3>
                <p className="text-rose-200 text-sm">Semi Jóias e Perfumaria</p>
              </div>
            </div>
            <p className="text-rose-200 mb-4 max-w-md">
              Encontre as melhores semi-jóias, perfumaria, maquiagem e moda íntima. 
              Qualidade e elegância para realçar sua beleza natural.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-rose-700 hover:bg-rose-600 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-rose-700 hover:bg-rose-600 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/5544984547340" className="p-2 bg-green-600 hover:bg-green-500 rounded-full transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <a href="/categoria/semi-joias" className="text-rose-200 hover:text-white transition-colors">
                  Semi-jóias
                </a>
              </li>
              <li>
                <a href="/categoria/perfumaria" className="text-rose-200 hover:text-white transition-colors">
                  Perfumaria
                </a>
              </li>
              <li>
                <a href="/categoria/maquiagem" className="text-rose-200 hover:text-white transition-colors">
                  Maquiagem
                </a>
              </li>
              <li>
                <a href="/categoria/moda-intima" className="text-rose-200 hover:text-white transition-colors">
                  Moda Íntima
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-rose-300" />
                <span className="text-rose-200">(44) 98454-7340</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-rose-300" />
                <span className="text-rose-200">silmaraandrade3108@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-rose-300 mt-1" />
                <span className="text-rose-200">Paraná, Brasil</span>
              </li>
            </ul>

            <div className="mt-6">
              <a 
                href="https://wa.me/5544984547340"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Fale Conosco
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-rose-200 text-sm">
              © 2025 Silmara Semi Jóias e Perfumaria. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-rose-200 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-rose-200 hover:text-white text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

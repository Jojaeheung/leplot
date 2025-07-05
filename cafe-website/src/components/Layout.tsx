import { Outlet, Link, useLocation } from 'react-router-dom';
import { Coffee, Sandwich as SandwichIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-pink-200/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 sm:space-x-4 hover:opacity-80 transition-opacity duration-300">
                <div className="relative">
                  <img 
                    src="/logo.jpeg" 
                    alt="카페 르플로 LePLOT Logo" 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-lg border-2 border-pink-200"
                  />
                </div>
                <div>
                  <h1 className="dessert-logo text-2xl sm:text-3xl mb-1">
                    르플로
                  </h1>
                  <p className="dessert-logo text-lg sm:text-2xl -mt-1 sm:-mt-2">
                    LePLOT
                  </p>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">전북 단체간식, 답례품 전문</p>
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/"
                className={`relative px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                  isActive('/') || isActive('/dessert')
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/30' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Coffee className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span>디저트</span>
                </span>
              </Link>
              
              <Link
                to="/sandwich"
                className={`relative px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg transition-all duration-300 transform hover:scale-105 ${
                  isActive('/sandwich')
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <SandwichIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span>샌드위치</span>
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/80 hover:bg-white transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-6 py-3 rounded-2xl font-bold text-base transition-all duration-300 ${
                  isActive('/') || isActive('/dessert')
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Coffee className="h-5 w-5" />
                  <span>디저트</span>
                </span>
              </Link>
              
              <Link
                to="/sandwich"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-6 py-3 rounded-2xl font-bold text-base transition-all duration-300 ${
                  isActive('/sandwich')
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <SandwichIcon className="h-5 w-5" />
                  <span>샌드위치</span>
                </span>
              </Link>
            </div>
          )}
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 lg:w-80 lg:h-80 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 lg:w-72 lg:h-72 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-20 right-20 text-pink-300/30 text-3xl lg:text-4xl animate-bounce">🍰</div>
        <div className="hidden sm:block absolute bottom-20 left-20 text-orange-300/30 text-3xl lg:text-4xl animate-bounce delay-500">🧁</div>
        <div className="hidden sm:block absolute top-1/2 right-10 text-yellow-300/30 text-2xl lg:text-3xl animate-bounce delay-1000">🍪</div>
      </div>
    </div>
  );
}
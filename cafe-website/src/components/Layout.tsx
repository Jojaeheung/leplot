import { Outlet, Link, useLocation } from 'react-router-dom';
import { Coffee, Sandwich as SandwichIcon } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-pink-200/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-300">
                <div className="relative">
                  <img 
                    src="/logo.jpeg" 
                    alt="카페 르플로 LePLOT Logo" 
                    className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-pink-200"
                  />
                </div>
                <div>
                  <h1 className="dessert-logo text-3xl mb-1">
                    르플로
                  </h1>
                  <p className="dessert-logo text-2xl -mt-2">
                    LePLOT
                  </p>
                  <p className="text-xs text-gray-500 mt-1">전북 단체간식, 답례품 전문</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isActive('/') || isActive('/dessert')
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/30' 
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
                className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isActive('/sandwich')
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <SandwichIcon className="h-5 w-5" />
                  <span>샌드위치</span>
                </span>
              </Link>

            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 text-pink-300/30 text-4xl animate-bounce">🍰</div>
        <div className="absolute bottom-20 left-20 text-orange-300/30 text-4xl animate-bounce delay-500">🧁</div>
        <div className="absolute top-1/2 right-10 text-yellow-300/30 text-3xl animate-bounce delay-1000">🍪</div>
      </div>
    </div>
  );
}
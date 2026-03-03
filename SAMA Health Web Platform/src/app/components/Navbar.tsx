import { Link, useLocation } from 'react-router';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/hopitaux', label: 'Hôpitaux' },
    { path: '/rendez-vous', label: 'Rendez-vous' },
    { path: '/ticket', label: 'Ticket' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#1A5FAB]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&h=120&fit=crop"
              alt="SAMA Health Logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <div className="hidden sm:block">
              <div className="text-xl md:text-2xl font-bold text-[#1A5FAB]">SAMA Health</div>
              <div className="text-xs text-[#64748b] -mt-1">Soins Sans Attente</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base transition-colors hover:text-[#1A5FAB] ${
                  isActive(link.path)
                    ? 'text-[#1A5FAB] font-semibold'
                    : 'text-[#1C2B3A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/auth?mode=login">
              <Button variant="outline" className="border-[#1A5FAB] text-[#1A5FAB] hover:bg-[#1A5FAB]/5">
                Connexion
              </Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button className="bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                Créer un compte
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#1C2B3A]" />
            ) : (
              <Menu className="h-6 w-6 text-[#1C2B3A]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base px-3 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#1A5FAB]/10 text-[#1A5FAB] font-semibold'
                      : 'text-[#1C2B3A] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
                <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#1A5FAB] text-[#1A5FAB]">
                    Connexion
                  </Button>
                </Link>
                <Link to="/auth?mode=register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

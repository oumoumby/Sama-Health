import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1C2B3A] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&h=120&fit=crop"
                alt="SAMA Health Logo"
                className="h-10 w-10"
              />
              <div>
                <div className="text-xl font-bold">SAMA Health</div>
                <div className="text-xs text-gray-400">Soins Sans Attente</div>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Votre plateforme digitale pour moderniser l'accès aux soins de santé au Sénégal.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#1A5FAB] transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#1A5FAB] transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#1A5FAB] transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#1A5FAB] transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/hopitaux" className="hover:text-[#4AAED9] transition-colors">
                  Annuaire des hôpitaux
                </Link>
              </li>
              <li>
                <Link to="/rendez-vous" className="hover:text-[#4AAED9] transition-colors">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link to="/ticket" className="hover:text-[#4AAED9] transition-colors">
                  Acheter un ticket
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#4AAED9] transition-colors">
                  Mon espace patient
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-[#4AAED9] transition-colors">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4AAED9] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4AAED9] transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4AAED9] transition-colors">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Avenue Nelson Mandela, Dakar, Sénégal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+221 33 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contact@samahealth.sn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 SAMA Health. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

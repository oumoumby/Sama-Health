import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') || 'login';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect to dashboard
    navigate('/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1A5FAB] via-[#1A5FAB]/95 to-[#4AAED9] p-12 flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative z-10 text-center max-w-md">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&h=120&fit=crop"
            alt="SAMA Health Logo"
            className="h-20 w-20 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">SAMA Health</h1>
          <p className="text-2xl mb-6 text-white/90">Votre plateforme de Soins Sans Attente</p>
          <p className="text-lg text-white/80">
            Gérez vos rendez-vous médicaux en ligne et évitez les files d'attente.
            Rejoignez +5000 patients qui gèrent leur santé en ligne.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&h=120&fit=crop"
              alt="SAMA Health Logo"
              className="h-16 w-16 mx-auto mb-3"
            />
            <h2 className="text-2xl font-bold text-[#1A5FAB]">SAMA Health</h2>
            <p className="text-sm text-[#64748b]">Soins Sans Attente</p>
          </div>

          {mode === 'login' ? (
            <Card className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1C2B3A] mb-2">Connexion</h2>
                <p className="text-[#64748b]">Accédez à votre espace patient</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <Label htmlFor="login-email">Email ou Téléphone</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="login-email"
                      type="text"
                      placeholder="votre@email.com ou +221 77 123 45 67"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <a href="#" className="text-sm text-[#1A5FAB] hover:underline">
                      Mot de passe oublié?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white py-6">
                  Se connecter
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[#64748b]">
                  Pas encore de compte?{' '}
                  <Link to="/auth?mode=register" className="text-[#1A5FAB] hover:underline font-medium">
                    Créer un compte
                  </Link>
                </p>
              </div>
            </Card>
          ) : (
            <Card className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1C2B3A] mb-2">Créer un compte</h2>
                <p className="text-[#64748b]">Rejoignez SAMA Health gratuitement</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <Label htmlFor="register-name">Nom complet</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Prénom Nom"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-phone">Téléphone</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="+221 77 123 45 67"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-password">Mot de passe</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-confirm">Confirmer le mot de passe</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-confirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white py-6">
                  Créer mon compte
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[#64748b]">
                  Déjà un compte?{' '}
                  <Link to="/auth?mode=login" className="text-[#1A5FAB] hover:underline font-medium">
                    Se connecter
                  </Link>
                </p>
              </div>
            </Card>
          )}

          <p className="text-center text-sm text-[#64748b] mt-6">
            Rejoignez +5000 patients qui gèrent leur santé en ligne
          </p>
        </div>
      </div>
    </div>
  );
}

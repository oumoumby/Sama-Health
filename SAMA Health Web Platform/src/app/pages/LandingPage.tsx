import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Clock, 
  MapPin, 
  Activity, 
  Smartphone, 
  Calendar, 
  Shield,
  Users,
  Building2,
  CheckCircle,
  Star
} from 'lucide-react';
import { testimonials } from '../data/mockData';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1A5FAB] via-[#1A5FAB]/95 to-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Soins Sans Attente,<br />
                Depuis Chez Vous
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl">
                Prenez rendez-vous ou achetez votre ticket en ligne. Plus de files d'attente, plus de temps perdu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/rendez-vous">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-[#1A5FAB] hover:bg-white/90 text-base px-8 py-6">
                    Prendre Rendez-vous
                  </Button>
                </Link>
                <Link to="/ticket">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6"
                  >
                    Acheter un Ticket
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* App Mockup Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-[#4AAED9] rounded-3xl blur-3xl opacity-30"></div>
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=800&fit=crop"
                  alt="App mockup"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Building2 className="h-6 w-6 text-[#1A5FAB]" />
                <div className="text-3xl md:text-4xl font-bold text-[#1A5FAB]">20+</div>
              </div>
              <div className="text-[#64748b]">Hôpitaux partenaires</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-6 w-6 text-[#1A5FAB]" />
                <div className="text-3xl md:text-4xl font-bold text-[#1A5FAB]">5000+</div>
              </div>
              <div className="text-[#64748b]">Patients satisfaits</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-6 w-6 text-[#1A5FAB]" />
                <div className="text-3xl md:text-4xl font-bold text-[#1A5FAB]">0</div>
              </div>
              <div className="text-[#64748b]">Déplacement inutile</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SAMA Health */}
      <section className="py-16 md:py-24 bg-[#F4F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B3A] mb-4">
              Pourquoi SAMA Health?
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
              Une solution complète pour moderniser votre accès aux soins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white border-l-4 border-l-[#1A5FAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1A5FAB]/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[#1A5FAB]" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#1C2B3A]">Gain de temps</h3>
              <p className="text-[#64748b]">
                Évitez les longues files d'attente. Réservez votre créneau et arrivez à l'heure.
              </p>
            </Card>

            <Card className="p-6 bg-white border-l-4 border-l-[#4AAED9] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#4AAED9]/10 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#4AAED9]" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#1C2B3A]">Zéro déplacement</h3>
              <p className="text-[#64748b]">
                Gérez tout depuis votre téléphone. Ne venez qu'au moment de votre rendez-vous.
              </p>
            </Card>

            <Card className="p-6 bg-white border-l-4 border-l-[#1A5FAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1A5FAB]/10 rounded-xl flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-[#1A5FAB]" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#1C2B3A]">Suivi temps réel</h3>
              <p className="text-[#64748b]">
                Suivez l'avancement de votre file et l'estimation de votre temps d'attente.
              </p>
            </Card>

            <Card className="p-6 bg-white border-l-4 border-l-[#4AAED9] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#4AAED9]/10 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-[#4AAED9]" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#1C2B3A]">Interface simple</h3>
              <p className="text-[#64748b]">
                Conçu pour être accessible à tous, même sans compétences techniques.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B3A] mb-4">
              Comment ça marche?
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
              Trois étapes simples pour gérer vos soins en ligne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#1A5FAB] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <div className="w-12 h-12 bg-[#1A5FAB]/10 rounded-xl flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-[#1A5FAB]" />
              </div>
              <h3 className="font-semibold text-xl text-[#1C2B3A]">Créez un compte</h3>
              <p className="text-[#64748b]">
                Inscrivez-vous gratuitement en quelques minutes avec vos informations de base.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#4AAED9] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <div className="w-12 h-12 bg-[#4AAED9]/10 rounded-xl flex items-center justify-center mx-auto">
                <Building2 className="h-6 w-6 text-[#4AAED9]" />
              </div>
              <h3 className="font-semibold text-xl text-[#1C2B3A]">Choisissez hôpital & service</h3>
              <p className="text-[#64748b]">
                Parcourez notre annuaire et sélectionnez l'hôpital et le service qui vous conviennent.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#1A5FAB] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <div className="w-12 h-12 bg-[#1A5FAB]/10 rounded-xl flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-[#1A5FAB]" />
              </div>
              <h3 className="font-semibold text-xl text-[#1C2B3A]">Prenez RDV ou achetez ticket</h3>
              <p className="text-[#64748b]">
                Réservez votre créneau ou achetez un ticket pour une consultation immédiate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#F4F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B3A] mb-4">
              Ce que disent nos patients
            </h2>
            <p className="text-lg text-[#64748b]">
              +5000 patients nous font confiance chaque jour
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[#1C2B3A] mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="font-semibold text-[#1A5FAB]">{testimonial.name}</div>
                  <div className="text-[#64748b]">{testimonial.location}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#1A5FAB] to-[#4AAED9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à moderniser votre accès aux soins?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Rejoignez +5000 patients qui gèrent leur santé en ligne
          </p>
          <Link to="/auth?mode=register">
            <Button size="lg" className="bg-white text-[#1A5FAB] hover:bg-white/90 text-base px-8 py-6">
              Créer mon compte gratuitement
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

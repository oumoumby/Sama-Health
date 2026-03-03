import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink,
  Calendar,
  Ticket,
  UserCircle
} from 'lucide-react';
import { hospitals } from '../data/mockData';

export function HospitalDetail() {
  const { id } = useParams();
  const hospital = hospitals.find(h => h.id === id);
  const [activeTab, setActiveTab] = useState('informations');

  if (!hospital) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1C2B3A] mb-4">Hôpital non trouvé</h2>
          <Link to="/hopitaux">
            <Button className="bg-[#1A5FAB] hover:bg-[#1A5FAB]/90">
              Retour à l'annuaire
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'low':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'high':
        return 'Disponible';
      case 'medium':
        return 'Occupation moyenne';
      case 'low':
        return 'Forte affluence';
      default:
        return 'Non disponible';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A5FAB] to-[#4AAED9] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{hospital.name}</h1>
              <div className="flex items-center space-x-2 text-white/90 mb-2">
                <MapPin className="h-5 w-5" />
                <span>{hospital.address}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white/10 mt-2"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Voir sur la carte
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm">
            <TabsTrigger value="informations" className="data-[state=active]:bg-[#1A5FAB] data-[state=active]:text-white">
              Informations
            </TabsTrigger>
            <TabsTrigger value="medecins" className="data-[state=active]:bg-[#1A5FAB] data-[state=active]:text-white">
              Médecins
            </TabsTrigger>
            <TabsTrigger value="horaires" className="data-[state=active]:bg-[#1A5FAB] data-[state=active]:text-white">
              Horaires
            </TabsTrigger>
            <TabsTrigger value="tarifs" className="data-[state=active]:bg-[#1A5FAB] data-[state=active]:text-white">
              Tarifs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="informations" className="space-y-6">
            <Card className="p-6 bg-white">
              <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">Spécialités disponibles</h2>
              
              <div className="space-y-4">
                {hospital.services.map((service) => (
                  <Card key={service.id} className="p-6 border-l-4 border-l-[#1A5FAB]">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-[#1C2B3A]">{service.name}</h3>
                          <Badge className={`${getAvailabilityColor(service.availability)} border`}>
                            {getAvailabilityText(service.availability)}
                          </Badge>
                        </div>
                        <div className="flex items-center text-[#64748b] mb-3">
                          <UserCircle className="h-4 w-4 mr-2" />
                          <span>Chef de service: {service.doctorInChief}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-[#64748b]">
                          <div>
                            <span className="font-medium text-[#1C2B3A]">{service.waitingCount}</span> patients en attente
                          </div>
                          <div>
                            Temps estimé: <span className="font-medium text-[#1A5FAB]">{service.estimatedTime}</span>
                          </div>
                          <div>
                            Médecin de garde: <span className="font-medium">{service.doctorOnDuty}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link to={`/rendez-vous?hospital=${hospital.id}&service=${service.id}`}>
                          <Button className="w-full sm:w-auto bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                            <Calendar className="h-4 w-4 mr-2" />
                            Prendre Rendez-vous
                          </Button>
                        </Link>
                        <Link to={`/ticket?hospital=${hospital.id}&service=${service.id}`}>
                          <Button 
                            variant="outline" 
                            className="w-full sm:w-auto border-[#1A5FAB] text-[#1A5FAB] hover:bg-[#1A5FAB]/5"
                          >
                            <Ticket className="h-4 w-4 mr-2" />
                            Acheter Ticket
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="medecins">
            <Card className="p-6 bg-white">
              <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">Équipe médicale</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hospital.services.map((service) => (
                  <Card key={service.id} className="p-6 bg-[#F4F7FC]">
                    <h3 className="font-semibold text-lg text-[#1A5FAB] mb-2">{service.name}</h3>
                    <div className="space-y-2 text-[#1C2B3A]">
                      <div>
                        <span className="text-[#64748b]">Chef de service:</span> {service.doctorInChief}
                      </div>
                      <div>
                        <span className="text-[#64748b]">Médecin de garde:</span> {service.doctorOnDuty}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="horaires">
            <Card className="p-6 bg-white">
              <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">Horaires d'ouverture</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-[#1A5FAB]" />
                  <div>
                    <div className="font-semibold text-[#1C2B3A]">{hospital.hours}</div>
                    <div className="text-sm text-[#64748b]">Samedi: 8h–13h • Dimanche: Fermé</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#F4F7FC] rounded-lg">
                  <h3 className="font-semibold text-[#1C2B3A] mb-3">Services d'urgence</h3>
                  <p className="text-[#64748b]">Les urgences sont ouvertes 24h/24 et 7j/7</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tarifs">
            <Card className="p-6 bg-white">
              <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">Informations tarifaires</h2>
              <div className="space-y-4">
                <div className="p-4 bg-[#F4F7FC] rounded-lg">
                  <h3 className="font-semibold text-[#1C2B3A] mb-2">Consultation générale</h3>
                  <div className="text-2xl font-bold text-[#1A5FAB]">5 000 FCFA</div>
                </div>
                
                <div className="p-4 bg-[#F4F7FC] rounded-lg">
                  <h3 className="font-semibold text-[#1C2B3A] mb-2">Consultation spécialisée</h3>
                  <div className="text-2xl font-bold text-[#1A5FAB]">10 000 FCFA</div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Phone className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-[#1C2B3A] mb-1">Pour plus d'informations</h3>
                      <p className="text-sm text-[#64748b]">Contactez l'accueil au +221 33 123 45 67</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

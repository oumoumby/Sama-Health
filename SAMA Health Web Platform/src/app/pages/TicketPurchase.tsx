import { useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Stethoscope,
  Download,
  QrCode,
  ArrowLeft
} from 'lucide-react';
import { hospitals } from '../data/mockData';

export function TicketPurchase() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState<string>(searchParams.get('hospital') || '');
  const [selectedService, setSelectedService] = useState<string>(searchParams.get('service') || '');
  const [ticketNumber, setTicketNumber] = useState('');

  const currentHospital = hospitals.find(h => h.id === selectedHospital);
  const currentService = currentHospital?.services.find(s => s.id === selectedService);

  const handlePurchase = () => {
    // Generate ticket number
    const num = `TKT-2026-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
    setTicketNumber(num);
    setStep(3);
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A5FAB] to-[#4AAED9] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Acheter un Ticket</h1>
          <p className="text-lg text-white/90">
            Obtenez votre ticket et évitez l'attente sur place
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <Card className="p-6 bg-white shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#1A5FAB]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#1A5FAB] text-white' : 'bg-gray-200'}`}>
                  {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
                </div>
                <span className="hidden sm:inline font-medium">Choix</span>
              </div>
              
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#1A5FAB]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#1A5FAB] text-white' : 'bg-gray-200'}`}>
                  {step > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
                </div>
                <span className="hidden sm:inline font-medium">Confirmation</span>
              </div>
              
              <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-[#1A5FAB]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#1A5FAB] text-white' : 'bg-gray-200'}`}>
                  {step > 3 ? <CheckCircle className="h-5 w-5" /> : '3'}
                </div>
                <span className="hidden sm:inline font-medium">Ticket</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Step 1: Choose Hospital & Service */}
        {step === 1 && (
          <Card className="p-6 md:p-8 bg-white">
            <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">
              Choisissez l'hôpital et le service
            </h2>

            <div className="space-y-6">
              {/* Hospital Selection */}
              <div>
                <label className="block font-medium text-[#1C2B3A] mb-3">Hôpital</label>
                <div className="space-y-3">
                  {hospitals.map((hospital) => (
                    <div
                      key={hospital.id}
                      onClick={() => {
                        setSelectedHospital(hospital.id);
                        setSelectedService('');
                      }}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedHospital === hospital.id
                          ? 'border-[#1A5FAB] bg-[#1A5FAB]/5'
                          : 'border-gray-200 hover:border-[#1A5FAB]/50'
                      }`}
                    >
                      <div className="font-semibold text-[#1C2B3A]">{hospital.name}</div>
                      <div className="text-sm text-[#64748b] mt-1">{hospital.address}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              {selectedHospital && currentHospital && (
                <div>
                  <label className="block font-medium text-[#1C2B3A] mb-3">Service médical</label>
                  <div className="space-y-3">
                    {currentHospital.services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedService === service.id
                            ? 'border-[#1A5FAB] bg-[#1A5FAB]/5'
                            : 'border-gray-200 hover:border-[#1A5FAB]/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-[#1C2B3A] mb-2">{service.name}</div>
                            <div className="flex items-center gap-4 text-sm text-[#64748b]">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {service.waitingCount} en attente
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                ~{service.estimatedTime}
                              </div>
                            </div>
                          </div>
                          <Badge 
                            className={
                              service.availability === 'high' 
                                ? 'bg-green-100 text-green-700' 
                                : service.availability === 'medium'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {service.availability === 'high' ? 'Disponible' : service.availability === 'medium' ? 'Moyen' : 'Chargé'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => setStep(2)}
                disabled={!selectedHospital || !selectedService}
                className="w-full bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white py-6"
              >
                Continuer
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Review & Confirm */}
        {step === 2 && currentHospital && currentService && (
          <Card className="p-6 md:p-8 bg-white">
            <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">
              Confirmation de votre ticket
            </h2>

            <div className="space-y-6">
              {/* Summary Card */}
              <Card className="p-6 bg-[#F4F7FC] border-l-4 border-l-[#1A5FAB]">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Hôpital</div>
                    <div className="font-semibold text-[#1C2B3A]">{currentHospital.name}</div>
                    <div className="text-sm text-[#64748b]">{currentHospital.address}</div>
                  </div>

                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Service</div>
                    <div className="font-semibold text-[#1C2B3A]">{currentService.name}</div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-[#64748b] mb-1">File d'attente</div>
                        <div className="flex items-center text-2xl font-bold text-[#1A5FAB]">
                          <Users className="h-6 w-6 mr-2" />
                          {currentService.waitingCount}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-[#64748b] mb-1">Temps estimé</div>
                        <div className="flex items-center text-2xl font-bold text-[#4AAED9]">
                          <Clock className="h-6 w-6 mr-2" />
                          {currentService.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center text-[#64748b]">
                      <Stethoscope className="h-4 w-4 mr-2" />
                      <span>Médecin de garde: {currentService.doctorOnDuty}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold text-[#1C2B3A] mb-4">Mode de paiement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-[#1A5FAB] bg-[#1A5FAB]/5 rounded-lg cursor-pointer">
                    <div className="text-center">
                      <div className="font-semibold text-[#1C2B3A] mb-1">Wave</div>
                      <div className="text-sm text-[#64748b]">Mobile Money</div>
                    </div>
                  </div>
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#1A5FAB]/50">
                    <div className="text-center">
                      <div className="font-semibold text-[#1C2B3A] mb-1">Orange Money</div>
                      <div className="text-sm text-[#64748b]">Mobile Money</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <Button
                  onClick={handlePurchase}
                  className="flex-1 bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white py-6"
                >
                  Confirmer et payer
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Success */}
        {step === 3 && currentHospital && currentService && (
          <Card className="p-6 md:p-8 bg-white text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B3A] mb-4">
              Ticket acheté avec succès!
            </h2>
            <p className="text-[#64748b] mb-8">
              Votre ticket a été généré. Présentez-le à l'accueil de l'hôpital.
            </p>

            <Card className="p-8 bg-[#F4F7FC] mb-8">
              <div className="space-y-6">
                {/* Ticket Number */}
                <div>
                  <div className="text-sm text-[#64748b] mb-2">Numéro de ticket</div>
                  <div className="text-3xl font-bold text-[#1A5FAB] mb-4">{ticketNumber}</div>
                </div>

                {/* QR Code Placeholder */}
                <div className="w-48 h-48 bg-white border-4 border-[#1A5FAB] rounded-lg flex items-center justify-center mx-auto">
                  <QrCode className="h-32 w-32 text-[#1A5FAB]" />
                </div>

                {/* Details */}
                <div className="text-left space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Hôpital:</span>
                    <span className="font-semibold text-[#1C2B3A]">{currentHospital.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Service:</span>
                    <span className="font-semibold text-[#1C2B3A]">{currentService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Position:</span>
                    <span className="font-semibold text-[#1A5FAB]">{currentService.waitingCount + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Temps d'attente:</span>
                    <span className="font-semibold text-[#4AAED9]">{currentService.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                <Download className="h-4 w-4 mr-2" />
                Télécharger mon ticket
              </Button>
              <Link to="/dashboard">
                <Button variant="outline" className="border-[#1A5FAB] text-[#1A5FAB]">
                  Voir mon espace patient
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

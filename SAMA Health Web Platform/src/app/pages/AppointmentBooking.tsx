import { useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  CheckCircle, 
  Calendar as CalendarIcon, 
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { hospitals } from '../data/mockData';

export function AppointmentBooking() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState<string>(searchParams.get('hospital') || '');
  const [selectedService, setSelectedService] = useState<string>(searchParams.get('service') || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    reason: ''
  });

  const currentHospital = hospitals.find(h => h.id === selectedHospital);
  const currentService = currentHospital?.services.find(s => s.id === selectedService);

  // Mock available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  // Mock available time slots
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', 
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = () => {
    setStep(3);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A5FAB] to-[#4AAED9] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Prendre Rendez-vous</h1>
          <p className="text-lg text-white/90">
            Réservez votre créneau et venez à l'heure exacte
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Select Hospital & Service */}
        {step === 1 && (
          <Card className="p-6 md:p-8 bg-white">
            <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">
              Choisissez l'hôpital et le service
            </h2>

            <div className="space-y-6">
              <div>
                <Label className="mb-3">Hôpital</Label>
                <select
                  value={selectedHospital}
                  onChange={(e) => {
                    setSelectedHospital(e.target.value);
                    setSelectedService('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5FAB] focus:border-[#1A5FAB]"
                >
                  <option value="">Sélectionnez un hôpital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedHospital && currentHospital && (
                <div>
                  <Label className="mb-3">Service médical</Label>
                  <select
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      setSelectedDoctor('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5FAB] focus:border-[#1A5FAB]"
                  >
                    <option value="">Sélectionnez un service</option>
                    {currentHospital.services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - Dr. {service.doctorInChief}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedService && currentService && (
                <div>
                  <Label className="mb-3">Médecin</Label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5FAB] focus:border-[#1A5FAB]"
                  >
                    <option value="">Sélectionnez un médecin</option>
                    <option value={currentService.doctorInChief}>{currentService.doctorInChief}</option>
                    <option value={currentService.doctorOnDuty}>{currentService.doctorOnDuty}</option>
                  </select>
                </div>
              )}

              <Button
                onClick={() => setStep(2)}
                disabled={!selectedHospital || !selectedService || !selectedDoctor}
                className="w-full bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white py-6"
              >
                Continuer
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Select Date, Time & Fill Form */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Calendar & Time Selection */}
            <Card className="p-6 md:p-8 bg-white">
              <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">
                Choisissez la date et l'heure
              </h2>

              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Label className="mb-3">Date du rendez-vous</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {availableDates.map((date) => (
                      <div
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                          selectedDate === date
                            ? 'border-[#1A5FAB] bg-[#1A5FAB]/5'
                            : 'border-gray-200 hover:border-[#1A5FAB]/50'
                        }`}
                      >
                        <div className="text-sm text-[#64748b] mb-1">
                          {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                        </div>
                        <div className="font-semibold text-[#1C2B3A]">
                          {new Date(date).getDate()}
                        </div>
                        <div className="text-xs text-[#64748b]">
                          {new Date(date).toLocaleDateString('fr-FR', { month: 'short' })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <Label className="mb-3">Heure du rendez-vous</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                      {timeSlots.map((time) => (
                        <div
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                            selectedTime === time
                              ? 'border-[#1A5FAB] bg-[#1A5FAB] text-white'
                              : 'border-gray-200 hover:border-[#1A5FAB]/50 text-[#1C2B3A]'
                          }`}
                        >
                          <Clock className="h-4 w-4 mx-auto mb-1" />
                          <div className="text-sm font-medium">{time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Patient Information Form */}
            {selectedDate && selectedTime && (
              <Card className="p-6 md:p-8 bg-white">
                <h2 className="text-2xl font-semibold text-[#1C2B3A] mb-6">
                  Vos informations
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        placeholder="Votre nom"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+221 77 123 45 67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (optionnel)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reason">Motif de consultation</Label>
                    <Textarea
                      id="reason"
                      placeholder="Décrivez brièvement le motif de votre consultation..."
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-gray-300"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.lastName || !formData.firstName || !formData.phone || !formData.reason}
                    className="flex-1 bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white py-6"
                  >
                    Confirmer le rendez-vous
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && currentHospital && currentService && (
          <Card className="p-6 md:p-8 bg-white text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B3A] mb-4">
              Rendez-vous confirmé!
            </h2>
            <p className="text-[#64748b] mb-8">
              Un SMS de confirmation vous a été envoyé au {formData.phone}
            </p>

            <Card className="p-6 bg-[#F4F7FC] mb-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CalendarIcon className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Date et heure</div>
                    <div className="font-semibold text-[#1C2B3A]">
                      {formatDate(selectedDate)} à {selectedTime}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Hôpital</div>
                    <div className="font-semibold text-[#1C2B3A]">{currentHospital.name}</div>
                    <div className="text-sm text-[#64748b]">{currentHospital.address}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Service et médecin</div>
                    <div className="font-semibold text-[#1C2B3A]">{currentService.name}</div>
                    <div className="text-sm text-[#64748b]">Dr. {selectedDoctor}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Patient</div>
                    <div className="font-semibold text-[#1C2B3A]">
                      {formData.firstName} {formData.lastName}
                    </div>
                    <div className="text-sm text-[#64748b]">{formData.phone}</div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/dashboard">
                <Button className="w-full sm:w-auto bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                  Voir mes rendez-vous
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto border-[#1A5FAB] text-[#1A5FAB]">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

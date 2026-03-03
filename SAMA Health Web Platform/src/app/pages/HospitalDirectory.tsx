import { useState } from 'react';
import { Link } from 'react-router';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Search, MapPin, Clock } from 'lucide-react';
import { hospitals } from '../data/mockData';

export function HospitalDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const districts = ['all', ...Array.from(new Set(hospitals.map(h => h.district)))];
  const allSpecialties = Array.from(new Set(hospitals.flatMap(h => h.specialties)));
  const specialties = ['all', ...allSpecialties];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || hospital.district === selectedDistrict;
    const matchesSpecialty = selectedSpecialty === 'all' || hospital.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesDistrict && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A5FAB] to-[#4AAED9] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Annuaire des Hôpitaux</h1>
          <p className="text-lg text-white/90">
            Trouvez l'hôpital et le service qui correspondent à vos besoins
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <Card className="p-6 bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un hôpital..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>

            {/* District Filter */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5FAB] focus:border-[#1A5FAB]"
              >
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district === 'all' ? 'Tous les quartiers' : district}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialty Filter */}
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5FAB] focus:border-[#1A5FAB]"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'Toutes les spécialités' : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6">
          <p className="text-[#64748b]">
            {filteredHospitals.length} {filteredHospitals.length === 1 ? 'hôpital trouvé' : 'hôpitaux trouvés'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card 
              key={hospital.id} 
              className="bg-white hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-l-[#1A5FAB]"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#1C2B3A] mb-3">
                  {hospital.name}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-2 text-[#64748b]">
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>{hospital.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-[#64748b]">
                    <Clock className="h-5 w-5 flex-shrink-0" />
                    <span>{hospital.hours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-[#1A5FAB]/10 text-[#1A5FAB] hover:bg-[#1A5FAB]/20"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link to={`/hopitaux/${hospital.id}`}>
                  <Button className="w-full bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                    Voir les services
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#1C2B3A] mb-2">
              Aucun hôpital trouvé
            </h3>
            <p className="text-[#64748b] mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('all');
                setSelectedSpecialty('all');
              }}
              variant="outline"
              className="border-[#1A5FAB] text-[#1A5FAB]"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

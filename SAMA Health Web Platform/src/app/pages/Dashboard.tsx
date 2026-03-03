import { useState } from 'react';
import { Link } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { 
  Home,
  Calendar,
  Ticket,
  User,
  Clock,
  MapPin,
  ChevronRight,
  Edit,
  Mail,
  Phone,
  MapPinned,
  CalendarDays
} from 'lucide-react';
import { appointments, tickets, mockUser } from '../data/mockData';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(mockUser);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700">Confirmé</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700">En attente</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700">Passé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const menuItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'rendez-vous', label: 'Mes Rendez-vous', icon: Calendar },
    { id: 'tickets', label: 'Mes Tickets', icon: Ticket },
    { id: 'profil', label: 'Mon Profil', icon: User }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-[#1A5FAB] rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="font-semibold text-lg text-[#1C2B3A]">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-sm text-[#64748b]">{profileData.email}</p>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-[#1A5FAB] text-white'
                          : 'text-[#1C2B3A] hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Accueil */}
            {activeTab === 'accueil' && (
              <>
                {/* Welcome Bar */}
                <Card className="p-6 bg-gradient-to-r from-[#1A5FAB] to-[#4AAED9] text-white">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Bonjour, {profileData.firstName} 👋
                  </h1>
                  <p className="text-white/90">
                    Bienvenue sur votre espace patient SAMA Health
                  </p>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 bg-white border-l-4 border-l-[#1A5FAB]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#64748b] mb-1">Prochain RDV</div>
                        <div className="text-2xl font-bold text-[#1A5FAB]">5 Mars</div>
                      </div>
                      <Calendar className="h-10 w-10 text-[#1A5FAB]/20" />
                    </div>
                  </Card>

                  <Card className="p-6 bg-white border-l-4 border-l-[#4AAED9]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#64748b] mb-1">Tickets actifs</div>
                        <div className="text-2xl font-bold text-[#4AAED9]">{tickets.length}</div>
                      </div>
                      <Ticket className="h-10 w-10 text-[#4AAED9]/20" />
                    </div>
                  </Card>

                  <Card className="p-6 bg-white border-l-4 border-l-[#1A5FAB]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#64748b] mb-1">RDV ce mois</div>
                        <div className="text-2xl font-bold text-[#1A5FAB]">{appointments.length}</div>
                      </div>
                      <CalendarDays className="h-10 w-10 text-[#1A5FAB]/20" />
                    </div>
                  </Card>
                </div>

                {/* Upcoming Appointment */}
                <Card className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[#1C2B3A]">Prochain rendez-vous</h2>
                    <Link to="/rendez-vous">
                      <Button variant="outline" size="sm" className="border-[#1A5FAB] text-[#1A5FAB]">
                        Nouveau RDV
                      </Button>
                    </Link>
                  </div>

                  {appointments.filter(apt => apt.status === 'confirmed')[0] && (
                    <Card className="p-6 bg-[#F4F7FC] border-l-4 border-l-[#1A5FAB]">
                      {(() => {
                        const apt = appointments.filter(apt => apt.status === 'confirmed')[0];
                        return (
                          <>
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-lg text-[#1C2B3A] mb-1">
                                  {apt.service}
                                </h3>
                                <p className="text-[#64748b]">{apt.hospitalName}</p>
                              </div>
                              {getStatusBadge(apt.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2 text-[#64748b]">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(apt.date).toLocaleDateString('fr-FR', { 
                                  weekday: 'long', 
                                  day: 'numeric', 
                                  month: 'long' 
                                })}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-[#64748b]">
                                <Clock className="h-4 w-4" />
                                <span>{apt.time}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-[#64748b]">
                                <User className="h-4 w-4" />
                                <span>{apt.doctor}</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </Card>
                  )}
                </Card>

                {/* Active Tickets */}
                {tickets.length > 0 && (
                  <Card className="p-6 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-[#1C2B3A]">Tickets actifs</h2>
                      <Link to="/ticket">
                        <Button variant="outline" size="sm" className="border-[#1A5FAB] text-[#1A5FAB]">
                          Nouveau ticket
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {tickets.map((ticket) => (
                        <Card key={ticket.id} className="p-6 bg-[#F4F7FC] border-l-4 border-l-[#4AAED9]">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="text-sm text-[#64748b] mb-1">Numéro de ticket</div>
                              <div className="text-xl font-bold text-[#1A5FAB]">{ticket.id}</div>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Actif</Badge>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="text-sm text-[#64748b]">{ticket.hospitalName}</div>
                              <div className="font-semibold text-[#1C2B3A]">{ticket.service}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-[#64748b] mb-1">Position</div>
                                <div className="text-2xl font-bold text-[#1A5FAB]">{ticket.queuePosition}</div>
                              </div>
                              <div>
                                <div className="text-sm text-[#64748b] mb-1">Temps estimé</div>
                                <div className="text-2xl font-bold text-[#4AAED9]">{ticket.estimatedTime}</div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}

            {/* Mes Rendez-vous */}
            {activeTab === 'rendez-vous' && (
              <Card className="p-6 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-[#1C2B3A]">Mes Rendez-vous</h2>
                  <Link to="/rendez-vous">
                    <Button className="bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                      Nouveau rendez-vous
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <Card key={apt.id} className="p-6 bg-[#F4F7FC] hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-[#1C2B3A] mb-1">
                            {apt.service}
                          </h3>
                          <p className="text-[#64748b] mb-3">{apt.hospitalName}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center space-x-2 text-[#64748b]">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(apt.date).toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#64748b]">
                              <Clock className="h-4 w-4" />
                              <span>{apt.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#64748b]">
                              <User className="h-4 w-4" />
                              <span>{apt.doctor}</span>
                            </div>
                          </div>

                          <div className="mt-3 p-3 bg-white rounded-lg">
                            <div className="text-sm text-[#64748b] mb-1">Motif</div>
                            <div className="text-[#1C2B3A]">{apt.reason}</div>
                          </div>
                        </div>

                        <div className="ml-4">
                          {getStatusBadge(apt.status)}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Mes Tickets */}
            {activeTab === 'tickets' && (
              <Card className="p-6 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-[#1C2B3A]">Mes Tickets</h2>
                  <Link to="/ticket">
                    <Button className="bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                      Acheter un ticket
                    </Button>
                  </Link>
                </div>

                {tickets.length > 0 ? (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <Card key={ticket.id} className="p-6 bg-[#F4F7FC]">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-sm text-[#64748b] mb-1">Numéro de ticket</div>
                            <div className="text-2xl font-bold text-[#1A5FAB] mb-2">{ticket.id}</div>
                            <Badge className="bg-green-100 text-green-700">{ticket.status === 'active' ? 'Actif' : 'Complété'}</Badge>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="font-semibold text-[#1C2B3A]">{ticket.hospitalName}</div>
                            <div className="text-[#64748b]">{ticket.service}</div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                            <div>
                              <div className="text-sm text-[#64748b] mb-1">Position</div>
                              <div className="text-xl font-bold text-[#1A5FAB]">{ticket.queuePosition}</div>
                            </div>
                            <div>
                              <div className="text-sm text-[#64748b] mb-1">Temps estimé</div>
                              <div className="text-xl font-bold text-[#4AAED9]">{ticket.estimatedTime}</div>
                            </div>
                            <div>
                              <div className="text-sm text-[#64748b] mb-1">Médecin</div>
                              <div className="text-sm text-[#1C2B3A]">{ticket.doctorOnDuty}</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#1C2B3A] mb-2">Aucun ticket actif</h3>
                    <p className="text-[#64748b] mb-6">Achetez un ticket pour éviter l'attente</p>
                    <Link to="/ticket">
                      <Button className="bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white">
                        Acheter un ticket
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            )}

            {/* Mon Profil */}
            {activeTab === 'profil' && (
              <Card className="p-6 md:p-8 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-[#1C2B3A]">Mon Profil</h2>
                  <Button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    variant="outline"
                    className="border-[#1A5FAB] text-[#1A5FAB]"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditingProfile ? 'Annuler' : 'Modifier'}
                  </Button>
                </div>

                {isEditingProfile ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date de naissance</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-[#1A5FAB] hover:bg-[#1A5FAB]/90 text-white"
                    >
                      Enregistrer les modifications
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                        <div>
                          <div className="text-sm text-[#64748b] mb-1">Nom complet</div>
                          <div className="text-[#1C2B3A] font-medium">
                            {profileData.firstName} {profileData.lastName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                        <div>
                          <div className="text-sm text-[#64748b] mb-1">Email</div>
                          <div className="text-[#1C2B3A] font-medium">{profileData.email}</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                        <div>
                          <div className="text-sm text-[#64748b] mb-1">Téléphone</div>
                          <div className="text-[#1C2B3A] font-medium">{profileData.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CalendarDays className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                        <div>
                          <div className="text-sm text-[#64748b] mb-1">Date de naissance</div>
                          <div className="text-[#1C2B3A] font-medium">
                            {new Date(profileData.dateOfBirth).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 md:col-span-2">
                        <MapPinned className="h-5 w-5 text-[#1A5FAB] mt-0.5" />
                        <div>
                          <div className="text-sm text-[#64748b] mb-1">Adresse</div>
                          <div className="text-[#1C2B3A] font-medium">{profileData.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

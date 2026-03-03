export const hospitals = [
  {
    id: '1',
    name: 'Hôpital Principal de Dakar',
    address: 'Avenue Nelson Mandela, Dakar',
    district: 'Plateau',
    specialties: ['Cardiologie', 'Pédiatrie', 'Urgences'],
    hours: 'Lun–Ven 8h–18h',
    services: [
      {
        id: 's1',
        name: 'Cardiologie',
        doctorInChief: 'Dr. Aminata Diallo',
        availability: 'high',
        waitingCount: 5,
        estimatedTime: '15 min',
        doctorOnDuty: 'Dr. Cheikh Sy'
      },
      {
        id: 's2',
        name: 'Pédiatrie',
        doctorInChief: 'Dr. Fatou Sarr',
        availability: 'medium',
        waitingCount: 12,
        estimatedTime: '35 min',
        doctorOnDuty: 'Dr. Moussa Ba'
      },
      {
        id: 's3',
        name: 'Urgences',
        doctorInChief: 'Dr. Omar Ndiaye',
        availability: 'low',
        waitingCount: 28,
        estimatedTime: '90 min',
        doctorOnDuty: 'Dr. Aissatou Kane'
      }
    ]
  },
  {
    id: '2',
    name: 'Hôpital Abass Ndao',
    address: 'Route de Rufisque, Dakar',
    district: 'Grand Yoff',
    specialties: ['Chirurgie', 'Maternité', 'Radiologie'],
    hours: 'Lun–Ven 7h–19h',
    services: [
      {
        id: 's4',
        name: 'Chirurgie',
        doctorInChief: 'Dr. Ibrahima Fall',
        availability: 'high',
        waitingCount: 3,
        estimatedTime: '10 min',
        doctorOnDuty: 'Dr. Mariama Diouf'
      },
      {
        id: 's5',
        name: 'Maternité',
        doctorInChief: 'Dr. Khady Sow',
        availability: 'medium',
        waitingCount: 8,
        estimatedTime: '25 min',
        doctorOnDuty: 'Dr. Bineta Thiam'
      }
    ]
  },
  {
    id: '3',
    name: 'Hôpital Aristide Le Dantec',
    address: 'Avenue Pasteur, Dakar',
    district: 'Le Dantec',
    specialties: ['Dermatologie', 'Ophtalmologie', 'ORL'],
    hours: 'Lun–Ven 8h–17h',
    services: [
      {
        id: 's6',
        name: 'Dermatologie',
        doctorInChief: 'Dr. Awa Cissé',
        availability: 'high',
        waitingCount: 6,
        estimatedTime: '18 min',
        doctorOnDuty: 'Dr. Ousmane Diop'
      },
      {
        id: 's7',
        name: 'Ophtalmologie',
        doctorInChief: 'Dr. Mamadou Seck',
        availability: 'medium',
        waitingCount: 15,
        estimatedTime: '45 min',
        doctorOnDuty: 'Dr. Ndèye Gueye'
      }
    ]
  },
  {
    id: '4',
    name: 'Centre Hospitalier Universitaire de Fann',
    address: 'Route de Fann, Dakar',
    district: 'Fann',
    specialties: ['Neurologie', 'Psychiatrie', 'Médecine Interne'],
    hours: 'Lun–Ven 8h–18h',
    services: [
      {
        id: 's8',
        name: 'Neurologie',
        doctorInChief: 'Dr. Malick Dione',
        availability: 'low',
        waitingCount: 20,
        estimatedTime: '60 min',
        doctorOnDuty: 'Dr. Yacine Mbaye'
      },
      {
        id: 's9',
        name: 'Psychiatrie',
        doctorInChief: 'Dr. Rokhaya Touré',
        availability: 'high',
        waitingCount: 4,
        estimatedTime: '12 min',
        doctorOnDuty: 'Dr. Alioune Wade'
      }
    ]
  },
  {
    id: '5',
    name: 'Hôpital Général de Grand Yoff',
    address: 'Grand Yoff, Dakar',
    district: 'Grand Yoff',
    specialties: ['Médecine Générale', 'Pneumologie', 'Gastro-entérologie'],
    hours: 'Lun–Ven 7h30–18h30',
    services: [
      {
        id: 's10',
        name: 'Médecine Générale',
        doctorInChief: 'Dr. Souleymane Niang',
        availability: 'medium',
        waitingCount: 10,
        estimatedTime: '30 min',
        doctorOnDuty: 'Dr. Fatoumata Diagne'
      }
    ]
  },
  {
    id: '6',
    name: 'Hôpital de Pikine',
    address: 'Pikine, Dakar',
    district: 'Pikine',
    specialties: ['Urgences', 'Traumatologie', 'Pédiatrie'],
    hours: 'Lun–Ven 8h–19h',
    services: [
      {
        id: 's11',
        name: 'Urgences',
        doctorInChief: 'Dr. Seynabou Diallo',
        availability: 'low',
        waitingCount: 32,
        estimatedTime: '105 min',
        doctorOnDuty: 'Dr. Modou Faye'
      },
      {
        id: 's12',
        name: 'Traumatologie',
        doctorInChief: 'Dr. Pape Samba',
        availability: 'medium',
        waitingCount: 11,
        estimatedTime: '33 min',
        doctorOnDuty: 'Dr. Amy Sarr'
      }
    ]
  }
];

export const appointments = [
  {
    id: 'apt1',
    hospitalName: 'Hôpital Principal de Dakar',
    service: 'Cardiologie',
    doctor: 'Dr. Aminata Diallo',
    date: '2026-03-05',
    time: '10:00',
    status: 'confirmed',
    reason: 'Consultation de suivi'
  },
  {
    id: 'apt2',
    hospitalName: 'Hôpital Abass Ndao',
    service: 'Maternité',
    doctor: 'Dr. Khady Sow',
    date: '2026-03-08',
    time: '14:30',
    status: 'pending',
    reason: 'Échographie prénatale'
  },
  {
    id: 'apt3',
    hospitalName: 'Centre Hospitalier Universitaire de Fann',
    service: 'Neurologie',
    doctor: 'Dr. Malick Dione',
    date: '2026-02-28',
    time: '09:00',
    status: 'completed',
    reason: 'Consultation spécialisée'
  }
];

export const tickets = [
  {
    id: 'TKT-2026-001234',
    hospitalName: 'Hôpital Principal de Dakar',
    service: 'Urgences',
    queuePosition: 12,
    estimatedTime: '40 min',
    status: 'active',
    createdAt: '2026-03-02T09:15:00',
    doctorOnDuty: 'Dr. Omar Ndiaye'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Fatou Diop',
    location: 'Dakar',
    text: 'Plus besoin de faire la queue pendant des heures. J\'ai pris mon rendez-vous en ligne et je suis arrivée à l\'heure exacte. Un vrai gain de temps!',
    rating: 5
  },
  {
    id: 2,
    name: 'Moussa Seck',
    location: 'Pikine',
    text: 'SAMA Health a transformé mon expérience à l\'hôpital. Je peux suivre mon ticket en temps réel et savoir exactement quand me présenter.',
    rating: 5
  },
  {
    id: 3,
    name: 'Aïssatou Kane',
    location: 'Rufisque',
    text: 'Interface très simple à utiliser, même pour quelqu\'un comme moi qui n\'est pas à l\'aise avec la technologie. Bravo SAMA Health!',
    rating: 5
  }
];

export const mockUser = {
  firstName: 'Amadou',
  lastName: 'Diallo',
  email: 'amadou.diallo@example.com',
  phone: '+221 77 123 45 67',
  dateOfBirth: '1985-06-15',
  address: 'Sicap Liberté, Dakar'
};

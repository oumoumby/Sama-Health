// data-manager.js
class DataManager {
    constructor() {
        this.data = {
            hospitals: [],
            appointments: [],
            tickets: [],
            users: [],
            currentUser: null,
            services: []
        };
        
        this.init();
    }
    
    init() {
        // Charger les données depuis localStorage
        this.loadFromLocalStorage();
        
        // Initialiser les données par défaut si vide
        this.initializeDefaultData();
        
        // Sauvegarder automatiquement quand les données changent
        this.setupAutoSave();

        // Synchroniser entre onglets et écouter les changements
        this.setupCrossTabSync();
    }
    
    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('samaHealthData');
            if (savedData) {
                this.data = JSON.parse(savedData);
                console.log('Données chargées depuis localStorage');
            }
        } catch (error) {
            console.error('Erreur de chargement des données:', error);
        }
    }
    
    saveToLocalStorage() {
        try {
            localStorage.setItem('samaHealthData', JSON.stringify(this.data));
            console.log('Données sauvegardées dans localStorage');
        } catch (error) {
            console.error('Erreur de sauvegarde des données:', error);
        }
    }
    
    initializeDefaultData() {
        // Données par défaut pour les hôpitaux
        if (!this.data.hospitals || this.data.hospitals.length === 0) {
            this.data.hospitals = [
                {
                    id: 1,
                    name: "Hôpital Principal de Dakar",
                    address: "Avenue Nelson Mandela, Dakar",
                    phone: "+221 33 839 50 50",
                    services: ["Consultation Générale", "Urgences", "Radiologie", "Laboratoire"],
                    description: "Hôpital public principal de Dakar offrant une large gamme de services médicaux.",
                    location: { lat: 14.6928, lng: -17.4467 },
                    waitingTime: 45,
                    rating: 4.2,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "08:00 - 18:00",
                        tuesday: "08:00 - 18:00",
                        wednesday: "08:00 - 18:00",
                        thursday: "08:00 - 18:00",
                        friday: "08:00 - 17:00",
                        saturday: "09:00 - 13:00",
                        sunday: "Urgences uniquement"
                    },
                    price: 5000,
                    capacity: "500 lits"
                },
                {
                    id: 2,
                    name: "Centre Hospitalier Universitaire de Fann",
                    address: "Route des Almadies, Dakar",
                    phone: "+221 33 869 10 10",
                    services: ["Consultation Générale", "Pédiatrie", "Cardiologie", "Ophtalmologie", "Dermatologie"],
                    description: "Centre hospitalier universitaire spécialisé dans la recherche et les soins avancés.",
                    location: { lat: 14.7167, lng: -17.4667 },
                    waitingTime: 60,
                    rating: 4.5,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "07:30 - 19:00",
                        tuesday: "07:30 - 19:00",
                        wednesday: "07:30 - 19:00",
                        thursday: "07:30 - 19:00",
                        friday: "07:30 - 18:00",
                        saturday: "08:00 - 14:00",
                        sunday: "Urgences uniquement"
                    },
                    price: 7000,
                    capacity: "350 lits"
                },
                {
                    id: 3,
                    name: "Hôpital Aristide Le Dantec",
                    address: "Avenue Pasteur, Dakar",
                    phone: "+221 33 822 24 24",
                    services: ["Urgences", "Chirurgie", "Maternité", "Pharmacie", "Consultation Générale"],
                    description: "Hôpital de référence pour la chirurgie et la maternité à Dakar.",
                    location: { lat: 14.6769, lng: -17.4456 },
                    waitingTime: 30,
                    rating: 4.0,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "24/7",
                        tuesday: "24/7",
                        wednesday: "24/7",
                        thursday: "24/7",
                        friday: "24/7",
                        saturday: "24/7",
                        sunday: "24/7"
                    },
                    price: 10000,
                    capacity: "400 lits"
                },
                {
                    id: 4,
                    name: "Centre de Santé de Grand Yoff",
                    address: "Grand Yoff, Dakar",
                    phone: "+221 33 820 20 20",
                    services: ["Consultation Générale", "Vaccination", "Planning Familial", "Pédiatrie"],
                    description: "Centre de santé de proximité offrant des services médicaux de base.",
                    location: { lat: 14.7417, lng: -17.4589 },
                    waitingTime: 20,
                    rating: 3.8,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "08:00 - 17:00",
                        tuesday: "08:00 - 17:00",
                        wednesday: "08:00 - 17:00",
                        thursday: "08:00 - 17:00",
                        friday: "08:00 - 16:00",
                        saturday: "08:00 - 12:00",
                        sunday: "Fermé"
                    },
                    price: 3000,
                    capacity: "150 lits"
                },
                {
                    id: 5,
                    name: "Hôpital Régional de Thiès",
                    address: "Thiès, Sénégal",
                    phone: "+221 33 951 10 10",
                    services: ["Consultation Générale", "Urgences", "Radiologie", "Laboratoire", "Chirurgie"],
                    description: "Hôpital régional desservant la région de Thiès et ses environs.",
                    location: { lat: 14.7900, lng: -16.9256 },
                    waitingTime: 40,
                    rating: 4.1,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "07:00 - 20:00",
                        tuesday: "07:00 - 20:00",
                        wednesday: "07:00 - 20:00",
                        thursday: "07:00 - 20:00",
                        friday: "07:00 - 19:00",
                        saturday: "08:00 - 16:00",
                        sunday: "Urgences uniquement"
                    },
                    price: 4500,
                    capacity: "300 lits"
                },
                {
                    id: 6,
                    name: "Centre Médical de Mermoz",
                    address: "Mermoz, Dakar",
                    phone: "+221 33 860 60 60",
                    services: ["Consultation Générale", "Dentiste", "Pédiatrie", "Gynécologie", "Analyse Médicale"],
                    description: "Centre médical moderne offrant des consultations spécialisées.",
                    location: { lat: 14.7083, lng: -17.4697 },
                    waitingTime: 25,
                    rating: 4.3,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "08:00 - 19:00",
                        tuesday: "08:00 - 19:00",
                        wednesday: "08:00 - 19:00",
                        thursday: "08:00 - 19:00",
                        friday: "08:00 - 18:00",
                        saturday: "09:00 - 15:00",
                        sunday: "Fermé"
                    },
                    price: 8000,
                    capacity: "200 lits"
                },
                {
                    id: 7,
                    name: "Hôpital de l'Enfant de Diamniadio",
                    address: "Diamniadio, Dakar",
                    phone: "+221 33 855 55 55",
                    services: ["Pédiatrie", "Urgences Pédiatriques", "Vaccination", "Nutrition"],
                    description: "Hôpital spécialisé dans les soins aux enfants et adolescents.",
                    location: { lat: 14.7139, lng: -17.4450 },
                    waitingTime: 35,
                    rating: 4.6,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "24/7",
                        tuesday: "24/7",
                        wednesday: "24/7",
                        thursday: "24/7",
                        friday: "24/7",
                        saturday: "24/7",
                        sunday: "24/7"
                    },
                    price: 9000,
                    capacity: "250 lits"
                },
                {
                    id: 8,
                    name: "Centre Hospitalier de Pikine",
                    address: "Pikine, Dakar",
                    phone: "+221 33 834 40 40",
                    services: ["Consultation Générale", "Urgences", "Maternité", "Radiologie"],
                    description: "Centre hospitalier de district desservant la banlieue de Dakar.",
                    location: { lat: 14.7500, lng: -17.4000 },
                    waitingTime: 50,
                    rating: 3.9,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "08:00 - 20:00",
                        tuesday: "08:00 - 20:00",
                        wednesday: "08:00 - 20:00",
                        thursday: "08:00 - 20:00",
                        friday: "08:00 - 19:00",
                        saturday: "09:00 - 17:00",
                        sunday: "Urgences uniquement"
                    },
                    price: 3500,
                    capacity: "180 lits"
                },
                {
                    id: 9,
                    name: "Polyclinique de la Madeleine",
                    address: "Plateau, Dakar",
                    phone: "+221 33 821 21 21",
                    services: ["Consultation Générale", "Dentiste", "Ophtalmologie", "Dermatologie", "Kinésithérapie"],
                    description: "Polyclinique privée conventionnée offrant des consultations spécialisées.",
                    location: { lat: 14.6681, lng: -17.4303 },
                    waitingTime: 15,
                    rating: 4.4,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "07:30 - 19:30",
                        tuesday: "07:30 - 19:30",
                        wednesday: "07:30 - 19:30",
                        thursday: "07:30 - 19:30",
                        friday: "07:30 - 18:30",
                        saturday: "08:00 - 16:00",
                        sunday: "Fermé"
                    },
                    price: 12000,
                    capacity: "100 lits"
                },
                {
                    id: 10,
                    name: "Hôpital Militaire de Ouakam",
                    address: "Ouakam, Dakar",
                    phone: "+221 33 860 30 30",
                    services: ["Consultation Générale", "Urgences", "Chirurgie", "Imagerie Médicale"],
                    description: "Hôpital militaire ouvert au public pour certaines consultations.",
                    location: { lat: 14.7222, lng: -17.4806 },
                    waitingTime: 40,
                    rating: 4.2,
                    image: "images/logo.png",
                    openingHours: {
                        monday: "08:00 - 18:00",
                        tuesday: "08:00 - 18:00",
                        wednesday: "08:00 - 18:00",
                        thursday: "08:00 - 18:00",
                        friday: "08:00 - 17:00",
                        saturday: "09:00 - 13:00",
                        sunday: "Urgences uniquement"
                    },
                    price: 6000,
                    capacity: "320 lits"
                }
            ];
        }
        
        // Données par défaut pour les services
        if (!this.data.services || this.data.services.length === 0) {
            this.data.services = [
                { id: 1, name: "Consultation Générale", price: 5000, duration: "30 min" },
                { id: 2, name: "Urgences", price: 10000, duration: "Immédiat" },
                { id: 3, name: "Radiologie", price: 25000, duration: "45 min" },
                { id: 4, name: "Laboratoire", price: 15000, duration: "20 min" },
                { id: 5, name: "Pédiatrie", price: 7000, duration: "40 min" },
                { id: 6, name: "Ophtalmologie", price: 12000, duration: "60 min" }
            ];
        }
        
        // Données par défaut pour les utilisateurs
        if (!this.data.users || this.data.users.length === 0) {
            this.data.users = [];
        }
        
        // Données par défaut pour les rendez-vous
        if (!this.data.appointments || this.data.appointments.length === 0) {
            this.data.appointments = [];
        }
        
        // Données par défaut pour les tickets
        if (!this.data.tickets || this.data.tickets.length === 0) {
            this.data.tickets = [];
        }
        
        this.saveToLocalStorage();
    }
    
    setupAutoSave() {
        // Sauvegarder automatiquement toutes les 30 secondes
        setInterval(() => {
            this.saveToLocalStorage();
        }, 30000);
        
        // Sauvegarder quand la page se ferme
        window.addEventListener('beforeunload', () => {
            this.saveToLocalStorage();
        });
    }
    
    // Méthodes pour accéder aux données
    getHospitals() {
        return this.data.hospitals;
    }
    
    getHospitalById(id) {
        return this.data.hospitals.find(h => h.id === parseInt(id));
    }
    
    getServices() {
        return this.data.services;
    }
    
    getAppointments() {
        return this.data.appointments;
    }
    
    getTickets() {
        return this.data.tickets;
    }
    
    getCurrentUser() {
        return this.data.currentUser;
    }
    
    // Méthodes pour modifier les données
    addAppointment(appointment) {
        appointment.id = Date.now();
        appointment.createdAt = new Date().toISOString();
        this.data.appointments.push(appointment);
        this.saveToLocalStorage();
        this.emitDataChange();
        return appointment;
    }
    
    addTicket(ticket) {
        ticket.id = Date.now();
        ticket.purchaseDate = new Date().toISOString();
        this.data.tickets.push(ticket);
        this.saveToLocalStorage();
        this.emitDataChange();
        return ticket;
    }
    
    setCurrentUser(user) {
        this.data.currentUser = user;
        this.saveToLocalStorage();
        this.emitDataChange();
    }
    
    login(email, password) {
        const user = this.data.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.setCurrentUser(user);
            return { success: true, user };
        }
        return { success: false, message: "Identifiants incorrects" };
    }
    
    signup(userData) {
        // Vérifier si l'utilisateur existe déjà
        if (this.data.users.find(u => u.email === userData.email)) {
            return { success: false, message: "Cet email est déjà utilisé" };
        }
        
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
            appointments: [],
            tickets: []
        };
        
        this.data.users.push(newUser);
        this.setCurrentUser(newUser);
        this.saveToLocalStorage();
        this.emitDataChange();
        
        return { success: true, user: newUser };
    }
    
    logout() {
        this.data.currentUser = null;
        this.saveToLocalStorage();
        this.emitDataChange();
    }
    
    // Événements pour synchroniser entre les onglets
    setupCrossTabSync() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'samaHealthData') {
                this.loadFromLocalStorage();
                this.emitDataChange();
            }
        });
    }
    
    emitDataChange() {
        const event = new CustomEvent('samaHealthDataChange', {
            detail: this.data
        });
        window.dispatchEvent(event);
    }
}

// Initialiser le Data Manager global
window.dataManager = new DataManager();
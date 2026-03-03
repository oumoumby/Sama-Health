// script.js - Sama Health

// Fonctions utilitaires
class Utils {
    // Formater une date
    static formatDate(date) {
        return new Date(date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Générer un identifiant unique
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Stocker dans le localStorage
    static saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Erreur de sauvegarde:', error);
            return false;
        }
    }

    // Récupérer du localStorage
    static getFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Erreur de lecture:', error);
            return null;
        }
    }

    // Valider un email
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Valider un téléphone
    static isValidPhone(phone) {
        const re = /^[+]?[\d\s\-\(\)]+$/;
        return re.test(phone);
    }
}

// Gestionnaire d'authentification
class AuthManager {
    constructor() {
        this.currentUser = Utils.getFromLocalStorage('currentUser');
        this.users = Utils.getFromLocalStorage('users') || [];
    }

    // Inscription
    signup(userData) {
        // Validation
        if (!userData.email || !userData.password || !userData.fullName) {
            return { success: false, message: 'Tous les champs sont requis' };
        }

        if (!Utils.isValidEmail(userData.email)) {
            return { success: false, message: 'Email invalide' };
        }

        if (userData.password.length < 6) {
            return { success: false, message: 'Le mot de passe doit avoir au moins 6 caractères' };
        }

        // Vérifier si l'utilisateur existe déjà
        if (this.users.find(user => user.email === userData.email)) {
            return { success: false, message: 'Cet email est déjà utilisé' };
        }

        // Créer l'utilisateur
        const newUser = {
            id: Utils.generateId(),
            ...userData,
            createdAt: new Date().toISOString(),
            appointments: [],
            tickets: []
        };

        // Ajouter à la liste des utilisateurs
        this.users.push(newUser);
        Utils.saveToLocalStorage('users', this.users);

        // Connecter automatiquement
        this.login(userData.email, userData.password);

        return { success: true, user: newUser };
    }

    // Connexion
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            Utils.saveToLocalStorage('currentUser', user);
            return { success: true, user };
        }
        
        return { success: false, message: 'Email ou mot de passe incorrect' };
    }

    // Déconnexion
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        return { success: true };
    }

    // Vérifier si connecté
    isAuthenticated() {
        return !!this.currentUser;
    }

    // Mettre à jour le profil
    updateProfile(userData) {
        if (!this.currentUser) {
            return { success: false, message: 'Non connecté' };
        }

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex === -1) {
            return { success: false, message: 'Utilisateur non trouvé' };
        }

        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        this.currentUser = this.users[userIndex];
        
        Utils.saveToLocalStorage('users', this.users);
        Utils.saveToLocalStorage('currentUser', this.currentUser);

        return { success: true, user: this.currentUser };
    }
}
// Gestionnaire de rendez-vous (suite)
class AppointmentManager {
    constructor() {
        this.appointments = Utils.getFromLocalStorage('appointments') || [];
        this.hospitals = Utils.getFromLocalStorage('hospitals') || (window.hospitalsLoader ? window.hospitalsLoader.hospitals : []);
        this.authManager = new AuthManager();
    }

    // Rechercher des hôpitaux
    searchHospitals(query) {
        if (!query) return this.hospitals;
        
        return this.hospitals.filter(hospital => 
            hospital.name.toLowerCase().includes(query.toLowerCase()) ||
            hospital.address.toLowerCase().includes(query.toLowerCase()) ||
            hospital.services.some(service => 
                service.toLowerCase().includes(query.toLowerCase())
            )
        );
    }

    // Filtrer par service
    filterByService(service) {
        return this.hospitals.filter(hospital => 
            hospital.services.includes(service)
        );
    }

    // (Distance / localisation features removed — centralized in hospitals-loader.js)

    // Prendre un rendez-vous
    bookAppointment(hospitalId, service, dateTime, userId) {
        // Use provided userId or fallback to the currently authenticated user
        if (!userId) userId = this.authManager.currentUser?.id;

        if (!this.authManager.isAuthenticated()) {
            return { success: false, message: 'Connectez-vous pour prendre rendez-vous' };
        }

        const hospital = this.hospitals.find(h => h.id === hospitalId);
        if (!hospital) {
            return { success: false, message: 'Hôpital non trouvé' };
        }

        if (!hospital.services.includes(service)) {
            return { success: false, message: 'Service non disponible dans cet hôpital' };
        }

        const appointment = {
            id: Utils.generateId(),
            hospitalId,
            hospitalName: hospital.name,
            service,
            dateTime,
            userId,
            status: 'confirmé',
            ticketNumber: this.generateTicketNumber(),
            qrCode: this.generateQRCode(),
            createdAt: new Date().toISOString()
        };

        this.appointments.push(appointment);
        Utils.saveToLocalStorage('appointments', this.appointments);

        // Ajouter au profil utilisateur si c'est le même utilisateur
        if (this.authManager.currentUser && this.authManager.currentUser.id === userId) {
            this.authManager.currentUser.appointments = this.authManager.currentUser.appointments || [];
            this.authManager.currentUser.appointments.push(appointment.id);
            this.authManager.updateProfile(this.authManager.currentUser);
        }

        return { success: true, appointment };
    }

    // Générer un numéro de ticket
    generateTicketNumber() {
        const prefix = 'TICKET-';
        const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return prefix + random;
    }

    // Générer un QR code (simulé)
    generateQRCode() {
        return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${Utils.generateId()}`;
    }

    // Obtenir les rendez-vous d'un utilisateur
    getUserAppointments(userId) {
        return this.appointments.filter(app => app.userId === userId)
            .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    }

    // Annuler un rendez-vous
    cancelAppointment(appointmentId, userId) {
        const appointmentIndex = this.appointments.findIndex(
            app => app.id === appointmentId && app.userId === userId
        );

        if (appointmentIndex === -1) {
            return { success: false, message: 'Rendez-vous non trouvé' };
        }

        // Mettre à jour le statut
        this.appointments[appointmentIndex].status = 'annulé';
        this.appointments[appointmentIndex].cancelledAt = new Date().toISOString();
        
        Utils.saveToLocalStorage('appointments', this.appointments);
        
        return { success: true, appointment: this.appointments[appointmentIndex] };
    }

    // Obtenir les statistiques d'attente
    getWaitingStats(hospitalId) {
        const hospitalAppointments = this.appointments.filter(
            app => app.hospitalId === hospitalId && 
                   app.status === 'confirmé' &&
                   new Date(app.dateTime) >= new Date()
        );

        return {
            totalInQueue: hospitalAppointments.length,
            estimatedWait: hospitalAppointments.length * 15, // 15 minutes par personne
            nextAvailable: this.getNextAvailableSlot(hospitalId)
        };
    }

    // Obtenir le prochain créneau disponible
    getNextAvailableSlot(hospitalId) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        // Simuler des créneaux disponibles
        const slots = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            
            // Générer des créneaux de 30 minutes de 8h à 18h
            for (let hour = 8; hour < 18; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    const slotTime = new Date(date);
                    slotTime.setHours(hour, minute, 0, 0);
                    
                    if (slotTime > now) {
                        slots.push(slotTime);
                    }
                }
            }
        }
        
        return slots[0];
    }
}

// Gestionnaire de tickets
class TicketManager {
    constructor() {
        this.tickets = Utils.getFromLocalStorage('tickets') || [];
        this.authManager = new AuthManager();
    }

    // Acheter un ticket
    purchaseTicket(hospitalId, service, price, userId) {
        // Use provided userId or fallback to the authenticated user
        if (!userId) userId = this.authManager.currentUser?.id;

        if (!this.authManager.isAuthenticated()) {
            return { success: false, message: 'Connectez-vous pour acheter un ticket' };
        }

        const ticket = {
            id: Utils.generateId(),
            hospitalId,
            service,
            price,
            userId,
            purchaseDate: new Date().toISOString(),
            status: 'actif',
            ticketNumber: this.generateTicketNumber(),
            qrCode: this.generateQRCode(),
            validUntil: this.getValidUntilDate()
        };

        this.tickets.push(ticket);
        Utils.saveToLocalStorage('tickets', this.tickets);

        // Ajouter au profil utilisateur si c'est le même utilisateur
        if (this.authManager.currentUser && this.authManager.currentUser.id === userId) {
            this.authManager.currentUser.tickets = this.authManager.currentUser.tickets || [];
            this.authManager.currentUser.tickets.push(ticket.id);
            this.authManager.updateProfile(this.authManager.currentUser);
        }

        return { success: true, ticket };
    }

    // Générer un numéro de ticket
    generateTicketNumber() {
        const prefix = 'SMH-';
        const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return prefix + random;
    }

    // Générer un QR code (simulé)
    generateQRCode() {
        return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET-${Utils.generateId()}`;
    }

    // Date de validité (24 heures)
    getValidUntilDate() {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString();
    }

    // Obtenir les tickets d'un utilisateur
    getUserTickets(userId) {
        return this.tickets.filter(ticket => ticket.userId === userId)
            .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    }

    // Utiliser un ticket
    useTicket(ticketId, userId) {
        const ticketIndex = this.tickets.findIndex(
            t => t.id === ticketId && t.userId === userId
        );

        if (ticketIndex === -1) {
            return { success: false, message: 'Ticket non trouvé' };
        }

        if (this.tickets[ticketIndex].status !== 'actif') {
            return { success: false, message: 'Ticket déjà utilisé ou expiré' };
        }

        // Vérifier la validité
        if (new Date() > new Date(this.tickets[ticketIndex].validUntil)) {
            this.tickets[ticketIndex].status = 'expiré';
            Utils.saveToLocalStorage('tickets', this.tickets);
            return { success: false, message: 'Ticket expiré' };
        }

        // Marquer comme utilisé
        this.tickets[ticketIndex].status = 'utilisé';
        this.tickets[ticketIndex].usedAt = new Date().toISOString();
        
        Utils.saveToLocalStorage('tickets', this.tickets);
        
        return { success: true, ticket: this.tickets[ticketIndex] };
    }

    // Vérifier la validité d'un ticket
    validateTicket(ticketNumber) {
        const ticket = this.tickets.find(t => t.ticketNumber === ticketNumber);
        
        if (!ticket) {
            return { valid: false, message: 'Ticket non trouvé' };
        }
        
        if (ticket.status !== 'actif') {
            return { valid: false, message: 'Ticket déjà utilisé ou expiré' };
        }
        
        if (new Date() > new Date(ticket.validUntil)) {
            ticket.status = 'expiré';
            Utils.saveToLocalStorage('tickets', this.tickets);
            return { valid: false, message: 'Ticket expiré' };
        }
        
        return { valid: true, ticket };
    }
}

// QueueManager removed for MVP: real-time queue tracking was disabled.

// Initialisation de l'application
class SamaHealthApp {
    constructor() {
        this.authManager = new AuthManager();
        this.appointmentManager = new AppointmentManager();
        this.ticketManager = new TicketManager();
        // Ensure these managers use the same AuthManager instance
        this.appointmentManager.authManager = this.authManager;
        this.ticketManager.authManager = this.authManager;
        
        this.initializeApp();
    }

    initializeApp() {
        // Vérifier l'authentification
        this.checkAuth();
        
        // Initialiser les écouteurs d'événements globaux
        this.setupEventListeners();
        
        // Vérifier et proposer l'installation PWA
        this.setupPWA();
        
        // Mettre à jour les indicateurs UI
        this.updateUI();
    }

    checkAuth() {
        const isLoggedIn = this.authManager.isAuthenticated();
        
        // Mettre à jour les liens d'authentification
        const authLinks = document.querySelector('.auth-links');
        if (authLinks && isLoggedIn) {
            authLinks.innerHTML = `
                <a href="profile.html" class="btn btn-outline">
                    <i class="fas fa-user"></i> Mon Profil
                </a>
                <button id="logout-btn" class="btn btn-primary">
                    <i class="fas fa-sign-out-alt"></i> Déconnexion
                </button>
            `;
            
            // Ajouter l'événement de déconnexion
            document.getElementById('logout-btn')?.addEventListener('click', () => {
                this.logout();
            });
        }
    }

    setupEventListeners() {
        // Menu mobile
        document.querySelector('.menu-toggle')?.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.querySelector('.nav-links').classList.remove('active');
            });
        });
    }

    setupPWA() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Afficher le banner après un délai
            setTimeout(() => {
                this.showInstallBanner();
            }, 5000);
        });
        
        // Gestionnaire d'installation
        document.getElementById('install-pwa')?.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    this.hideInstallBanner();
                }
                
                deferredPrompt = null;
            }
        });
        
        // Fermer le banner
        document.getElementById('close-pwa-banner')?.addEventListener('click', () => {
            this.hideInstallBanner();
            localStorage.setItem('pwaBannerClosed', 'true');
        });
    }

    showInstallBanner() {
        if (localStorage.getItem('pwaBannerClosed') !== 'true') {
            const banner = document.getElementById('pwa-banner');
            if (banner) {
                banner.style.display = 'flex';
            }
        }
    }

    hideInstallBanner() {
        const banner = document.getElementById('pwa-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    updateUI() {
        // Mettre à jour le compteur de rendez-vous si connecté
        if (this.authManager.isAuthenticated()) {
            const appointments = this.appointmentManager.getUserAppointments(
                this.authManager.currentUser.id
            );
            
            // Mettre à jour l'indicateur dans la navbar si présent
            const appointmentBadge = document.getElementById('appointment-badge');
            if (appointmentBadge) {
                const upcoming = appointments.filter(a => 
                    new Date(a.dateTime) > new Date() && a.status === 'confirmé'
                ).length;
                
                if (upcoming > 0) {
                    appointmentBadge.textContent = upcoming;
                    appointmentBadge.style.display = 'flex';
                }
            }
        }
    }

    logout() {
        this.authManager.logout();
        window.location.href = 'index.html';
    }

    // Méthodes utilitaires pour les pages
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Fermer la notification
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Fermer automatiquement après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Chargement...</p>
            </div>
        `;
        document.body.appendChild(loading);
    }

    hideLoading() {
        const loading = document.querySelector('.loading-overlay');
        if (loading) {
            loading.remove();
        }
    }
}

// Initialiser l'application lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.samaHealthApp = new SamaHealthApp();
    
    // Ajouter des styles pour les notifications et le chargement
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            background: white;
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 1002;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-success {
            border-left: 4px solid var(--secondary-color);
        }
        
        .notification-error {
            border-left: 4px solid var(--accent-color);
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-success i {
            color: var(--secondary-color);
        }
        
        .notification-error i {
            color: var(--accent-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-lighter);
            cursor: pointer;
            margin-left: auto;
        }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1003;
        }
        
        .loading-spinner {
            text-align: center;
        }
        
        .loading-spinner i {
            font-size: 3rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .loading-spinner p {
            color: var(--text-color);
            font-weight: 500;
        }
        
        #appointment-badge {
            background: var(--accent-color);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 0.8rem;
            display: none;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -5px;
            right: -5px;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
});

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        AuthManager,
        AppointmentManager,
        TicketManager,
        SamaHealthApp
    };
}








// script-improved.js - À ajouter à script.js

class ModernFeatures {
  constructor() {
    this.initAnimations();
    this.initSmoothScroll();
    this.initLazyLoading();
    this.initObservers();
  }

  initAnimations() {
    // Animation au défilement
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.feature-card, .specialty-card, .step').forEach(el => {
      observer.observe(el);
    });
  }

  initSmoothScroll() {
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  initLazyLoading() {
    // Lazy loading pour les images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  initObservers() {
    // Observer pour la navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
      }

      if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
      }
      
      lastScroll = currentScroll;
    });
  }
}

// Fonction pour les toasts modernes
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="toast-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  document.body.appendChild(toast);

  // Animation d'entrée
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Fermer automatiquement après 5 secondes
  const autoClose = setTimeout(() => {
    closeToast(toast);
  }, 5000);

  // Fermer au clic
  toast.querySelector('.toast-close').addEventListener('click', () => {
    clearTimeout(autoClose);
    closeToast(toast);
  });
}

function closeToast(toast) {
  toast.classList.remove('show');
  setTimeout(() => {
    toast.remove();
  }, 300);
}

// Fonction de chargement élégante
function showLoading() {
  const loading = document.createElement('div');
  loading.className = 'loading-overlay';
  loading.innerHTML = `
    <div class="loading-content">
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <p>Chargement...</p>
    </div>
  `;
  document.body.appendChild(loading);
}

function hideLoading() {
  const loading = document.querySelector('.loading-overlay');
  if (loading) {
    loading.classList.add('fade-out');
    setTimeout(() => loading.remove(), 300);
  }
}
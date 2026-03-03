# MVP - Sama Health
## Document de Prototype - Architecture Réelle du Site

**Plateforme:** Web (Mobile & Desktop)  
**Technologie:** HTML, CSS, JavaScript + LocalStorage

---

## Objectif du produit

Permettre aux patients de découvrir les hôpitaux publics, explorer les spécialités médicales disponibles et prendre rendez-vous facilement en ligne.

---

## FLUX UTILISATEUR COMPLET

### 📍 ÉTAPE 1: Page d'accueil (`index.html`)

**Objectif:** Accueillir l'utilisateur et le diriger vers l'action principale

**Contenu:**
- 🏥 **Navigation** : Logo + Accueil | Établissements | Services | Connexion
- 📢 **Hero Section** :
  - Titre: "Digitalisons l'accès aux hôpitaux publics"
  - Sous-titre: "Évitez les files d'attente, prenez vos rendez-vous en ligne"
- 🎯 **2 CTA principaux** (Appels à l'action) :
  1. **"📅 Prendre un rendez-vous"** → Redirection vers `appointment.html`
  2. **"🏥 Voir les établissements"** → Redirection vers `hospitals.html`
- ✨ **Section des avantages** (4 cartes) :
  1. Éviter les longues files d'attente
  2. Acheter des tickets en ligne avec QR code
  3. Trouver facilement les hôpitaux par nom ou service
  4. Recevoir des notifications et rappels
- 📋 **Aperçu des services** : Grille des spécialités disponibles

---

### 📍 ÉTAPE 2: Liste des hôpitaux (`hospitals.html`)

**Objectif:** Afficher tous les hôpitaux publics disponibles avec filtres

**Contrôles de recherche:**
- 🔍 **Recherche** : Par nom d'hôpital
- 🎯 **Filtres** : 
  - Par service/spécialité
  - Par temps d'attente
  - Par prix de consultation
- 📊 **Tri** : 
  - Par pertinence
  - Par temps d'attente (croissant/décroissant)
  - Par prix

**Affichage des hôpitaux (Format Carte pour chaque hôpital):**
- 🏥 **Nom de l'hôpital**
- 📍 **Adresse complète**
- ⏱️ **Temps d'attente moyen** (en minutes)
- 💰 **Prix de la consultation**
- ⭐ **Évaluation/Note** (ex: 4.2/5)
- 📋 **Services principaux** (liste courte)
- 🔗 **Bouton cliquable** "Voir détails" → `hospital-details.html`

---

### 📍 ÉTAPE 3: Page détails de l'hôpital (`hospital-details.html`)

**Objectif:** Afficher les infos de l'hôpital et ses spécialités disponibles

**SECTION 1 - Informations générales de l'hôpital:**
- 🏥 Nom complet de l'établissement
- 📍 Adresse complète
- 📞 Numéro de téléphone de contact
- ⏰ Horaires d'ouverture (Lun-Sam, Urgences 24h)
- 💼 Capacité (nombre de lits)
- ⭐ Évaluation générale
- 📝 Description courte de l'établissement

**SECTION 2 - Liste des spécialités médicales disponibles:**

Pour chaque spécialité (Affichée comme une carte cliquable):

- 👨‍⚕️ **Nom de la spécialité** (ex: Médecine générale, Pédiatrie, Gynécologie, Cardiologie, Radiologie, etc.)
- ⏰ **Horaires d'ouverture du service** (ex: 08:00 - 18:00)
- 📊 **Disponibilité/Prochain créneau** (ex: "Disponible aujourd'hui à 14h")
- 👤 **Responsable du service** (Nom du docteur ou chef de service)
- 📝 **Informations additionnelles** (description courte du service)
- 🔗 **Bouton "Prendre un rendez-vous"** → Redirection vers `appointment.html`



---

### 📍 ÉTAPE 4: Formulaire de prise de rendez-vous (`appointment.html`)

**Objectif:** Collecter les informations et confirmer le rendez-vous

**SECTION 1 - Sélection de la date et du créneau:**
- 📅 **Sélection de la date** (calendrier interactif)
- ⏰ **Sélection de l'heure** (créneaux horaires disponibles)
- 👨‍⚕️ **Service/Spécialité** (pré-rempli depuis la page précédente)
- 🏥 **Hôpital** (pré-rempli depuis la page précédente)

**SECTION 2 - Informations du patient:**
- 👤 **Nom complet** du patient
- 📧 **Email** de contact
- 📱 **Numéro de téléphone**
- 🎂 **Date de naissance**
- 👥 **Genre** (M / F)
- 📍 **Adresse** du domicile

**SECTION 3 - Validation et confirmation:**
- 📋 **Récapitulatif complet** :
  - Hôpital sélectionné
  - Spécialité/Service
  - Date et Heure du rendez-vous
  - Nom du patient
  - Email et téléphone
- ✅ **Bouton "Confirmer le rendez-vous"** 
- ❌ **Bouton "Annuler"** (Retour à la page précédente)
- ℹ️ **Message d'information** : "Vous recevrez une confirmation par email"

---

### 📍 ÉTAPE 5: Page de confirmation (`appointment-confirmation.html`)

**Objectif:** Confirmer le succès et montrer les détails du rendez-vous

**Contenu affiché:**

✅ **Message de confirmation principal:**
- "Votre rendez-vous a été enregistré avec succès ! 🎉"

📋 **Récapitulatif complet du rendez-vous:**
- 🏥 **Nom de l'hôpital**
- 👨‍⚕️ **Spécialité médicale**
- 📅 **Date du rendez-vous**
- ⏰ **Heure du rendez-vous**
- 👤 **Nom du patient**
- 📱 **Numéro de confirmation** (ID unique : ex: SAMA-2026-00123)
- 📧 **Message** : "Un email de confirmation a été envoyé à [email]"

🔗 **Boutons de navigation:**
- 🏠 **"Retour à l'accueil"** → `index.html`
- 🏥 **"Voir les établissements"** → `hospitals.html`
- 👤 **"Mon profil"** (si connecté) → `profile.html`

---

## PAGES SECONDAIRES

### 🔐 Authentification

**Page de connexion (`login.html`)**
- Email + Mot de passe
- Bouton "Se connecter"
- Lien "Pas de compte ? Créer un compte" → `signup.html`

**Page d'inscription (`signup.html`)**
- Nom complet
- Email unique
- Mot de passe (≥ 6 caractères)
- Confirmation du mot de passe
- Bouton "S'inscrire"
- Lien "Déjà un compte ? Se connecter" → `login.html`

### 📋 Services/Spécialités (`specialties.html`)

**Liste complète des spécialités médicales disponibles:**
- Médecine générale
- Pédiatrie
- Gynécologie/Obstétrique
- Cardiologie
- Radiologie
- Laboratoire
- Dermatologie
- Ophtalmologie
- etc.

**Pour chaque spécialité:**
- Nom et description
- Liste des hôpitaux proposant ce service
- Lien vers chaque hôpital

### 👤 Profil utilisateur (`profile.html`)

**Infos personnelles:**
- Avatar (initiales de l'utilisateur)
- Nom complet
- Email
- Téléphone
- Adresse

**Mes rendez-vous:**
- Liste de tous les rendez-vous (passés et à venir)
- Pour chaque rendez-vous : Hôpital, Spécialité, Date, Heure, Statut
- Options : Annuler, Voir détails

**Mes tickets (future feature):**
- Historique des tickets achetés
- Statut (utilisé / inutilisé)
- QR code pour présentation

**Paramètres:**
- Modifier les infos personnelles
- Changer le mot de passe
- Préférences de notifications

### 🎫 Tickets en ligne (`tickets.html`)

**Achat de tickets:**
- Sélection de l'hôpital
- Type de ticket (Consultation / Urgent / Suivi)
- Quantité
- Génération du QR code
- Confirmation

---

## DONNÉES STOCKÉES

### Hôpital
```javascript
{
  id: 1,
  name: "Hôpital Principal de Dakar",
  address: "Avenue Nelson Mandela, Dakar",
  phone: "+221 33 839 50 50",
  services: ["Médecine générale", "Pédiatrie", "Cardiologie"],
  waitingTime: 45,  // minutes
  rating: 4.2,      // sur 5
  price: 5000,      // FCFA
  openingHours: "08:00 - 18:00",
  capacity: "500 lits"
}
```

### Spécialité
```javascript
{
  id: "spec_1",
  name: "Médecine générale",
  hospitalId: 1,
  openingHours: "08:00 - 18:00",
  availability: "Lun-Sam, Urgences 24h",
  responsible: "Dr. Jean Dupont",
  description: "Consultations médicales générales"
}
```

### Rendez-vous
```javascript
{
  id: "SAMA-2026-00123",
  hospitalId: 1,
  speciality: "Médecine générale",
  date: "2026-02-15",
  time: "14:30",
  patientName: "Moussa Diallo",
  patientPhone: "+221 77 123 45 67",
  patientEmail: "moussa@email.com",
  status: "confirmed"
}
```

---

## FONCTIONNALITÉS ESSENTIELLES

✅ **Accueil attractif** avec CTA clairs  
✅ **Recherche et filtres** pour trouver les hôpitaux  
✅ **Affichage des spécialités** par hôpital  
✅ **Formulaire de rendez-vous** en 3 étapes  
✅ **Confirmation visuelle** du rendez-vous  
✅ **Stockage LocalStorage** des données  

---

## PAGES DU PROJET

| Page | Fichier | Fonction |
|------|---------|----------|
| Accueil | `index.html` | Présentation + CTA |
| Hôpitaux | `hospitals.html` | Liste avec recherche/filtres |
| Détails hôpital | `hospital-details.html` | Spécialités + Infos |
| Rendez-vous | `appointment.html` | Formulaire 3 étapes |
| Confirmation | `appointment-confirmation.html` | Récapitulatif |
| Connexion | `login.html` | Authentification |
| Inscription | `signup.html` | Création de compte |
| Services | `specialties.html` | Liste des spécialités |
| Tickets | `tickets.html` | Achat de tickets |
| Profil | `profile.html` | Gestion du compte |

---

## VALIDATION DES DONNÉES

**Formulaire de rendez-vous:**
- ✅ Hôpital sélectionné
- ✅ Date valide (future)
- ✅ Heure disponible
- ✅ Nom patient complet
- ✅ Email valide
- ✅ Téléphone valide
- ✅ Tous les champs obligatoires remplis

---

**Document créé:** Février 2026  
**Version:** 1.0 (MVP)  
**Statut:** Architecture réelle du site

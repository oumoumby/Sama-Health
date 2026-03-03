# 🏥 SAMA Health — Guide d'intégration Supabase

## 1. Créer le projet Supabase

1. Aller sur [supabase.com](https://supabase.com) et se connecter
2. Cliquer sur **New Project**
3. Choisir un nom (ex: `sama-health`), un mot de passe DB, et la région **West EU (Paris)**
4. Attendre la création (~2 min)

---

## 2. Exécuter le schéma SQL

1. Dans le dashboard Supabase, aller dans **SQL Editor** (icône à gauche)
2. Cliquer sur **New Query**
3. Copier-coller **tout** le contenu de `supabase-schema.sql`
4. Cliquer **Run** (ou Ctrl+Enter)
5. Vérifier qu'il n'y a aucune erreur

> ✅ Cela va créer : `profiles`, `hospitals`, `services`, `hospital_services`, `appointments` + toutes les données initiales (10 hôpitaux, 19 services)

---

## 3. Configurer l'authentification

1. Aller dans **Authentication** > **Providers**
2. S'assurer que **Email** est activé
3. *(Optionnel)* Désactiver **Confirm email** dans **Authentication** > **Settings** pour simplifier les tests

---

## 4. Récupérer les clés API

1. Aller dans **Settings** > **API**
2. Copier :
   - **Project URL** → `https://xxxxx.supabase.co`
   - **Anon/Public key** → `eyJhbGciOi...`

---

## 5. Ajouter Supabase au frontend

Créer le fichier `supabase-client.js` dans le dossier du projet :

```javascript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://VOTRE_URL.supabase.co';
const SUPABASE_ANON_KEY = 'VOTRE_CLE_ANON';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

> ⚠️ Remplacez `VOTRE_URL` et `VOTRE_CLE_ANON` par vos vraies valeurs.

---

## 6. Intégration page par page

### 📝 Inscription (`signup.html`)

Remplacer le `localStorage` par :

```javascript
import { supabase } from './supabase-client.js';

const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
        data: {
            full_name: fullName,
            phone: phone,
            age_range: ageRange
        }
    }
});

if (error) {
    alert('Erreur : ' + error.message);
} else {
    window.location.href = 'dashboard.html';
}
```

### 🔐 Connexion (`login.html`)

```javascript
import { supabase } from './supabase-client.js';

const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
});

if (error) {
    alert('Identifiants incorrects');
} else {
    window.location.href = 'dashboard.html';
}
```

### 🚪 Déconnexion

```javascript
await supabase.auth.signOut();
window.location.href = 'index.html';
```

### 👤 Récupérer le profil (toutes les pages)

```javascript
import { supabase } from './supabase-client.js';

const { data: { user } } = await supabase.auth.getUser();

if (user) {
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // profile.full_name, profile.phone, profile.age_range
}
```

### 🏥 Charger les hôpitaux (`hospitals.html`)

```javascript
const { data: hospitals } = await supabase
    .from('hospitals_with_services')
    .select('*')
    .order('name');

// hospitals = [{ id, name, address, rating, services: [...], ... }]
```

### 🩺 Charger les spécialités (`specialties.html`)

```javascript
const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('name');
```

### 📅 Créer un RDV (`appointment.html`)

```javascript
const { data: { user } } = await supabase.auth.getUser();

const { data, error } = await supabase
    .from('appointments')
    .insert({
        user_id: user.id,
        hospital_id: selectedHospitalId,
        service: selectedService,
        appointment_date: selectedDate,
        appointment_time: selectedTime
    })
    .select()
    .single();

if (!error) {
    sessionStorage.setItem('lastAppointment', JSON.stringify(data));
    window.location.href = 'appointment-confirmation.html';
}
```

### 📋 Mes rendez-vous (`dashboard.html` / `profile.html`)

```javascript
const { data: { user } } = await supabase.auth.getUser();

const { data: appointments } = await supabase
    .from('appointments')
    .select('*, hospitals(name)')
    .eq('user_id', user.id)
    .order('appointment_date', { ascending: true });
```

### ✏️ Mettre à jour le profil (`profile.html`)

```javascript
const { data: { user } } = await supabase.auth.getUser();

const { error } = await supabase
    .from('profiles')
    .update({
        full_name: newFullName,
        phone: newPhone,
        age_range: newAgeRange
    })
    .eq('id', user.id);
```

---

## 7. Vérifier que tout fonctionne

| Fonctionnalité | Comment tester |
|---|---|
| Inscription | Créer un compte → vérifier `profiles` dans Supabase |
| Connexion | Se connecter → dashboard s'affiche |
| Hôpitaux | Page hôpitaux → cards chargées depuis Supabase |
| Spécialités | Page spécialités → liste chargée depuis Supabase |
| Prise de RDV | Réserver → `appointments` rempli dans Supabase |
| Profil | Modifier → `profiles` mis à jour dans Supabase |
| Déconnexion | Cliquer déco → retour accueil, session détruite |

---

## 📁 Structure des tables

```
auth.users (géré par Supabase)
    └── profiles (1:1, créé auto par trigger)

hospitals
    └── hospital_services (N:N)
            └── services

appointments
    ├── → users (user_id)
    └── → hospitals (hospital_id)
```

---

## ⚡ Résumé des fichiers

| Fichier | Rôle |
|---|---|
| `supabase-schema.sql` | Schéma DB + données initiales |
| `supabase-client.js` | Client Supabase (à créer) |
| `supabase-guide.md` | Ce guide |

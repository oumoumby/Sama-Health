// ============================================================
// SAMA Health — Supabase Auth Helper
// Importé dans toutes les pages pour gérer l'authentification
// ============================================================
import { supabase } from './supabase-client.js';

// Vérifie la session et retourne le profil utilisateur
export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return {
        id: user.id,
        email: user.email,
        fullName: profile?.full_name || '',
        phone: profile?.phone || '',
        ageRange: profile?.age_range || '',
        ...profile
    };
}

// Met à jour la navbar si l'utilisateur est connecté
export async function initAuthNavbar(activePage) {
    const user = await getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return user;

    if (user) {
        const firstName = user.fullName ? user.fullName.split(' ')[0] : 'Utilisateur';
        const initial = firstName.charAt(0).toUpperCase();
        navLinks.innerHTML = `
            <a href="dashboard.html" ${activePage === 'dashboard' ? 'class="active"' : ''}>Tableau de bord</a>
            <a href="hospitals.html" ${activePage === 'hospitals' ? 'class="active"' : ''}>Hôpitaux</a>
            <a href="appointment.html" ${activePage === 'appointment' ? 'class="active"' : ''}>Rendez-vous</a>
            <div class="auth-links" style="display:flex; align-items:center; gap:0.75rem; margin-left:1rem;">
                <a href="profile.html" style="width:34px; height:34px; border-radius:50%; background:var(--primary); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem; text-decoration:none;" title="Mon profil">${initial}</a>
                <a href="profile.html" style="font-weight:600; color:var(--primary); text-decoration:none; font-size:0.9rem;">${firstName}</a>
                <button class="btn btn-outline" style="padding:0.4rem 0.75rem; font-size:0.8rem;" onclick="window.__samaLogout()"><i class="fas fa-sign-out-alt"></i></button>
            </div>
        `;
        // Notify mobile-nav.js to re-inject hamburger button
        document.dispatchEvent(new Event('navbarUpdated'));
    }

    return user;
}

// Déconnexion
export async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}

// Expose logout globalement (pour les onclick dans le HTML)
window.__samaLogout = logout;

export { supabase };

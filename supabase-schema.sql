-- ============================================================
-- SAMA Health — Supabase Database Schema
-- Exécuter dans : Supabase Dashboard > SQL Editor
-- ============================================================

-- Nettoyage (permet de relancer le script sans erreur)
DROP VIEW IF EXISTS public.hospitals_with_services;
DROP TABLE IF EXISTS public.appointments;
DROP TABLE IF EXISTS public.hospital_services;
DROP TABLE IF EXISTS public.services;
DROP TABLE IF EXISTS public.hospitals;
DROP TABLE IF EXISTS public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ======================== PROFILES ========================
-- Extension de auth.users pour stocker les infos supplémentaires
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    age_range TEXT CHECK (age_range IN ('0-17','18-25','26-35','36-45','46-55','56-65','65+')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_profiles_full_name ON public.profiles(full_name);

-- RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent insérer leur propre profil"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Trigger : créer automatiquement un profil après inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, phone, age_range)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'age_range', NULL)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ======================== HÔPITAUX ========================
CREATE TABLE public.hospitals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    description TEXT,
    image_url TEXT,
    rating NUMERIC(2,1) DEFAULT 0.0,
    latitude NUMERIC(10,6),
    longitude NUMERIC(10,6),
    opening_hours JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les hôpitaux
CREATE POLICY "Lecture publique des hôpitaux"
    ON public.hospitals FOR SELECT
    USING (true);


-- ======================== SPÉCIALITÉS / SERVICES ========================
CREATE TABLE public.services (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT DEFAULT 'fas fa-stethoscope',
    category TEXT CHECK (category IN ('consultation','urgence','specialite','diagnostic','pharmacie','therapie')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique des services"
    ON public.services FOR SELECT
    USING (true);


-- ======================== RELATION HÔPITAUX ↔ SERVICES ========================
CREATE TABLE public.hospital_services (
    hospital_id INT REFERENCES public.hospitals(id) ON DELETE CASCADE,
    service_id INT REFERENCES public.services(id) ON DELETE CASCADE,
    PRIMARY KEY (hospital_id, service_id)
);

ALTER TABLE public.hospital_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique hospital_services"
    ON public.hospital_services FOR SELECT
    USING (true);


-- ======================== RENDEZ-VOUS ========================
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    hospital_id INT NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    service TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled','completed')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_appointments_user ON public.appointments(user_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs voient uniquement leurs propres RDV
CREATE POLICY "Les utilisateurs peuvent voir leurs RDV"
    ON public.appointments FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent créer un RDV"
    ON public.appointments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent annuler leurs RDV"
    ON public.appointments FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent supprimer leurs RDV"
    ON public.appointments FOR DELETE
    USING (auth.uid() = user_id);


-- ============================================================
-- DONNÉES INITIALES
-- ============================================================

-- Insérer les services/spécialités
INSERT INTO public.services (name, description, icon, category) VALUES
('Consultation Générale', 'Diagnostic et prise en charge des pathologies courantes pour adultes et enfants.', 'fas fa-stethoscope', 'consultation'),
('Urgences', 'Prise en charge vitale immédiate avec plateau technique complet.', 'fas fa-ambulance', 'urgence'),
('Pédiatrie', 'Suivi du développement de l''enfant et traitement des maladies pédiatriques.', 'fas fa-baby', 'specialite'),
('Radiologie', 'Plateau technique moderne : IRM, Scanner, Écho et Radiologie.', 'fas fa-x-ray', 'diagnostic'),
('Analyse Médicale', 'Laboratoire d''analyses performant pour tous vos bilans de santé.', 'fas fa-flask', 'diagnostic'),
('Gynécologie', 'Suivi de grossesse, planning familial et santé de la femme.', 'fas fa-female', 'specialite'),
('Cardiologie', 'Prévention et traitement des maladies cardiovasculaires.', 'fas fa-heartbeat', 'specialite'),
('Ophtalmologie', 'Soin des yeux, chirurgie de la cataracte et correction de la vision.', 'fas fa-eye', 'specialite'),
('Dentisterie', 'Soins dentaires complets, orthodontie et chirurgie bucco-dentaire.', 'fas fa-tooth', 'specialite'),
('Dermatologie', 'Pathologies cutanées et petite chirurgie dermatologique.', 'fas fa-allergies', 'specialite'),
('Kinésithérapie', 'Rééducation post-traumatique, neurologique et respiratoire.', 'fas fa-hand-holding-heart', 'therapie'),
('Pharmacie', 'Délivrance de médicaments et dispositifs médicaux.', 'fas fa-pills', 'pharmacie'),
('Chirurgie', 'Interventions chirurgicales programmées et urgentes.', 'fas fa-procedures', 'specialite'),
('Maternité', 'Suivi de grossesse, accouchement et soins néonataux.', 'fas fa-baby-carriage', 'specialite'),
('Laboratoire', 'Examens biologiques et analyses sanguines.', 'fas fa-vial', 'diagnostic'),
('Vaccination', 'Programme de vaccination pour enfants et adultes.', 'fas fa-syringe', 'consultation'),
('Planning Familial', 'Conseils et suivi en matière de santé reproductive.', 'fas fa-users', 'consultation'),
('Imagerie Médicale', 'Diagnostic par imagerie : échographie, scanner, IRM.', 'fas fa-x-ray', 'diagnostic'),
('Nutrition', 'Conseils nutritionnels et prise en charge diététique.', 'fas fa-apple-alt', 'therapie');

-- Insérer les hôpitaux
INSERT INTO public.hospitals (id, name, address, phone, description, image_url, rating, latitude, longitude, opening_hours) VALUES
(1, 'Hôpital Principal de Dakar', 'Avenue Nelson Mandela, Dakar', '+221 33 839 50 50', 'Hôpital public principal de Dakar offrant une large gamme de services médicaux.', 'images/hospitals/hopital1.jpg', 4.2, 14.6928, -17.4467, '{"monday":"08:00 - 18:00","tuesday":"08:00 - 18:00","wednesday":"08:00 - 18:00","thursday":"08:00 - 18:00","friday":"08:00 - 17:00","saturday":"09:00 - 13:00","sunday":"Urgences uniquement"}'),
(2, 'Centre Hospitalier Universitaire de Fann', 'Route des Almadies, Dakar', '+221 33 869 10 10', 'Centre hospitalier universitaire spécialisé dans la recherche et les soins avancés.', 'images/hospitals/hopital2.jpg', 4.5, 14.7167, -17.4667, '{"monday":"07:30 - 19:00","tuesday":"07:30 - 19:00","wednesday":"07:30 - 19:00","thursday":"07:30 - 19:00","friday":"07:30 - 18:00","saturday":"08:00 - 14:00","sunday":"Urgences uniquement"}'),
(3, 'Hôpital Aristide Le Dantec', 'Avenue Pasteur, Dakar', '+221 33 822 24 24', 'Hôpital de référence pour la chirurgie et la maternité à Dakar.', 'images/hospitals/hopital3.jpg', 4.0, 14.6769, -17.4456, '{"monday":"24/7","tuesday":"24/7","wednesday":"24/7","thursday":"24/7","friday":"24/7","saturday":"24/7","sunday":"24/7"}'),
(4, 'Centre de Santé de Grand Yoff', 'Grand Yoff, Dakar', '+221 33 820 20 20', 'Centre de santé de proximité offrant des services médicaux de base.', 'images/hospitals/hopital4.jpg', 3.8, 14.7417, -17.4589, '{"monday":"08:00 - 17:00","tuesday":"08:00 - 17:00","wednesday":"08:00 - 17:00","thursday":"08:00 - 17:00","friday":"08:00 - 16:00","saturday":"08:00 - 12:00","sunday":"Fermé"}'),
(5, 'Hôpital Régional de Thiès', 'Thiès, Sénégal', '+221 33 951 10 10', 'Hôpital régional desservant la région de Thiès et ses environs.', 'images/hospitals/hopital5.jpg', 4.1, 14.7900, -16.9256, '{"monday":"07:00 - 20:00","tuesday":"07:00 - 20:00","wednesday":"07:00 - 20:00","thursday":"07:00 - 20:00","friday":"07:00 - 19:00","saturday":"08:00 - 16:00","sunday":"Urgences uniquement"}'),
(6, 'Centre Médical de Mermoz', 'Mermoz, Dakar', '+221 33 860 60 60', 'Centre médical moderne offrant des consultations spécialisées.', 'images/hospitals/hopital6.jpg', 4.3, 14.7083, -17.4697, '{"monday":"08:00 - 19:00","tuesday":"08:00 - 19:00","wednesday":"08:00 - 19:00","thursday":"08:00 - 19:00","friday":"08:00 - 18:00","saturday":"09:00 - 15:00","sunday":"Fermé"}'),
(7, 'Hôpital de l''Enfant de Diamniadio', 'Diamniadio, Dakar', '+221 33 855 55 55', 'Hôpital spécialisé dans les soins aux enfants et adolescents.', 'images/hospitals/hopital7.jpg', 4.6, 14.7139, -17.4450, '{"monday":"24/7","tuesday":"24/7","wednesday":"24/7","thursday":"24/7","friday":"24/7","saturday":"24/7","sunday":"24/7"}'),
(8, 'Centre Hospitalier de Pikine', 'Pikine, Dakar', '+221 33 834 40 40', 'Centre hospitalier de district desservant la banlieue de Dakar.', 'images/hospitals/hopital8.jpg', 3.9, 14.7500, -17.4000, '{"monday":"08:00 - 20:00","tuesday":"08:00 - 20:00","wednesday":"08:00 - 20:00","thursday":"08:00 - 20:00","friday":"08:00 - 19:00","saturday":"09:00 - 17:00","sunday":"Urgences uniquement"}'),
(9, 'Polyclinique de la Madeleine', 'Plateau, Dakar', '+221 33 821 21 21', 'Polyclinique privée conventionnée offrant des consultations spécialisées.', 'images/hospitals/hopital9.jpg', 4.4, 14.6681, -17.4303, '{"monday":"07:30 - 19:30","tuesday":"07:30 - 19:30","wednesday":"07:30 - 19:30","thursday":"07:30 - 19:30","friday":"07:30 - 18:30","saturday":"08:00 - 16:00","sunday":"Fermé"}'),
(10, 'Hôpital Militaire de Ouakam', 'Ouakam, Dakar', '+221 33 860 30 30', 'Hôpital militaire ouvert au public pour certaines consultations.', 'images/hospitals/hopital10.jpg', 4.2, 14.7222, -17.4806, '{"monday":"08:00 - 18:00","tuesday":"08:00 - 18:00","wednesday":"08:00 - 18:00","thursday":"08:00 - 18:00","friday":"08:00 - 17:00","saturday":"09:00 - 13:00","sunday":"Urgences uniquement"}');

-- Réinitialiser la séquence
SELECT setval('hospitals_id_seq', 10);

-- Associer les services aux hôpitaux
INSERT INTO public.hospital_services (hospital_id, service_id)
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 1 AND s.name IN ('Consultation Générale','Urgences','Radiologie','Laboratoire')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 2 AND s.name IN ('Consultation Générale','Pédiatrie','Cardiologie','Ophtalmologie','Dermatologie')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 3 AND s.name IN ('Urgences','Chirurgie','Maternité','Pharmacie','Consultation Générale')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 4 AND s.name IN ('Consultation Générale','Vaccination','Planning Familial','Pédiatrie')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 5 AND s.name IN ('Consultation Générale','Urgences','Radiologie','Laboratoire','Chirurgie')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 6 AND s.name IN ('Consultation Générale','Dentisterie','Pédiatrie','Gynécologie','Analyse Médicale')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 7 AND s.name IN ('Pédiatrie','Urgences','Vaccination','Nutrition')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 8 AND s.name IN ('Consultation Générale','Urgences','Maternité','Radiologie')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 9 AND s.name IN ('Consultation Générale','Dentisterie','Ophtalmologie','Dermatologie','Kinésithérapie')
UNION ALL
SELECT h.id, s.id FROM public.hospitals h, public.services s
WHERE h.id = 10 AND s.name IN ('Consultation Générale','Urgences','Chirurgie','Imagerie Médicale');


-- ======================== VUE UTILE ========================
-- Vue qui joint hôpitaux et leurs services (pour le frontend)
CREATE OR REPLACE VIEW public.hospitals_with_services AS
SELECT
    h.*,
    COALESCE(
        json_agg(s.name ORDER BY s.name) FILTER (WHERE s.name IS NOT NULL),
        '[]'::json
    ) AS services
FROM public.hospitals h
LEFT JOIN public.hospital_services hs ON h.id = hs.hospital_id
LEFT JOIN public.services s ON hs.service_id = s.id
GROUP BY h.id;

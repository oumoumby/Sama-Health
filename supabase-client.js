import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://kquwhumgwtwgxxuqzucg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxdXdodW1nd3R3Z3h4dXF6dWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0OTU2MzIsImV4cCI6MjA4ODA3MTYzMn0.bzkqCcN5dNhlXpRpEKzUKlFB9p7uKcG_1hQVCkMKvi8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
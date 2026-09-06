// Connexion au client Supabase avec tes identifiants réels
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://xvbywljapakwsgfhhvdg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ajLfVQjpG9GrhQABXUvAbA__CzwtLPg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fonction pour sauvegarder l'équipe dans ta base de données
export async function saveTeamToDatabase(managerName, leagueId, budget, teamData) {
    const { data, error } = await supabase
        .from('teams')
        .insert([
            { 
                manager_name: managerName, 
                league_id: leagueId, 
                budget_left: budget, 
                players: teamData 
            }
        ]);

    if (error) {
        console.error('Erreur lors de la sauvegarde :', error.message);
        return false;
    }
    return true;
}

// Fonction pour récupérer le classement en direct depuis ta base
export async function getLeaderboard(leagueId) {
    const { data, error } = await supabase
        .from('teams')
        .select('manager_name, budget_left, created_at')
        .eq('league_id', leagueId)
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Erreur de récupération du classement :', error.message);
        return [];
    }
    return data;
}

import { supabase } from './supabase.js';

export class FootballAPI {
    // Récupérer les matchs de la ligue depuis Supabase
    async getMatches(leagueId) {
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .eq('league_id', leagueId);

        if (error || !data || data.length === 0) {
            // Données par défaut si la table "matches" est encore vide sur Supabase
            return [
                { home: 'En attente de synchro', away: 'Base de données vide', score: '0 - 0', status: 'Bientôt' }
            ];
        }
        return data;
    }

    // Récupérer la liste des joueurs disponibles pour le recrutement depuis Supabase
    async getPlayersForLeague(leagueId) {
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .eq('league_id', leagueId);

        if (error || !data || data.length === 0) {
            // Données de secours par défaut si la table "players" n'est pas encore remplie
            const defaults = {
                ucl: [
                    { id: 1, name: 'Kylian Mbappé', pos: 'FW', price: 14.5, team: 'Real Madrid' },
                    { id: 2, name: 'Erling Haaland', pos: 'FW', price: 15.0, team: 'Man City' },
                    { id: 3, name: 'Kevin De Bruyne', pos: 'MD', price: 12.0, team: 'Man City' },
                    { id: 4, name: 'Jude Bellingham', pos: 'MD', price: 13.5, team: 'Real Madrid' },
                    { id: 5, name: 'Virgil van Dijk', pos: 'DF', price: 9.0, team: 'Liverpool' },
                    { id: 6, name: 'Thibaut Courtois', pos: 'GK', price: 8.5, team: 'Real Madrid' }
                ],
                pl: [
                    { id: 7, name: 'Bukayo Saka', pos: 'FW', price: 12.5, team: 'Arsenal' },
                    { id: 8, name: 'Mohamed Salah', pos: 'FW', price: 14.0, team: 'Liverpool' },
                    { id: 9, name: 'Martin Ødegaard', pos: 'MD', price: 11.0, team: 'Arsenal' },
                    { id: 10, name: 'Rodri', pos: 'MD', price: 10.5, team: 'Man City' },
                    { id: 11, name: 'William Saliba', pos: 'DF', price: 8.5, team: 'Arsenal' },
                    { id: 12, name: 'Alisson Becker', pos: 'GK', price: 8.0, team: 'Liverpool' }
                ],
                liga: [
                    { id: 13, name: 'Robert Lewandowski', pos: 'FW', price: 13.0, team: 'FC Barcelone' },
                    { id: 14, name: 'Vinicius Jr', pos: 'FW', price: 14.0, team: 'Real Madrid' },
                    { id: 15, name: 'Pedri', pos: 'MD', price: 10.0, team: 'FC Barcelone' },
                    { id: 16, name: 'Federico Valverde', pos: 'MD', price: 11.0, team: 'Real Madrid' },
                    { id: 17, name: 'Ronald Araujo', pos: 'DF', price: 8.0, team: 'FC Barcelone' },
                    { id: 18, name: 'Marc-André ter Stegen', pos: 'GK', price: 7.5, team: 'FC Barcelone' }
                ]
            };
            return defaults[leagueId] || [];
        }
        return data;
    }
}

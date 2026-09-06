// Module de gestion des données et d'appel aux API de football

export class FootballAPI {
    constructor() {
        // Tu pourras insérer ici ta clé API gratuite de RapidAPI (ex: API-Football) si besoin
        this.apiKey = ''; 
        this.baseUrl = 'https://v3.football.api-sports.io';
    }

    // Récupérer les matchs du jour (avec données simulées de secours si pas de clé API)
    async getMatches(leagueId) {
        // Pour garantir que le site fonctionne instantanément sans bloquer sur une clé payante,
        // nous fournissons un flux de données réaliste par défaut.
        const mockMatches = {
            ucl: [
                { home: 'Real Madrid', away: 'Manchester City', score: '2 - 1', status: 'En direct (78\')' },
                { home: 'Bayern Munich', away: 'Inter Milan', score: '0 - 0', status: 'À venir' },
                { home: 'PSG', away: 'Arsenal', score: '1 - 3', status: 'Terminé' }
            ],
            pl: [
                { home: 'Arsenal', away: 'Liverpool', score: '2 - 2', status: 'Terminé' },
                { home: 'Chelsea', away: 'Manchester United', score: '1 - 0', status: 'En direct (42\')' },
                { home: 'Tottenham', away: 'Aston Villa', score: '3 - 1', status: 'À venir' }
            ],
            liga: [
                { home: 'FC Barcelone', away: 'Atlético Madrid', score: '3 - 2', status: 'Terminé' },
                { home: 'Real Madrid', away: 'Villarreal', score: '1 - 0', status: 'À venir' },
                { home: 'Séville FC', away: 'Real Betis', score: '0 - 0', status: 'À venir' }
            ]
        };

        // Simulation d'un délai réseau pour imiter une vraie requête API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockMatches[leagueId] || []);
            }, 300);
        });
    }

    // Récupérer la liste des joueurs disponibles pour le recrutement
    async getPlayersForLeague(leagueId) {
        const mockPlayers = {
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

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockPlayers[leagueId] || []);
            }, 300);
        });
    }
}

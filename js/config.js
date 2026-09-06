// Configuration globale des ligues et des barèmes de points Fantasy

export const LEAGUES = {
    ucl: {
        id: 'ucl',
        name: 'Ligue des Champions',
        budget: 100.0,
        teamsCount: 36
    },
    pl: {
        id: 'pl',
        name: 'Premier League',
        budget: 105.0,
        teamsCount: 20
    },
    liga: {
        id: 'liga',
        name: 'La Liga',
        budget: 100.0,
        teamsCount: 20
    }
};

// Barème officiel des points Fantasy
export const SCORING_RULES = {
    GOAL_FW: 4,      // But marqué par un attaquant
    GOAL_MD: 5,      // But marqué par un milieu
    GOAL_DF: 6,      // But marqué par un défenseur
    ASSIST: 3,       // Passe décisive
    CLEAN_SHEET_GK: 4, // Match sans encaisser de but (Gardien)
    CLEAN_SHEET_DF: 4, // Match sans encaisser de but (Défenseur)
    YELLOW_CARD: -1,  // Carton jaune
    RED_CARD: -3,     // Carton rouge
    SAVE_GK: 0.5      // Arrêt du gardien
};

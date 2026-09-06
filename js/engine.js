// Moteur de gestion d'équipe et de calcul des scores
import { SCORING_RULES } from './config.js';

export class FantasyEngine {
    constructor() {
        this.selectedLeague = 'ucl';
        this.budget = 100.0;
        this.team = {
            gk: null,
            df: null,
            md: null,
            fw: null
        };
    }

    // Changer de ligue active
    setLeague(leagueId) {
        this.selectedLeague = leagueId;
        this.resetTeam();
    }

    // Réinitialiser la composition
    resetTeam() {
        this.team = { gk: null, df: null, md: null, fw: null };
        return this.team;
    }

    // Calculer les points d'un joueur en fonction de ses stats en match
    calculatePlayerScore(playerStats, position) {
        let points = 0;

        if (position === 'FW') points += (playerStats.goals || 0) * SCORING_RULES.GOAL_FW;
        if (position === 'MD') points += (playerStats.goals || 0) * SCORING_RULES.GOAL_MD;
        if (position === 'DF') points += (playerStats.goals || 0) * SCORING_RULES.GOAL_DF;

        points += (playerStats.assists || 0) * SCORING_RULES.ASSIST;

        if (position === 'GK') {
            points += (playerStats.saves || 0) * SCORING_RULES.SAVE_GK;
            if (playerStats.cleanSheet) points += SCORING_RULES.CLEAN_SHEET_GK;
        }
        if (position === 'DF' && playerStats.cleanSheet) {
            points += SCORING_RULES.CLEAN_SHEET_DF;
        }

        points += (playerStats.yellowCards || 0) * SCORING_RULES.YELLOW_CARD;
        points += (playerStats.redCards || 0) * SCORING_RULES.RED_CARD;

        return points;
    }
}

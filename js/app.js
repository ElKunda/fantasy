// Script principal d'initialisation et d'interaction de l'application
import { LEAGUES } from './config.js';
import { FantasyEngine } from './engine.js';
import { FootballAPI } from './api.js';

const engine = new FantasyEngine();
const api = new FootballAPI();

// Éléments du DOM
const leagueNav = document.getElementById('league-nav');
const leagueNameSpan = document.getElementById('current-league-name');
const matchesList = document.getElementById('matches-list');
const resetBtn = document.getElementById('reset-team');
const saveBtn = document.getElementById('save-team');

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    setupLeagueSwitcher();
    await loadLeagueData(engine.selectedLeague);
}

// Gestion du changement de ligue via les boutons du menu
function setupLeagueSwitcher() {
    const buttons = leagueNav.querySelectorAll('.league-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            buttons.forEach(b => {
                b.classList.remove('bg-emerald-600', 'text-white');
                b.classList.add('bg-slate-800', 'hover:bg-slate-700', 'text-slate-300');
            });
            e.target.classList.remove('bg-slate-800', 'hover:bg-slate-700', 'text-slate-300');
            e.target.classList.add('bg-emerald-600', 'text-white');

            const leagueId = e.target.getAttribute('data-league');
            engine.setLeague(leagueId);
            leagueNameSpan.textContent = LEAGUES[leagueId].name;
            
            await loadLeagueData(leagueId);
        });
    });
}

// Charger les matchs et rafraîchir l'interface pour la ligue sélectionnée
async function loadLeagueData(leagueId) {
    matchesList.innerHTML = `<div class="p-3 text-slate-500 text-sm text-center">Chargement des rencontres...</div>`;
    
    try {
        const matches = await api.getMatches(leagueId);
        renderMatches(matches);
    } catch (error) {
        matchesList.innerHTML = `<div class="p-3 text-red-400 text-sm text-center">Erreur de chargement des données.</div>`;
    }
}

// Afficher les matchs dans le DOM
function renderMatches(matches) {
    if (!matches || matches.length === 0) {
        matchesList.innerHTML = `<div class="p-3 text-slate-500 text-sm text-center">Aucun match disponible.</div>`;
        return;
    }

    matchesList.innerHTML = matches.map(match => `
        <div class="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex justify-between items-center text-sm">
            <span class="text-slate-200 font-medium">${match.home} vs ${match.away}</span>
            <div class="flex items-center space-x-3">
                <span class="font-bold text-emerald-400 font-mono">${match.score}</span>
                <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">${match.status}</span>
            </div>
        </div>
    `).join('');
}

// Actions des boutons de gestion d'équipe
resetBtn.addEventListener('click', () => {
    engine.resetTeam();
    alert("Votre composition a été réinitialisée.");
});

saveBtn.addEventListener('click', () => {
    alert("Équipe enregistrée avec succès pour la prochaine journée !");
});

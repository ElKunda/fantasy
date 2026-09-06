import { LEAGUES } from './config.js';
import { FantasyEngine } from './engine.js';
import { FootballAPI } from './api.js';

const engine = new FantasyEngine();
const api = new FootballAPI();

const leagueNav = document.getElementById('league-nav');
const leagueNameSpan = document.getElementById('current-league-name');
const matchesList = document.getElementById('matches-list');
const resetBtn = document.getElementById('reset-team');
const saveBtn = document.getElementById('save-team');
const budgetSpan = document.getElementById('budget');

// Éléments de la modale
const modal = document.getElementById('player-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalPlayersList = document.getElementById('modal-players-list');
const modalPosTitle = document.getElementById('modal-pos-title');

let currentActivePos = null;
let currentPlayersData = [];

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupSlotListeners();
});

async function initApp() {
    setupLeagueSwitcher();
    await loadLeagueData(engine.selectedLeague);
    currentPlayersData = await api.getPlayersForLeague(engine.selectedLeague);
}

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
            updateBudgetDisplay();
            resetSlotsUI();
            
            await loadLeagueData(leagueId);
            currentPlayersData = await api.getPlayersForLeague(leagueId);
        });
    });
}

async function loadLeagueData(leagueId) {
    matchesList.innerHTML = `<div class="p-3 text-slate-500 text-sm text-center">Chargement des rencontres...</div>`;
    try {
        const matches = await api.getMatches(leagueId);
        renderMatches(matches);
    } catch (error) {
        matchesList.innerHTML = `<div class="p-3 text-red-400 text-sm text-center">Erreur de chargement.</div>`;
    }
}

function renderMatches(matches) {
    if (!matches || matches.length === 0) {
        matchesList.innerHTML = `<div class="p-3 text-slate-500 text-sm text-center">Aucun match.</div>`;
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

// Gestion des emplacements sur le terrain
function setupSlotListeners() {
    const slots = {
        'slot-fw': 'FW',
        'slot-md': 'MD',
        'slot-df': 'DF',
        'slot-gk': 'GK'
    };

    Object.keys(slots).forEach(slotId => {
        const slotEl = document.getElementById(slotId);
        slotEl.addEventListener('click', () => {
            currentActivePos = slots[slotId];
            openPlayerModal(currentActivePos);
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

function openPlayerModal(position) {
    modalPosTitle.textContent = position;
    const filteredPlayers = currentPlayersData.filter(p => p.pos === position);

    if (filteredPlayers.length === 0) {
        modalPlayersList.innerHTML = `<div class="text-sm text-slate-500 text-center py-4">Aucun joueur disponible pour ce poste.</div>`;
    } else {
        modalPlayersList.innerHTML = filteredPlayers.map(player => `
            <div class="flex justify-between items-center p-3 bg-slate-950/80 border border-slate-800 rounded-lg hover:border-emerald-500/50 transition cursor-pointer select-player" data-id="${player.id}">
                <div>
                    <span class="block text-sm font-bold text-slate-200">${player.name}</span>
                    <span class="text-xs text-slate-400">${player.team} &bull; <span class="text-emerald-400 font-mono">${player.price}M€</span></span>
                </div>
                <button class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md">Sélectionner</button>
            </div>
        `).join();

        document.querySelectorAll('.select-player').forEach(el => {
            el.addEventListener('click', (e) => {
                const playerId = parseInt(e.currentTarget.getAttribute('data-id'));
                const selectedPlayer = currentPlayersData.find(p => p.id === playerId);
                assignPlayerToSlot(currentActivePos, selectedPlayer);
                modal.classList.add('hidden');
            });
        });
    }

    modal.classList.remove('hidden');
}

function assignPlayerToSlot(position, player) {
    const slotMap = { 'FW': 'slot-fw', 'MD': 'slot-md', 'DF': 'slot-df', 'GK': 'slot-gk' };
    const slotEl = document.getElementById(slotMap[position]);

    if (engine.budget < player.price) {
        alert("Budget insuffisant !");
        return;
    }

    engine.budget -= player.price;
    updateBudgetDisplay();

    slotEl.innerHTML = `
        <span class="block text-xs text-emerald-400 font-bold">${player.name}</span>
        <span class="text-xs text-slate-400">${player.price}M€</span>
    `;
    slotEl.classList.add('border-emerald-500', 'bg-emerald-950/60');
    engine.team[position.toLowerCase()] = player;
}

function updateBudgetDisplay() {
    budgetSpan.textContent = engine.budget.toFixed(1);
}

function resetSlotsUI() {
    engine.resetTeam();
    ['slot-fw', 'slot-md', 'slot-df', 'slot-gk'].forEach(slotId => {
        const slotEl = document.getElementById(slotId);
        const posName = slotId.replace('slot-', '').toUpperCase();
        slotEl.innerHTML = `
            <span class="block text-xs text-emerald-300 font-semibold">${posName}</span>
            <span class="text-xs text-slate-400">+ Choisir</span>
        `;
        slotEl.classList.remove('border-emerald-500', 'bg-emerald-950/60');
    });
    engine.budget = LEAGUES[engine.selectedLeague].budget;
    updateBudgetDisplay();
}

resetBtn.addEventListener('click', () => {
    resetSlotsUI();
    alert("Composition réinitialisée.");
});

saveBtn.addEventListener('click', () => {
    alert("Équipe enregistrée avec succès !");
});

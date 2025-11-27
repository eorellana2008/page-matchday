/* CONTROLADOR: HISTORIA MUNDIAL (V8 - FINAL FULL) */
import { initSession } from '../utils/session.js';
import { navigateTo, toggleModal } from '../utils/dom.js';

const worldCups = [
    {
        year: 2022,
        host: 'Qatar',
        winner: 'Argentina',
        flag: '🇦🇷',
        runnerUp: 'Francia',
        score: '3 - 3',
        extra: '(4-2 pen)',
        color: '#5DADEC',
        details: {
            groupStage: [{ rival: 'Arabia Saudita', res: '1-2' }, { rival: 'México', res: '2-0' }, { rival: 'Polonia', res: '2-0' }],
            knockout: [{ phase: '8vos', rival: 'Australia', res: '2-1' }, { phase: '4tos', rival: 'Países Bajos', res: '2-2 (4-3p)' }, { phase: 'Semis', rival: 'Croacia', res: '3-0' }],
            finalGoals: 'Messi (23\', 108\'), Di María (36\') vs Mbappé (80\', 81\', 118\')',
            topScorer: 'Kylian Mbappé (8)',
            bestPlayer: 'Lionel Messi',
            bestKeeper: 'Dibu Martínez',
            assistKing: 'Messi / Griezmann (3)'
        }
    },
    {
        year: 2018,
        host: 'Rusia',
        winner: 'Francia',
        flag: '🇫🇷',
        runnerUp: 'Croacia',
        score: '4 - 2',
        extra: '',
        color: '#EF4135',
        details: {
            groupStage: [{ rival: 'Australia', res: '2-1' }, { rival: 'Perú', res: '1-0' }, { rival: 'Dinamarca', res: '0-0' }],
            knockout: [{ phase: '8vos', rival: 'Argentina', res: '4-3' }, { phase: '4tos', rival: 'Uruguay', res: '2-0' }, { phase: 'Semis', rival: 'Bélgica', res: '1-0' }],
            finalGoals: 'Mandzukic (ag), Griezmann, Pogba, Mbappé',
            topScorer: 'Harry Kane (6)',
            bestPlayer: 'Luka Modric',
            bestKeeper: 'Thibaut Courtois',
            assistKing: 'Varios (2)'
        }
    },
    {
        year: 2014,
        host: 'Brasil',
        winner: 'Alemania',
        flag: '🇩🇪',
        runnerUp: 'Argentina',
        score: '1 - 0',
        extra: '(Prórroga)',
        color: '#FFD700',
        details: {
            groupStage: [{ rival: 'Portugal', res: '4-0' }, { rival: 'Ghana', res: '2-2' }, { rival: 'EE.UU.', res: '1-0' }],
            knockout: [{ phase: '8vos', rival: 'Argelia', res: '2-1' }, { phase: '4tos', rival: 'Francia', res: '1-0' }, { phase: 'Semis', rival: 'Brasil', res: '7-1' }],
            finalGoals: 'Mario Götze (113\')',
            topScorer: 'James Rodríguez (6)',
            bestPlayer: 'Lionel Messi',
            bestKeeper: 'Manuel Neuer',
            assistKing: 'Toni Kroos (4)'
        }
    },
    {
        year: 2010,
        host: 'Sudáfrica',
        winner: 'España',
        flag: '🇪🇸',
        runnerUp: 'Holanda',
        score: '1 - 0',
        extra: '(Prórroga)',
        color: '#C60B1E',
        details: {
            groupStage: [{ rival: 'Suiza', res: '0-1' }, { rival: 'Honduras', res: '2-0' }, { rival: 'Chile', res: '2-1' }],
            knockout: [{ phase: '8vos', rival: 'Portugal', res: '1-0' }, { phase: '4tos', rival: 'Paraguay', res: '1-0' }, { phase: 'Semis', rival: 'Alemania', res: '1-0' }],
            finalGoals: 'Andrés Iniesta (116\')',
            topScorer: 'Müller / Villa / Sneijder / Forlán (5)',
            bestPlayer: 'Diego Forlán',
            bestKeeper: 'Iker Casillas',
            assistKing: 'Kaká / Özil (3)'
        }
    },
    {
        year: 2006,
        host: 'Alemania',
        winner: 'Italia',
        flag: '🇮🇹',
        runnerUp: 'Francia',
        score: '1 - 1',
        extra: '(5-3 pen)',
        color: '#009246',
        details: {
            groupStage: [{ rival: 'Ghana', res: '2-0' }, { rival: 'EE.UU.', res: '1-1' }, { rival: 'Rep. Checa', res: '2-0' }],
            knockout: [{ phase: '8vos', rival: 'Australia', res: '1-0' }, { phase: '4tos', rival: 'Ucrania', res: '3-0' }, { phase: 'Semis', rival: 'Alemania', res: '2-0' }],
            finalGoals: 'Materazzi (19\')',
            topScorer: 'Miroslav Klose (5)',
            bestPlayer: 'Zinedine Zidane',
            bestKeeper: 'Gianluigi Buffon',
            assistKing: 'Francesco Totti (4)'
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSession();

    const logout = () => { if (confirm('¿Cerrar sesión?')) { sessionStorage.clear(); navigateTo('/index.html'); } };
    document.getElementById('logoutButtonWidget')?.addEventListener('click', logout);
    document.getElementById('logoutButtonMobile')?.addEventListener('click', logout);

    const role = sessionStorage.getItem('userRole');
    if (['admin', 'superadmin', 'moderator'].includes(role)) {
        document.querySelectorAll('.admin-link').forEach(el => el.classList.remove('hidden'));
    }

    renderHistory();
});

function renderHistory() {
    const container = document.getElementById('historyContainer');
    container.innerHTML = '';

    worldCups.forEach((cup, index) => {
        const delay = index * 0.1;
        const card = document.createElement('div');
        card.className = 'match-card animate-up';
        card.style.animationDelay = `${delay}s`;
        card.style.marginBottom = '20px';
        card.style.cursor = 'pointer';
        card.style.borderLeft = `4px solid ${cup.color}`;
        card.onclick = () => openHistoryDetails(cup);

        card.innerHTML = `
            <div class="match-header">
                <span style="display:flex; align-items:center; gap:5px;"><i class="ri-map-pin-line"></i> ${cup.host}</span>
                <span class="tournament-badge" style="background:${cup.color}; color:${getTextColor(cup.color)};">${cup.year}</span>
            </div>
            <div class="match-body" style="text-align: center; padding: 25px;">
                <div style="font-size: 4.5em; margin-bottom: 10px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">${cup.flag}</div>
                <h2 style="justify-content:center; color:var(--text-main); margin-bottom:5px; font-size:1.6em;">${cup.winner}</h2>
                <p style="color:${cup.color}; font-weight:700; text-transform:uppercase; font-size:0.85em; letter-spacing:2px; margin-bottom:20px;">Campeón del Mundo</p>
                <div style="background:var(--bg-input); padding:15px; border-radius:12px; border:1px solid var(--border);">
                    <div style="font-size:0.8em; color:var(--text-muted); text-transform:uppercase; margin-bottom:5px;">Final vs ${cup.runnerUp}</div>
                    <div style="font-size:1.8em; font-weight:800; color:var(--text-main);">${cup.score}</div>
                    <div style="font-size:0.8em; color:var(--accent); height:15px;">${cup.extra}</div>
                </div>
                <div style="margin-top:15px; font-size:0.8em; color:var(--text-muted);"><i class="ri-tap-line"></i> Toca para ver detalles</div>
            </div>`;
        container.appendChild(card);
    });
}

// --- MODAL DETALLADO CON 4 STATS ---
window.openHistoryDetails = (cup) => {
    const header = document.getElementById('historyDetailHeader');
    const body = document.getElementById('historyDetailBody');

    header.innerHTML = `
        <div style="font-size: 3em; margin-bottom:10px;">${cup.flag}</div>
        <h2 style="color:${cup.color}; margin:0; justify-content:center;">${cup.winner}</h2>
        <p style="color:var(--text-muted); margin-top:5px;">Mundial ${cup.host} ${cup.year}</p>
    `;

    body.innerHTML = `
        <div style="margin-bottom:20px;">
            <h4 style="color:var(--text-muted); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:10px; font-size:0.85em; text-transform:uppercase; letter-spacing:1px;"><i class="ri-group-line"></i> Fase de Grupos</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:5px;">
                ${cup.details.groupStage.map(g => `<div style="background:var(--bg-input); padding:8px; border-radius:6px; text-align:center; font-size:0.85em;"><div style="font-weight:bold; color:${cup.color};">${g.res}</div><div style="font-size:0.8em;">${g.rival}</div></div>`).join('')}
            </div>
        </div>

        <div style="margin-bottom:20px;">
            <h4 style="color:var(--text-muted); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:10px; font-size:0.85em; text-transform:uppercase; letter-spacing:1px;"><i class="ri-node-tree"></i> Camino a la Gloria</h4>
            ${cup.details.knockout.map(k => `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted); font-size:0.9em;">${k.phase}</span><span style="font-weight:600;">vs ${k.rival}</span><span style="color:${cup.color}; font-weight:bold;">${k.res}</span></div>`).join('')}
        </div>

        <div style="margin-bottom:20px;">
            <h4 style="color:var(--text-muted); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:10px; font-size:0.85em; text-transform:uppercase; letter-spacing:1px;"><i class="ri-vip-crown-line"></i> Premios</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                <div style="background:var(--bg-input); padding:10px; border-radius:8px; text-align:center;">
                    <div style="color:var(--accent); font-size:1.5em;"><i class="ri-vip-diamond-fill"></i></div>
                    <div style="font-size:0.7em; color:var(--text-muted); text-transform:uppercase;">MVP</div>
                    <div style="font-weight:bold; font-size:0.85em;">${cup.details.bestPlayer}</div>
                </div>
                <div style="background:rgba(255, 215, 0, 0.1); padding:10px; border-radius:8px; text-align:center; border:1px solid rgba(255, 215, 0, 0.3);">
                    <div style="color:#FFD700; font-size:1.5em;"><i class="ri-football-fill"></i></div>
                    <div style="font-size:0.7em; color:#FFD700; text-transform:uppercase;">Goleador</div>
                    <div style="font-weight:bold; font-size:0.85em;">${cup.details.topScorer}</div>
                </div>
                <div style="background:var(--bg-input); padding:10px; border-radius:8px; text-align:center;">
                    <div style="color:#ccc; font-size:1.5em;"><i class="ri-hand-coin-fill"></i></div>
                    <div style="font-size:0.7em; color:var(--text-muted); text-transform:uppercase;">Guante Oro</div>
                    <div style="font-weight:bold; font-size:0.85em;">${cup.details.bestKeeper}</div>
                </div>
                <div style="background:var(--bg-input); padding:10px; border-radius:8px; text-align:center;">
                    <div style="color:#CD7F32; font-size:1.5em;"><i class="ri-share-forward-fill"></i></div>
                    <div style="font-size:0.7em; color:var(--text-muted); text-transform:uppercase;">Asistidor</div>
                    <div style="font-weight:bold; font-size:0.85em;">${cup.details.assistKing}</div>
                </div>
            </div>
        </div>
    `;
    toggleModal('modalHistoryDetails', true);
};

function getTextColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000' : '#fff';
}

window.toggleModal = toggleModal;
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
        color: '#0055A4', // Ajustado al azul de Francia
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
        color: '#FFD700', // Dorado de Alemania
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
        color: '#C60B1E', // Rojo de España
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
        color: '#009246', // Verde de Italia
        details: {
            groupStage: [{ rival: 'Ghana', res: '2-0' }, { rival: 'EE.UU.', res: '1-1' }, { rival: 'Rep. Checa', res: '2-0' }],
            knockout: [{ phase: '8vos', rival: 'Australia', res: '1-0' }, { phase: '4tos', rival: 'Ucrania', res: '3-0' }, { phase: 'Semis', rival: 'Alemania', res: '2-0' }],
            finalGoals: 'Materazzi (19\') vs Zidane (7\')',
            topScorer: 'Miroslav Klose (5)',
            bestPlayer: 'Zinedine Zidane',
            bestKeeper: 'Gianluigi Buffon',
            assistKing: 'Francesco Totti (4)'
        }
    },
    {
        year: 2002,
        host: 'Corea/Japón',
        winner: 'Brasil',
        flag: '🇧🇷',
        runnerUp: 'Alemania',
        score: '2 - 0',
        extra: '',
        color: '#009C3B', // Verde de Brasil
        details: {
            groupStage: [{ rival: 'Turquía', res: '2-1' }, { rival: 'China', res: '4-0' }, { rival: 'Costa Rica', res: '5-2' }],
            knockout: [{ phase: '8vos', rival: 'Bélgica', res: '2-0' }, { phase: '4tos', rival: 'Inglaterra', res: '2-1' }, { phase: 'Semis', rival: 'Turquía', res: '1-0' }],
            finalGoals: 'Ronaldo (67\', 79\')',
            topScorer: 'Ronaldo (8)',
            bestPlayer: 'Oliver Kahn',
            bestKeeper: 'Oliver Kahn',
            assistKing: 'Michael Ballack (4)'
        }
    },
    {
        year: 1998,
        host: 'Francia',
        winner: 'Francia',
        flag: '🇫🇷',
        runnerUp: 'Brasil',
        score: '3 - 0',
        extra: '',
        color: '#0055A4',
        details: {
            groupStage: [{ rival: 'Sudáfrica', res: '3-0' }, { rival: 'Arabia Saudita', res: '4-0' }, { rival: 'Dinamarca', res: '2-1' }],
            knockout: [{ phase: '8vos', rival: 'Paraguay', res: '1-0' }, { phase: '4tos', rival: 'Italia', res: '0-0 (4-3p)' }, { phase: 'Semis', rival: 'Croacia', res: '2-1' }],
            finalGoals: 'Zidane (27\', 45+1\'), Petit (90+3\')',
            topScorer: 'Davor Suker (6)',
            bestPlayer: 'Ronaldo',
            bestKeeper: 'Fabien Barthez',
            assistKing: 'Varios (3)'
        }
    },
    {
        year: 1994,
        host: 'EE.UU.',
        winner: 'Brasil',
        flag: '🇧🇷',
        runnerUp: 'Italia',
        score: '0 - 0',
        extra: '(3-2 pen)',
        color: '#009C3B',
        details: {
            groupStage: [{ rival: 'Rusia', res: '2-0' }, { rival: 'Camerún', res: '3-0' }, { rival: 'Suecia', res: '1-1' }],
            knockout: [{ phase: '8vos', rival: 'EE.UU.', res: '1-0' }, { phase: '4tos', rival: 'Holanda', res: '3-2' }, { phase: 'Semis', rival: 'Suecia', res: '1-0' }],
            finalGoals: '-',
            topScorer: 'Stoichkov / Salenko (6)',
            bestPlayer: 'Romário',
            bestKeeper: 'Michel Preud\'homme',
            assistKing: 'Hagi / Brolin (4)'
        }
    },
    {
        year: 1990,
        host: 'Italia',
        winner: 'Alemania Occ.',
        flag: '🇩🇪',
        runnerUp: 'Argentina',
        score: '1 - 0',
        extra: '',
        color: '#FFD700',
        details: {
            groupStage: [{ rival: 'Yugoslavia', res: '4-1' }, { rival: 'EAU', res: '5-1' }, { rival: 'Colombia', res: '1-1' }],
            knockout: [{ phase: '8vos', rival: 'Holanda', res: '2-1' }, { phase: '4tos', rival: 'Checoslovaquia', res: '1-0' }, { phase: 'Semis', rival: 'Inglaterra', res: '1-1 (4-3p)' }],
            finalGoals: 'Andreas Brehme (85\')',
            topScorer: 'Salvatore Schillaci (6)',
            bestPlayer: 'Salvatore Schillaci',
            bestKeeper: 'Sergio Goycochea',
            assistKing: 'Häßler / Maradona (3)'
        }
    },
    {
        year: 1986,
        host: 'México',
        winner: 'Argentina',
        flag: '🇦🇷',
        runnerUp: 'Alemania Occ.',
        score: '3 - 2',
        extra: '',
        color: '#5DADEC',
        details: {
            groupStage: [{ rival: 'Corea del Sur', res: '3-1' }, { rival: 'Italia', res: '1-1' }, { rival: 'Bulgaria', res: '2-0' }],
            knockout: [{ phase: '8vos', rival: 'Uruguay', res: '1-0' }, { phase: '4tos', rival: 'Inglaterra', res: '2-1' }, { phase: 'Semis', rival: 'Bélgica', res: '2-0' }],
            finalGoals: 'Brown, Valdano, Burruchaga',
            topScorer: 'Gary Lineker (6)',
            bestPlayer: 'Diego Maradona',
            bestKeeper: 'Jean-Marie Pfaff',
            assistKing: 'Diego Maradona (5)'
        }
    },
    {
        year: 1982,
        host: 'España',
        winner: 'Italia',
        flag: '🇮🇹',
        runnerUp: 'Alemania Occ.',
        score: '3 - 1',
        extra: '',
        color: '#009246',
        details: {
            groupStage: [{ rival: 'Polonia', res: '0-0' }, { rival: 'Perú', res: '1-1' }, { rival: 'Camerún', res: '1-1' }],
            knockout: [{ phase: '2ª Ronda', rival: 'Argentina', res: '2-1' }, { phase: '2ª Ronda', rival: 'Brasil', res: '3-2' }, { phase: 'Semis', rival: 'Polonia', res: '2-0' }], // Formato de 2a fase de grupos
            finalGoals: 'Rossi, Tardelli, Altobelli',
            topScorer: 'Paolo Rossi (6)',
            bestPlayer: 'Paolo Rossi',
            bestKeeper: 'Dino Zoff',
            assistKing: 'Zico / Littbarski (5)'
        }
    },
    {
        year: 1978,
        host: 'Argentina',
        winner: 'Argentina',
        flag: '🇦🇷',
        runnerUp: 'Holanda',
        score: '3 - 1',
        extra: '(Prórroga)',
        color: '#5DADEC',
        details: {
            groupStage: [{ rival: 'Hungría', res: '2-1' }, { rival: 'Francia', res: '2-1' }, { rival: 'Italia', res: '0-1' }],
            knockout: [{ phase: '2ª Ronda', rival: 'Polonia', res: '2-0' }, { phase: '2ª Ronda', rival: 'Brasil', res: '0-0' }, { phase: '2ª Ronda', rival: 'Perú', res: '6-0' }],
            finalGoals: 'Kempes (2), Bertoni',
            topScorer: 'Mario Kempes (6)',
            bestPlayer: 'Mario Kempes',
            bestKeeper: 'Ubaldo Fillol',
            assistKing: 'No Registrado'
        }
    },
    {
        year: 1974,
        host: 'Alemania Occ.',
        winner: 'Alemania Occ.',
        flag: '🇩🇪',
        runnerUp: 'Holanda',
        score: '2 - 1',
        extra: '',
        color: '#FFD700',
        details: {
            groupStage: [{ rival: 'Chile', res: '1-0' }, { rival: 'Australia', res: '3-0' }, { rival: 'Alemania Or.', res: '0-1' }],
            knockout: [{ phase: '2ª Ronda', rival: 'Yugoslavia', res: '2-0' }, { phase: '2ª Ronda', rival: 'Suecia', res: '4-2' }, { phase: '2ª Ronda', rival: 'Polonia', res: '1-0' }],
            finalGoals: 'Breitner, Müller',
            topScorer: 'Grzegorz Lato (7)',
            bestPlayer: 'Johan Cruyff',
            bestKeeper: 'Sepp Maier',
            assistKing: 'Robert Gadocha (5)'
        }
    },
    {
        year: 1970,
        host: 'México',
        winner: 'Brasil',
        flag: '🇧🇷',
        runnerUp: 'Italia',
        score: '4 - 1',
        extra: '',
        color: '#009C3B',
        details: {
            groupStage: [{ rival: 'Checoslovaquia', res: '4-1' }, { rival: 'Inglaterra', res: '1-0' }, { rival: 'Rumania', res: '3-2' }],
            knockout: [{ phase: '4tos', rival: 'Perú', res: '4-2' }, { phase: 'Semis', rival: 'Uruguay', res: '3-1' }],
            finalGoals: 'Pelé, Gérson, Jairzinho, Carlos Alberto',
            topScorer: 'Gerd Müller (10)',
            bestPlayer: 'Pelé',
            bestKeeper: 'Ladislao Mazurkiewicz',
            assistKing: 'Pelé (5)'
        }
    },
    {
        year: 1966,
        host: 'Inglaterra',
        winner: 'Inglaterra',
        flag: '🇬🇧', // O 🏴󠁧󠁢󠁥󠁮󠁧󠁿
        runnerUp: 'Alemania Occ.',
        score: '4 - 2',
        extra: '(Prórroga)',
        color: '#CE1124', // Rojo de Inglaterra
        details: {
            groupStage: [{ rival: 'Uruguay', res: '0-0' }, { rival: 'México', res: '2-0' }, { rival: 'Francia', res: '2-0' }],
            knockout: [{ phase: '4tos', rival: 'Argentina', res: '1-0' }, { phase: 'Semis', rival: 'Portugal', res: '2-1' }],
            finalGoals: 'Hurst (3), Peters',
            topScorer: 'Eusébio (9)',
            bestPlayer: 'Bobby Charlton',
            bestKeeper: 'Gordon Banks',
            assistKing: 'No Registrado'
        }
    },
    {
        year: 1962,
        host: 'Chile',
        winner: 'Brasil',
        flag: '🇧🇷',
        runnerUp: 'Checoslovaquia',
        score: '3 - 1',
        extra: '',
        color: '#009C3B',
        details: {
            groupStage: [{ rival: 'México', res: '2-0' }, { rival: 'Checoslovaquia', res: '0-0' }, { rival: 'España', res: '2-1' }],
            knockout: [{ phase: '4tos', rival: 'Inglaterra', res: '3-1' }, { phase: 'Semis', rival: 'Chile', res: '4-2' }],
            finalGoals: 'Amarildo, Zito, Vavá',
            topScorer: 'Varios (4)',
            bestPlayer: 'Garrincha',
            bestKeeper: 'Viliam Schrojf',
            assistKing: 'No Registrado'
        }
    },
    {
        year: 1958,
        host: 'Suecia',
        winner: 'Brasil',
        flag: '🇧🇷',
        runnerUp: 'Suecia',
        score: '5 - 2',
        extra: '',
        color: '#009C3B',
        details: {
            groupStage: [{ rival: 'Austria', res: '3-0' }, { rival: 'Inglaterra', res: '0-0' }, { rival: 'Unión Soviética', res: '2-0' }],
            knockout: [{ phase: '4tos', rival: 'Gales', res: '1-0' }, { phase: 'Semis', rival: 'Francia', res: '5-2' }],
            finalGoals: 'Vavá (2), Pelé (2), Zagallo',
            topScorer: 'Just Fontaine (13)',
            bestPlayer: 'Didi',
            bestKeeper: 'Harry Gregg',
            assistKing: 'No Registrado'
        }
    },
    {
        year: 1954,
        host: 'Suiza',
        winner: 'Alemania Occ.',
        flag: '🇩🇪',
        runnerUp: 'Hungría',
        score: '3 - 2',
        extra: '',
        color: '#FFD700',
        details: {
            groupStage: [{ rival: 'Turquía', res: '4-1' }, { rival: 'Hungría', res: '3-8' }, { rival: 'Turquía', res: '7-2' }],
            knockout: [{ phase: '4tos', rival: 'Yugoslavia', res: '2-0' }, { phase: 'Semis', rival: 'Austria', res: '6-1' }],
            finalGoals: 'Morlock, Rahn (2)',
            topScorer: 'Sándor Kocsis (11)',
            bestPlayer: 'Ferenc Puskás',
            bestKeeper: 'Gyula Grosics',
            assistKing: 'No Registrado'
        }
    },
    {
        year: 1950,
        host: 'Brasil',
        winner: 'Uruguay',
        flag: '🇺🇾',
        runnerUp: 'Brasil', // Formato de liguilla final
        score: '2 - 1', // Partido decisivo
        extra: '(Fase Final)',
        color: '#0038A8', // Azul de Uruguay
        details: {
            groupStage: [{ rival: 'Bolivia', res: '8-0' }], // Grupo de solo 2
            knockout: [{ phase: 'Liguilla', rival: 'España', res: '2-2' }, { phase: 'Liguilla', rival: 'Suecia', res: '3-2' }, { phase: 'Liguilla', rival: 'Brasil', res: '2-1' }],
            finalGoals: 'Schiaffino, Ghiggia',
            topScorer: 'Ademir (8)',
            bestPlayer: 'Zizinho',
            bestKeeper: 'Roque Máspoli',
            assistKing: 'No Registrado'
        }
    },
    {
        year: 1938,
        host: 'Francia',
        winner: 'Italia',
        flag: '🇮🇹',
        runnerUp: 'Hungría',
        score: '4 - 2',
        extra: '',
        color: '#009246',
        details: {
            groupStage: [], // Formato de eliminación directa
            knockout: [{ phase: '8vos', rival: 'Noruega', res: '2-1' }, { phase: '4tos', rival: 'Francia', res: '3-1' }, { phase: 'Semis', rival: 'Brasil', res: '2-1' }],
            finalGoals: 'Colaussi (2), Piola (2)',
            topScorer: 'Leônidas (7)',
            bestPlayer: 'Leônidas',
            bestKeeper: 'František Plánicka',
            assistKing: 'No Registrado'
        }
    },
    {
        year: 1934,
        host: 'Italia',
        winner: 'Italia',
        flag: '🇮🇹',
        runnerUp: 'Checoslovaquia',
        score: '2 - 1',
        extra: '(Prórroga)',
        color: '#009246',
        details: {
            groupStage: [], // Formato de eliminación directa
            knockout: [{ phase: '8vos', rival: 'EE.UU.', res: '7-1' }, { phase: '4tos', rival: 'España', res: '1-1 (1-0)' }, { phase: 'Semis', rival: 'Austria', res: '1-0' }],
            finalGoals: 'Orsi, Schiavio',
            topScorer: 'Oldrich Nejedly (5)',
            bestPlayer: 'Giuseppe Meazza',
            bestKeeper: 'Ricardo Zamora',
            assistKing: 'No Registrado'
        }
    },
    {
        year: 1930,
        host: 'Uruguay',
        winner: 'Uruguay',
        flag: '🇺🇾',
        runnerUp: 'Argentina',
        score: '4 - 2',
        extra: '',
        color: '#0038A8',
        details: {
            groupStage: [{ rival: 'Perú', res: '1-0' }, { rival: 'Rumania', res: '4-0' }],
            knockout: [{ phase: 'Semis', rival: 'Yugoslavia', res: '6-1' }],
            finalGoals: 'Dorado, Cea, Iriarte, Castro',
            topScorer: 'Guillermo Stábile (8)',
            bestPlayer: 'José Nasazzi',
            bestKeeper: 'Enrique Ballestero',
            assistKing: 'No Registrado'
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

    // Lógica condicional para Fase de Grupos (ocultar si está vacío, como en 1934/1938)
    const groupStageHTML = cup.details.groupStage.length > 0 ? `
        <div style="margin-bottom:20px;">
            <h4 style="color:var(--text-muted); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:10px; font-size:0.85em; text-transform:uppercase; letter-spacing:1px;"><i class="ri-group-line"></i> ${cup.year === 1950 ? 'Fase de Grupos' : 'Fase de Grupos'}</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:5px;">
                ${cup.details.groupStage.map(g => `<div style="background:var(--bg-input); padding:8px; border-radius:6px; text-align:center; font-size:0.85em;"><div style="font-weight:bold; color:${cup.color};">${g.res}</div><div style="font-size:0.8em;">${g.rival}</div></div>`).join('')}
            </div>
        </div>` : '';

    // Lógica para el título de Knockout (cambia si es liguilla o eliminación)
    let knockoutTitle = '<i class="ri-node-tree"></i> Camino a la Gloria';
    if (cup.year === 1950 || cup.year === 1974 || cup.year === 1978 || cup.year === 1982) {
        knockoutTitle = '<i class="ri-node-tree"></i> Fases Finales';
    } else if (cup.year === 1934 || cup.year === 1938) {
        knockoutTitle = '<i class="ri-node-tree"></i> Eliminatorias';
    }


    body.innerHTML = `
        ${groupStageHTML}

        <div style="margin-bottom:20px;">
            <h4 style="color:var(--text-muted); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:10px; font-size:0.85em; text-transform:uppercase; letter-spacing:1px;">${knockoutTitle}</h4>
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
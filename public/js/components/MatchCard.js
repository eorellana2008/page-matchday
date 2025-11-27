/* COMPONENTE VISUAL: TARJETA DE PARTIDO (OPTIMIZADO MÓVIL) */
import { getAvatarColor, formatDateShort } from '../utils/dom.js';

export function MatchCard(match, prediction, contextLabel = 'Global') {
    const homeVal = prediction ? prediction.pred_home : '';
    const awayVal = prediction ? prediction.pred_away : '';
    const pts = prediction ? prediction.points : 0;

    const dateStr = formatDateShort(match.match_date);
    const colorHome = getAvatarColor(match.team_home);
    const colorAway = getAvatarColor(match.team_away);

    const isFinished = match.status === 'finished';
    const isLocked = !isFinished && new Date() >= new Date(match.match_date);

    // Badges
    const roundHtml = match.match_round ? `<span style="font-size:0.75em; opacity:0.8; margin-left:5px;">${match.match_round}</span>` : '';
    const compHtml = match.competition_name ? `<span style="background:var(--accent); color:#000; padding:1px 6px; border-radius:4px; font-size:0.7em; font-weight:bold; text-transform:uppercase;">${match.competition_name}</span>` : '';

    // 1. PARTIDO FINALIZADO
    if (isFinished) {
        let ptsHtml = '<span style="color:var(--text-muted); font-size:0.8em;">No jugado</span>';
        if (prediction) {
            if (pts === 3) ptsHtml = `<span style="color:#00FFC0; font-weight:bold; font-size:0.9em;"><i class="ri-star-fill"></i> +3 Pleno</span>`;
            else if (pts === 1) ptsHtml = `<span style="color:#FFD700; font-weight:bold; font-size:0.9em;"><i class="ri-check-line"></i> +1 Acierto</span>`;
            else ptsHtml = `<span style="color:var(--danger); font-size:0.9em;"><i class="ri-close-line"></i> 0 Fallo</span>`;
        }

        return `
            <div class="match-card">
                <div class="match-header">
                    <span>${dateStr}</span>
                    <div>${compHtml}</div>
                </div>
                <div class="match-body" style="padding: 15px;">
                    <div class="teams-display" style="margin-bottom:10px;">
                        <div class="team-item" style="gap:5px;">
                            <div class="team-avatar" style="border-color:${colorHome}; color:${colorHome};">${match.team_home.charAt(0)}</div>
                            <span class="team-name" style="font-size:0.85em;">${match.team_home}</span>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:1.8em; font-weight:800; letter-spacing:2px; line-height:1;">${match.score_home}-${match.score_away}</div>
                            <div style="font-size:0.75em; color:var(--text-muted); margin-top:2px;">FINAL</div>
                        </div>
                        <div class="team-item" style="gap:5px;">
                            <div class="team-avatar" style="border-color:${colorAway}; color:${colorAway};">${match.team_away.charAt(0)}</div>
                            <span class="team-name" style="font-size:0.85em;">${match.team_away}</span>
                        </div>
                    </div>
                    <div style="text-align:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                        <div style="font-size:0.8em; color:var(--text-muted); margin-bottom:2px;">Tu pronóstico: <b>${homeVal} - ${awayVal}</b></div>
                        <div>${ptsHtml}</div>
                    </div>
                </div>
            </div>`;
    }

    // 2. EN JUEGO (CERRADO)
    if (isLocked) {
        return `
            <div class="match-card">
                <div class="match-header">
                    <span style="color:var(--warning); font-weight:bold;"><i class="ri-time-line"></i> Jugando</span>
                    <div>${compHtml}</div>
                </div>
                <div class="match-body">
                    <div class="teams-display">
                        <div class="team-item">
                            <div class="team-avatar" style="border-color:${colorHome}; color:${colorHome};">${match.team_home.charAt(0)}</div>
                            <span class="team-name">${match.team_home}</span>
                        </div>
                        <div class="score-inputs-row" style="gap:10px; align-items:center;">
                            <div class="score-input-modern" style="border-style:dashed; opacity:0.6; cursor:not-allowed; display:flex; align-items:center; justify-content:center;">${homeVal !== '' ? homeVal : '-'}</div>
                            <span style="font-weight:bold; opacity:0.3;">:</span>
                            <div class="score-input-modern" style="border-style:dashed; opacity:0.6; cursor:not-allowed; display:flex; align-items:center; justify-content:center;">${awayVal !== '' ? awayVal : '-'}</div>
                        </div>
                        <div class="team-item">
                            <div class="team-avatar" style="border-color:${colorAway}; color:${colorAway};">${match.team_away.charAt(0)}</div>
                            <span class="team-name">${match.team_away}</span>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // 3. ABIERTO PARA JUGAR (ESTRUCTURA SEGURA PARA MÓVIL)
    return `
        <div class="match-card">
            <div class="match-header">
                <span>${dateStr}</span>
                <div>${compHtml}${roundHtml}</div>
            </div>
            <div class="match-body" style="padding-bottom:15px;">
                
                <div class="teams-display" style="margin-bottom:10px;">
                    <div class="team-item">
                        <div class="team-avatar" style="border-color:${colorHome}; color:${colorHome};">${match.team_home.charAt(0)}</div>
                        <span class="team-name" style="font-size:0.9em;">${match.team_home}</span>
                    </div>
                    
                    <div class="vs-divider" style="font-size:1.2em; font-weight:bold; color:var(--accent);">VS</div>

                    <div class="team-item">
                        <div class="team-avatar" style="border-color:${colorAway}; color:${colorAway};">${match.team_away.charAt(0)}</div>
                        <span class="team-name" style="font-size:0.9em;">${match.team_away}</span>
                    </div>
                </div>

                <div class="score-inputs-row" style="gap:20px; align-items:center;">
                    <input type="number" id="ph_${match.match_id}" value="${homeVal}" class="score-input-modern" placeholder="-" min="0">
                    <input type="number" id="pa_${match.match_id}" value="${awayVal}" class="score-input-modern" placeholder="-" min="0">
                </div>

            </div>
            <button onclick="window.controllers.results.savePrediction(${match.match_id})" 
                class="btn-predict" 
                style="width:100%; border-radius:0; margin:0; border-top:1px solid var(--border); font-size:0.9em; padding:12px; background: rgba(255,255,255,0.02);">
                GUARDAR
            </button>
        </div>`;
}
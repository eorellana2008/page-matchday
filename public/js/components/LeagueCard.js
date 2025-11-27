/* COMPONENTE VISUAL: TARJETA DE LIGA (V8) */

export function LeagueCard(league, currentUserId) {
    const isAdmin = (league.admin_id === currentUserId);

    // Botones de Acción
    let actionsHtml = '';
    if (isAdmin) {
        actionsHtml = `
            <button class="btn-icon-small edit" onclick="window.controllers.leagues.openManage(${league.league_id}, '${league.name}')" title="Gestionar Jornada">
                <i class="ri-settings-3-line"></i>
            </button>
            <button class="btn-icon-small delete" onclick="window.controllers.leagues.deleteLeague(${league.league_id})" title="Eliminar Liga">
                <i class="ri-delete-bin-line"></i>
            </button>
        `;
    } else {
        actionsHtml = `
            <button class="btn-icon-small delete" onclick="window.controllers.leagues.leaveLeague(${league.league_id})" title="Salir de la Liga">
                <i class="ri-logout-box-r-line"></i>
            </button>
        `;
    }

    return `
        <div class="league-card" id="league-${league.league_id}">
            <div class="league-info">
                <h3>
                    <i class="ri-shield-star-line" style="color:var(--warning); margin-right:5px;"></i>
                    ${league.name} 
                    ${isAdmin ? '<span class="league-badge-admin">ADMIN</span>' : ''}
                </h3>
                <div class="league-code-box" style="margin-top:5px;">
                    <span class="text-muted" style="font-size:0.85em;">Código:</span> 
                    <span class="league-code" onclick="navigator.clipboard.writeText('${league.code}'); alert('¡Copiado!')" title="Click para copiar">${league.code} <i class="ri-file-copy-line"></i></span>
                </div>
                <div class="league-members">
                    <i class="ri-group-line"></i> ${league.members_count} miembro(s)
                </div>
            </div>
            
            <div class="action-btn-group" style="gap:10px;">
                ${actionsHtml}
                <button class="btn-icon-small arrow" onclick="window.controllers.leagues.showRanking(${league.league_id}, '${league.name}')" title="Ver Tabla" style="background:var(--bg-body); border:1px solid var(--border); width:40px; height:40px; border-radius:50%; color:var(--accent);">
                    <i class="ri-trophy-line"></i>
                </button>
            </div>
        </div>
    `;
}
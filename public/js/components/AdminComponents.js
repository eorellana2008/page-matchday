/* COMPONENTES VISUALES: ADMIN PANEL (V8) */
import { formatDateShort } from '../utils/dom.js';

export const UserRow = (u) => {
    const roleColors = { 'superadmin': '#FFD700', 'admin': '#FF4500', 'moderator': 'var(--accent)', 'user': 'var(--text-muted)' };
    
    return `
        <tr>
            <td style="color:var(--text-muted); font-size:0.85em;">#${u.user_id}</td>
            <td><span style="font-weight:600; color:var(--text-main);">${u.username}</span></td>
            <td style="font-size:0.9em; color:var(--text-muted);">${u.email}</td>
            <td><span style="color:${roleColors[u.role]}; font-weight:700; font-size:0.75em; text-transform:uppercase; background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:4px;">${u.role}</span></td>
            <td>
                <div style="display: flex; gap: 5px;">
                    <button class="btn-icon-small edit" onclick="window.controllers.admin.openEditUser(${u.user_id})" title="Editar"><i class="ri-pencil-line"></i></button>
                    <button class="btn-icon-small delete" onclick="window.controllers.admin.deleteUser(${u.user_id})" title="Borrar"><i class="ri-delete-bin-line"></i></button>
                    <button class="btn-icon-small" style="color:#FFD700" onclick="window.controllers.admin.openResetUser(${u.user_id})" title="Reset Pass"><i class="ri-key-2-line"></i></button>
                </div>
            </td>
        </tr>`;
};

export const MatchRow = (m) => {
    const isFinished = m.status === 'finished';
    const statusHtml = isFinished 
        ? `<span style="color:var(--success); font-size:0.8em; font-weight:bold;"><i class="ri-check-double-line"></i> Final</span>` 
        : `<span style="color:var(--text-muted); font-size:0.8em;">Pendiente</span>`;

    const scoreHtml = isFinished
        ? `<span style="background:var(--bg-input); padding:2px 8px; border-radius:4px; border:1px solid var(--border); font-weight:bold;">${m.score_home}-${m.score_away}</span>`
        : `<span style="color:var(--accent); font-weight:bold; font-size:0.8em;">VS</span>`;

    const compBadge = m.competition_name 
        ? `<div style="font-size:0.7em; text-transform:uppercase; opacity:0.7; margin-bottom:2px;">${m.competition_name}</div>` 
        : '';

    return `
        <tr>
            <td>
                ${compBadge}
                <span style="color:var(--text-muted); font-size:0.85em;">${formatDateShort(m.match_date)}</span>
            </td>
            <td class="text-center" style="font-weight:600;">${m.team_home}</td>
            <td class="text-center">${scoreHtml}</td>
            <td class="text-center" style="font-weight:600;">${m.team_away}</td>
            <td>${statusHtml}</td>
            <td>
                <div style="display: flex; gap: 5px;">
                    <button class="btn-icon-small edit" onclick="window.controllers.admin.openEditMatch('${m.match_id}', '${m.team_home}', '${m.team_away}', '${m.match_date}', '${m.competition_id||''}', '${m.match_round||''}')"><i class="ri-pencil-line"></i></button>
                    <button class="btn-icon-small" style="color:var(--accent)" onclick="window.controllers.admin.openScoreMatch(${m.match_id}, '${m.team_home}', '${m.team_away}')"><i class="ri-football-line"></i></button>
                    <button class="btn-icon-small delete" onclick="window.controllers.admin.deleteMatch(${m.match_id})"><i class="ri-delete-bin-line"></i></button>
                </div>
            </td>
        </tr>`;
};

export const RequestRow = (r) => {
    let color = r.type === 'reclamo' ? 'var(--danger)' : (r.type === 'bug' ? '#FFD700' : 'var(--accent)');
    return `
        <tr>
            <td style="color:var(--text-muted); font-size:0.85em;">${formatDateShort(r.created_at)}</td>
            <td style="font-weight:600;">${r.username}</td>
            <td><span style="color:${color}; font-weight:bold; font-size:0.8em; text-transform:uppercase;">${r.type}</span></td>
            <td style="max-width: 300px; font-size: 0.9em; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${r.message}</td>
            <td class="text-center">
                <button class="btn-icon-small edit" onclick="window.controllers.admin.openReply(${r.request_id})" title="Responder"><i class="ri-reply-line"></i></button>
            </td>
        </tr>`;
};
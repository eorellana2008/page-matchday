window.abrirModalCrear = () => window.toggleModal('modalCreate', true);
window.abrirModalUnirse = () => window.toggleModal('modalJoin', true);

window.verRankingLiga = async (id, name) => {
    const modal = document.getElementById('modalRanking');
    const tbody = document.getElementById('rankingBody');
    const title = document.getElementById('leagueTitleRanking');
    title.innerText = name;
    modal.classList.remove('hidden');
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:20px;">Cargando...</td></tr>';
    try {
        const ranking = await api.getLeagueDetails(id);
        tbody.innerHTML = '';
        if (!ranking || ranking.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:20px;">Sin datos.</td></tr>';
            return;
        }
        ranking.forEach((user, index) => {
            let iconHtml = `<span style="font-weight:bold; color:var(--text-muted); font-size:0.9em;">#${index + 1}</span>`;
            let rowBg = 'transparent';
            if (index === 0) { iconHtml = `<i class="ri-trophy-fill" style="color: #FFD700; font-size: 1.2em;"></i>`; rowBg = 'rgba(255, 215, 0, 0.05)'; }
            else if (index === 1) iconHtml = `<i class="ri-trophy-fill" style="color: #C0C0C0;"></i>`;
            else if (index === 2) iconHtml = `<i class="ri-trophy-fill" style="color: #CD7F32;"></i>`;

            tbody.innerHTML += `
                <tr style="border-bottom:1px solid var(--border); background:${rowBg}">
                    <td style="padding:12px; text-align:center;">${iconHtml}</td>
                    <td style="padding:12px; font-weight:600; color: var(--text-main);">${user.username}</td>
                    <td style="padding:12px; text-align:right; color:var(--accent); font-weight:bold;">${user.total_points}</td>
                </tr>`;
        });
    } catch (e) { alert('Error al cargar ranking'); }
};

// --- LÓGICA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('leaguesContainer');
    const token = sessionStorage.getItem('userToken');
    if (!token) return;

    // OBTENER MI ID (Para saber si soy admin de la liga)
    let myUserId = null;
    try {
        const me = await api.getProfile();
        if (me) myUserId = me.user_id;
    } catch (e) { console.error("No se pudo cargar perfil"); }

    // CARGAR LIGAS
    await cargarLigas();

    async function cargarLigas() {
        try {
            const leagues = await api.getMyLeagues();
            container.innerHTML = '';

            if (leagues.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center; padding: 40px; color: var(--text-muted); border: 1px dashed var(--border); border-radius: 8px;">
                        <i class="ri-trophy-line" style="font-size: 3em; margin-bottom: 10px; display:block; opacity: 0.5;"></i>
                        <p>No estás en ninguna liga aún.</p>
                        <button onclick="abrirModalCrear()" style="margin-top:10px; background:transparent; color:var(--accent); border:none; cursor:pointer; font-weight:bold; font-size: 1em;">Crear una ahora</button>
                    </div>`;
                return;
            }

            leagues.forEach(l => {
                const isAdmin = (l.admin_id === myUserId);

                // Botón de acción (Basura si soy admin, Puerta si soy miembro)
                let actionBtn = '';
                if (isAdmin) {
                    actionBtn = `<button onclick="borrarLiga(${l.league_id})" title="Eliminar Liga" style="background:transparent; border:none; color:var(--danger); cursor:pointer; margin-right:10px;"><i class="ri-delete-bin-line" style="font-size:1.2em;"></i></button>`;
                } else {
                    actionBtn = `<button onclick="salirLiga(${l.league_id})" title="Salir de Liga" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; margin-right:10px;"><i class="ri-logout-box-r-line" style="font-size:1.2em;"></i></button>`;
                }

                const card = document.createElement('div');
                card.style = "background: var(--bg-input); padding: 20px; border-radius: 8px; border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;";

                card.innerHTML = `
                    <div>
                        <h3 style="margin:0; color:var(--text-main); font-size:1.1em;">
                            ${l.name} 
                            ${isAdmin ? '<span style="font-size:0.6em; background:var(--accent); color:#000; padding:2px 6px; border-radius:4px; vertical-align:middle; margin-left:5px;">ADMIN</span>' : ''}
                        </h3>
                        <div style="color:var(--text-muted); font-size:0.85em; margin-top:5px;">
                            Código: <strong style="color:var(--accent); letter-spacing:1px; font-family: monospace; font-size: 1.1em; cursor:pointer;" onclick="navigator.clipboard.writeText('${l.code}'); alert('Código copiado!')" title="Copiar">${l.code} <i class="ri-file-copy-line" style="font-size:0.8em;"></i></strong>
                        </div>
                        <div style="color:var(--text-muted); font-size:0.75em; margin-top:4px;">
                            <i class="ri-group-line"></i> ${l.members_count} miembro(s)
                        </div>
                    </div>
                    <div style="display:flex; align-items:center;">
                        ${actionBtn}
                        <button onclick="verRankingLiga(${l.league_id}, '${l.name}')" class="action-btn" style="background:var(--bg-card); border:1px solid var(--border); width:45px; height:45px; border-radius:50%; color: var(--text-main); cursor: pointer; display: flex; align-items: center; justify-content: center;">
                            <i class="ri-arrow-right-s-line" style="font-size: 1.5em;"></i>
                        </button>
                    </div>
                `;
                container.appendChild(card);
            });

        } catch (e) {
            console.error(e);
            container.innerHTML = '<p style="text-align:center;">Error al cargar ligas.</p>';
        }
    }

    // FUNCIONES INTERNAS PARA LOS LISTENERS
    window.borrarLiga = async (id) => {
        if (!confirm('¿Seguro que quieres ELIMINAR esta liga? Se borrará para todos.')) return;
        try {
            const res = await api.deleteLeague(id);
            if (res.message) { alert('Liga eliminada.'); cargarLigas(); }
            else alert(res.error);
        } catch (e) { alert('Error'); }
    };

    window.salirLiga = async (id) => {
        if (!confirm('¿Seguro que quieres salirte?')) return;
        try {
            const res = await api.leaveLeague(id);
            if (res.message) { alert('Te has salido.'); cargarLigas(); }
            else alert(res.error);
        } catch (e) { alert('Error'); }
    };

    const formCreate = document.getElementById('formCreate');
    if (formCreate) {
        formCreate.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('league_name').value;
            try {
                const res = await api.createLeague({ name });
                if (res.message) {
                    alert(`¡Liga creada! Código: ${res.code}`);
                    window.toggleModal('modalCreate', false);
                    cargarLigas();
                } else { alert(res.error); }
            } catch (e) { alert('Error de conexión'); }
        });
    }

    const formJoin = document.getElementById('formJoin');
    if (formJoin) {
        formJoin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const code = document.getElementById('league_code').value;
            try {
                const res = await api.joinLeague({ code });
                if (res.message) {
                    alert(res.message);
                    window.toggleModal('modalJoin', false);
                    cargarLigas();
                } else { alert(res.error); }
            } catch (e) { alert('Error de conexión'); }
        });
    }
});
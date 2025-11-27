/* CONTROLADOR: ADMIN PANEL (V9 FINAL - DASHBOARD & CLEAN) */
import { api } from '../services/api.js';
import { initSession } from '../utils/session.js';
import { toggleModal, navigateTo } from '../utils/dom.js';
import { UserRow, MatchRow, RequestRow } from '../components/AdminComponents.js';

let cache = { users: [], matches: [], requests: [], competitions: [] };

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Iniciar Sesión
    initSession();

    // 2. Configurar Logout
    const logoutBtn = document.getElementById('logoutButton');
    if (logoutBtn) {
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            if (confirm('¿Cerrar sesión?')) {
                sessionStorage.clear();
                navigateTo('/index.html');
            }
        };
    }

    // 3. Cargar Competiciones (para los selectores)
    try {
        cache.competitions = await api.getCompetitions();
    } catch (e) {
        console.error("Error cargando competiciones");
    }

    // 4. Verificar Rol (Seguridad Visual)
    const role = sessionStorage.getItem('userRole');
    if (role === 'moderator') {
        const btnUsers = document.getElementById('tab-btn-users');
        const btnReq = document.getElementById('tab-btn-requests');
        if (btnUsers) btnUsers.style.display = 'none';
        if (btnReq) btnReq.style.display = 'none';
        window.switchTab('matches');
    } else {
        window.switchTab('users');
    }

    // 5. Inicializar Formularios y Dashboard
    setupAdminForms();
    updateDashboardStats(); 
});

// --- DASHBOARD (TARJETAS DE ESTADÍSTICAS) ---
async function updateDashboardStats() {
    try {
        const [users, matches, requests] = await Promise.all([
            api.getUsers(),
            api.getMatches(),
            api.getAllRequests()
        ]);

        // Calcular totales
        const totalUsers = users.length || 0;
        const activeMatches = matches.filter(m => m.status !== 'finished').length || 0;
        const pendingRequests = requests.length || 0;

        // Actualizar DOM
        const elUsers = document.getElementById('statUsers');
        const elMatches = document.getElementById('statMatches');
        const elRequests = document.getElementById('statRequests');

        if(elUsers) elUsers.textContent = totalUsers;
        if(elMatches) elMatches.textContent = activeMatches;
        if(elRequests) elRequests.textContent = pendingRequests;

    } catch (e) { console.error("Error actualizando dashboard", e); }
}

// --- SISTEMA DE PESTAÑAS ---
window.switchTab = async (tabName) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    document.getElementById(`tab-btn-${tabName}`)?.classList.add('active');
    document.getElementById(`tab-${tabName}`)?.classList.add('active');

    if (tabName === 'users') loadUsers();
    if (tabName === 'matches') loadMatches();
    if (tabName === 'requests') loadRequests();
};

// --- CARGADORES DE DATOS (TABLAS) ---
async function loadUsers() {
    const tbody = document.querySelector('#usersTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Cargando...</td></tr>';
    
    try {
        const data = await api.getUsers();
        cache.users = data;
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay usuarios registrados.</td></tr>';
        } else {
            tbody.innerHTML = data.map(UserRow).join('');
        }
    } catch (e) { tbody.innerHTML = '<tr><td colspan="6" class="text-center error">Error de conexión.</td></tr>'; }
}

async function loadMatches() {
    const tbody = document.querySelector('#matchesTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Cargando...</td></tr>';
    
    try {
        const data = await api.getMatches();
        cache.matches = data;
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay partidos creados.</td></tr>';
        } else {
            tbody.innerHTML = data.map(MatchRow).join('');
        }
    } catch (e) { tbody.innerHTML = '<tr><td colspan="6" class="text-center error">Error de conexión.</td></tr>'; }
}

async function loadRequests() {
    const tbody = document.querySelector('#requestsTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Cargando...</td></tr>';
    
    try {
        const data = await api.getAllRequests();
        cache.requests = data;
        
        // Badge Rojo
        const badge = document.getElementById('badgeRequests');
        if (badge) {
            badge.textContent = data.length;
            badge.style.display = data.length > 0 ? 'inline-block' : 'none';
        }

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Buzón vacío.</td></tr>';
        } else {
            tbody.innerHTML = data.map(RequestRow).join('');
        }
    } catch (e) { tbody.innerHTML = '<tr><td colspan="5" class="text-center error">Error de conexión.</td></tr>'; }
}

// --- GESTIÓN DE FORMULARIOS ---
function setupAdminForms() {
    
    // 1. Crear Usuario
    document.getElementById('formCrear')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await api.createUser({
            username: document.getElementById('new_username').value,
            email: document.getElementById('new_email').value,
            password: document.getElementById('new_password').value,
            role: document.getElementById('new_role').value,
            country_id: document.getElementById('new_country').value
        });
        if (res.message) { toggleModal('modalCrear', false); loadUsers(); updateDashboardStats(); } 
        else alert(res.error || 'Error al crear');
    });

    // 2. Editar Usuario
    document.getElementById('formEditar')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await api.updateUser(document.getElementById('edit_id').value, {
            username: document.getElementById('edit_username').value,
            email: document.getElementById('edit_email').value,
            role: document.getElementById('edit_role').value
        });
        if (res.message) { toggleModal('modalEditar', false); loadUsers(); } 
        else alert(res.error || 'Error al actualizar');
    });

    // 3. Reset Password
    document.getElementById('formReset')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await api.adminResetPassword(
            document.getElementById('reset_id').value, 
            document.getElementById('reset_new_password').value
        );
        if (res.message) { 
            alert('Contraseña restablecida'); 
            toggleModal('modalReset', false); 
            document.getElementById('reset_new_password').value = ''; 
        } else alert(res.error);
    });

    // 4. Crear Partido
    document.getElementById('formMatch')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await api.createMatch({
            team_home: document.getElementById('team_home').value,
            team_away: document.getElementById('team_away').value,
            match_date: document.getElementById('match_date').value,
            competition_id: document.getElementById('match_competition').value,
            match_round: document.getElementById('match_round').value
        });
        if (res.message) { toggleModal('modalMatch', false); loadMatches(); updateDashboardStats(); } 
        else alert(res.error || 'Error al crear partido');
    });

    // 5. Editar Partido
    document.getElementById('formEditMatch')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await api.updateMatch(document.getElementById('edit_match_id').value, {
            team_home: document.getElementById('edit_team_home').value,
            team_away: document.getElementById('edit_team_away').value,
            match_date: document.getElementById('edit_match_date').value,
            competition_id: document.getElementById('edit_match_competition').value,
            match_round: document.getElementById('edit_match_round').value
        });
        if (res.message) { toggleModal('modalEditMatch', false); loadMatches(); } 
        else alert(res.error || 'Error al actualizar partido');
    });

    // 6. Resultado (Score)
    document.getElementById('formScore')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await api.updateMatchScore(document.getElementById('score_id').value, {
            score_home: document.getElementById('score_home').value,
            score_away: document.getElementById('score_away').value
        });
        if (res.message) { toggleModal('modalScore', false); loadMatches(); updateDashboardStats(); } 
        else alert(res.error || 'Error al guardar resultado');
    });

    // 7. Responder Ticket
    document.getElementById('formResponse')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await api.respondRequest(
            document.getElementById('response_id').value, 
            document.getElementById('response_msg').value
        );
        if (res.message) { 
            alert('Enviado'); 
            toggleModal('modalResponse', false); 
            document.getElementById('response_msg').value = '';
            loadRequests(); 
            updateDashboardStats();
        } else alert(res.error || 'Error al responder');
    });
}

// --- HELPERS DE INTERFAZ ---

function fillRoleSelect(selectId, currentRole) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = `
        <option value="user">Usuario</option>
        <option value="moderator">Moderador</option>
        <option value="admin">Administrador</option>
        <option value="superadmin">Super Admin</option>
    `;
    if (currentRole) select.value = currentRole;
}

function fillCompSelect(selectId, currentVal) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    
    sel.innerHTML = '<option value="">-- Amistoso / Ninguna --</option>' + 
        cache.competitions.map(c => `<option value="${c.competition_id}">${c.name}</option>`).join('');
    if (currentVal) sel.value = currentVal;
}

// --- MÉTODOS PÚBLICOS (ACCIONES) ---
window.controllers = window.controllers || {};
window.controllers.admin = {
    
    // USUARIOS
    openCreateUser: async () => { 
        toggleModal('modalCrear', true); 
        fillRoleSelect('new_role'); 
        try {
            const c = await api.getCountries(); 
            const countrySel = document.getElementById('new_country');
            if(countrySel) countrySel.innerHTML = c.map(x => `<option value="${x.country_id}">${x.name}</option>`).join('');
        } catch(e) {}
    },

    openEditUser: (id) => { 
        const u = cache.users.find(x => x.user_id === id);
        if(!u) return;
        document.getElementById('edit_id').value = id;
        document.getElementById('edit_username').value = u.username;
        document.getElementById('edit_email').value = u.email;
        fillRoleSelect('edit_role', u.role);
        toggleModal('modalEditar', true); 
    },

    deleteUser: async (id) => { 
        if (confirm('¿Eliminar usuario permanentemente?')) { 
            await api.deleteUser(id); 
            loadUsers(); 
            updateDashboardStats();
        }
    },

    openResetUser: (id) => { 
        document.getElementById('reset_id').value = id; 
        document.getElementById('reset_new_password').value = '';
        toggleModal('modalReset', true); 
    },

    // PARTIDOS
    openCreateMatch: () => { 
        toggleModal('modalMatch', true); 
        fillCompSelect('match_competition'); 
    },

    openEditMatch: (id, home, away, date, compId, round) => { 
        document.getElementById('edit_match_id').value = id;
        document.getElementById('edit_team_home').value = home;
        document.getElementById('edit_team_away').value = away;
        
        let isoDate = date;
        if (date.includes('T')) {
             isoDate = date.substring(0, 16);
        } else {
             const d = new Date(date);
             isoDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        }
        
        document.getElementById('edit_match_date').value = isoDate;
        fillCompSelect('edit_match_competition', compId);
        document.getElementById('edit_match_round').value = round || '';
        toggleModal('modalEditMatch', true); 
    },

    openScoreMatch: (id, home, away) => { 
        document.getElementById('score_id').value = id; 
        document.getElementById('scoreMatchLabel').innerText = `${home} vs ${away}`;
        document.getElementById('score_home').value = '';
        document.getElementById('score_away').value = '';
        toggleModal('modalScore', true); 
    },

    deleteMatch: async (id) => { 
        if (confirm('¿Eliminar partido?')) { 
            await api.deleteMatch(id); 
            loadMatches(); 
            updateDashboardStats();
        }
    },

    // TICKETS
    openReply: (id) => {
        const r = cache.requests.find(x => x.request_id === id);
        if (!r) return;
        document.getElementById('response_id').value = id;
        document.getElementById('requestMessage').innerText = `"${r.message}"`;
        document.getElementById('response_msg').value = '';
        toggleModal('modalResponse', true);
    }
};

// Exponer toggleModal para botones de cerrar
window.toggleModal = toggleModal;
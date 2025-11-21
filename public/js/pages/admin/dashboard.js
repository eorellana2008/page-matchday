document.addEventListener('DOMContentLoaded', () => {
    // Lógica de Permisos Visuales (Moderador)
    const role = sessionStorage.getItem('userRole');
    
    if (role === 'moderator') {
        // Ocultar botones de pestañas prohibidas
        const btnUsers = document.getElementById('tab-btn-users');
        const btnRequests = document.getElementById('tab-btn-requests');
        
        if (btnUsers) btnUsers.style.display = 'none';
        if (btnRequests) btnRequests.style.display = 'none';
        
        // Eliminar el contenido del DOM para seguridad visual
        const tabUsers = document.getElementById('tab-users');
        const tabRequests = document.getElementById('tab-requests');
        
        if (tabUsers) tabUsers.remove();
        if (tabRequests) tabRequests.remove();

        // Forzar la pestaña de Partidos como la activa
        if (window.switchTab) {
            window.switchTab('matches');
        }
        
        // Asegurar visualmente que el botón de partidos esté activo
        const btnMatches = document.getElementById('tab-btn-matches');
        if (btnMatches) btnMatches.classList.add('active');
    }
});
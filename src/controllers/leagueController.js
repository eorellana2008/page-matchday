const League = require('../models/League')

// Helper para generar código aleatorio (6 caracteres mayúsculas/números)
const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

const leagueController = {
    // CREAR LIGA
    createLeague: async (req, res) => {
        const userId = req.user.userId;
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: 'La liga necesita un nombre.' });

        try {
            let code = generateCode();

            const leagueId = await League.create(name, code, userId);

            // Unir al creador automáticamente como miembro
            await League.addMember(leagueId, userId);

            res.status(201).json({ message: 'Liga creada con éxito.', code: code });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la liga.' });
        }
    },

    // UNIRSE A LIGA
    joinLeague: async (req, res) => {
        const userId = req.user.userId;
        const { code } = req.body;

        if (!code) return res.status(400).json({ error: 'Falta el código de invitación.' });

        try {
            // Buscar liga
            const league = await League.findByCode(code.toUpperCase());
            if (!league) return res.status(404).json({ error: 'Código inválido. No existe esa liga.' });

            const isMember = await League.isMember(league.league_id, userId);
            if (isMember) return res.status(409).json({ error: 'Ya perteneces a esta liga.' });

            await League.addMember(league.league_id, userId);

            res.json({ message: `¡Te has unido a "${league.name}"!` });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al unirse a la liga.' });
        }
    },

    // VER MIS LIGAS
    getMyLeagues: async (req, res) => {
        const userId = req.user.userId;
        try {
            const leagues = await League.getMyLeagues(userId);
            res.json(leagues);
        } catch (error) {
            res.status(500).json({ error: 'Error al cargar ligas.' });
        }
    },

    // VER DETALLES Y RANKING DE UNA LIGA
    getLeagueDetails: async (req, res) => {
        const userId = req.user.userId;
        const { id } = req.params;

        try {
            const isMember = await League.isMember(id, userId);
            if (!isMember) return res.status(403).json({ error: 'No perteneces a esta liga.' });

            const ranking = await League.getLeagueRanking(id);

            res.json(ranking);

        } catch (error) {
            res.status(500).json({ error: 'Error al cargar la liga.' });
        }
    },

    // SALIR DE LIGA
    leaveLeague: async (req, res) => {
        const userId = req.user.userId;
        const { id } = req.params;

        try {
            // Verificar si es el dueño (El dueño NO puede salirse, debe borrarla)
            const league = await League.getAdmin(id);
            if (!league) return res.status(404).json({ error: 'Liga no encontrada.' });

            if (league.admin_id === userId) {
                return res.status(400).json({ error: 'Eres el administrador. No puedes salirte, debes eliminar la liga.' });
            }

            await League.leave(id, userId);
            res.json({ message: 'Te has salido de la liga.' });

        } catch (error) {
            res.status(500).json({ error: 'Error al salir de la liga.' });
        }
    },

    // ELIMINAR LIGA (Solo Admin)
    deleteLeague: async (req, res) => {
        const userId = req.user.userId;
        const { id } = req.params;

        try {
            const league = await League.getAdmin(id);
            if (!league) return res.status(404).json({ error: 'Liga no encontrada.' });

            if (league.admin_id !== userId) {
                return res.status(403).json({ error: 'No tienes permiso para eliminar esta liga.' });
            }

            await League.delete(id);
            res.json({ message: 'Liga eliminada correctamente.' });

        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la liga.' });
        }
    }
};


module.exports = leagueController;
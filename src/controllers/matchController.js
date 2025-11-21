const Match = require('../models/Match');
const Prediction = require('../models/Prediction');

// OBTENER TODOS
const getMatches = async (req, res) => {
    try {
        const matches = await Match.getAll();
        res.json(matches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener partidos' });
    }
};

// CREAR (Admin)
const createMatch = async (req, res) => {
    const { team_home, team_away, match_date } = req.body;
    if (!team_home || !team_away || !match_date) return res.status(400).json({ error: 'Faltan datos' });

    try {
        await Match.create({ team_home, team_away, match_date });
        res.status(201).json({ message: 'Partido creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear partido' });
    }
};

// EDITAR DATOS (Admin)
const updateMatchDetails = async (req, res) => {
    const { id } = req.params;
    const { team_home, team_away, match_date } = req.body;
    try {
        await Match.updateDetails(id, { team_home, team_away, match_date });
        res.json({ message: 'Datos actualizados' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
};

// ELIMINAR (Admin)
const deleteMatch = async (req, res) => {
    const { id } = req.params;
    try {
        await Match.delete(id);
        res.json({ message: 'Partido eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
};

// ACTUALIZAR RESULTADO Y CALCULAR PUNTOS
const updateMatchScore = async (req, res) => {
    const { id } = req.params;
    const score_home = parseInt(req.body.score_home);
    const score_away = parseInt(req.body.score_away);

    try {
        // Actualizar el partido en DB
        await Match.updateScore(id, score_home, score_away);

        // Obtener predicciones para este partido
        const preds = await Prediction.getByMatch(id);

        // Calcular puntos
        const updates = preds.map(async (p) => {
            let puntos = 0;
            const predHome = parseInt(p.pred_home);
            const predAway = parseInt(p.pred_away);

            // Marcador Exacto (3 pts)
            if (predHome === score_home && predAway === score_away) {
                puntos = 3;
            } 
            // Acertar Ganador o Empate (1 pt)
            else {
                const realWinner = Math.sign(score_home - score_away);
                const predWinner = Math.sign(predHome - predAway);

                if (realWinner === predWinner) {
                    puntos = 1;
                }
            }

            // Guardar puntos usando el Modelo
            await Prediction.updatePoints(p.prediction_id, puntos);
        });

        await Promise.all(updates);
        
        res.json({ message: 'Marcador actualizado y puntos repartidos.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar resultados' });
    }
};

module.exports = { getMatches, createMatch, updateMatchDetails, deleteMatch, updateMatchScore };
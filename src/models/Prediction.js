const pool = require('../../db/connection');

const Prediction = {
    // Guardar o Actualizar una predicción (Upsert)
    save: async (userId, matchId, predHome, predAway) => {
        const query = `
            INSERT INTO predictions (user_id, match_id, pred_home, pred_away)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE pred_home = VALUES(pred_home), pred_away = VALUES(pred_away)
        `;
        return await pool.query(query, [userId, matchId, predHome, predAway]);
    },

    // Obtener todas las predicciones de un usuario
    getByUser: async (userId) => {
        const [rows] = await pool.query('SELECT * FROM predictions WHERE user_id = ?', [userId]);
        return rows;
    },

    getByMatch: async (matchId) => {
        const [rows] = await pool.query('SELECT * FROM predictions WHERE match_id = ?', [matchId]);
        return rows;
    },

    updatePoints: async (predictionId, points) => {
        return await pool.query('UPDATE predictions SET points = ? WHERE prediction_id = ?', [points, predictionId]);
    },
    getHistory: async (userId) => {
        const query = `
            SELECT 
                p.pred_home, p.pred_away, p.points,
                m.team_home, m.team_away, m.score_home, m.score_away, m.match_date
            FROM predictions p
            JOIN matches m ON p.match_id = m.match_id
            WHERE p.user_id = ? AND m.status = 'finished'
            ORDER BY m.match_date DESC
        `;
        const [rows] = await pool.query(query, [userId]);
        return rows;
    }
};

module.exports = Prediction;
const express = require('express');
const router = express.Router();
const { savePrediction, getMyPredictions, getHistory} = require('../controllers/predictionController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, savePrediction); // Guardar
router.get('/my', verifyToken, getMyPredictions); // Ver mis apuestas
router.get('/history', verifyToken, getHistory); // Nueva ruta

module.exports = router;
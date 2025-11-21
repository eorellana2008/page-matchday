const express = require('express');
const router = express.Router();
const { savePrediction, getMyPredictions, getHistory} = require('../controllers/predictionController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, savePrediction); 
router.get('/my', verifyToken, getMyPredictions);
router.get('/history', verifyToken, getHistory); 

module.exports = router;
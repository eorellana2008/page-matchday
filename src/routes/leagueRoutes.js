const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const leagueController = require('../controllers/leagueController');

router.post('/create', verifyToken, leagueController.createLeague);
router.post('/join', verifyToken, leagueController.joinLeague);    
router.get('/my', verifyToken, leagueController.getMyLeagues);
router.get('/:id', verifyToken, leagueController.getLeagueDetails);
router.delete('/:id/leave', verifyToken, leagueController.leaveLeague);
router.delete('/:id', verifyToken, leagueController.deleteLeague);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllTournaments, addTournament } = require('../controllers/tournament.controller');

router.get('/', getAllTournaments);
router.post('/', addTournament);

module.exports = router;

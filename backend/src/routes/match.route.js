const express = require('express');
const router = express.Router();
const { getAllMatches, addMatch, updateResult, deleteMatch} = require('../controllers/match.controller');

router.get('/', getAllMatches);
router.post('/create', addMatch);
router.put('/:id/result', updateResult);
router.delete('/:id', deleteMatch); 

module.exports = router;

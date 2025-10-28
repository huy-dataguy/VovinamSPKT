const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdminToken');
const { getAllMatches, addMatch, updateResult, deleteMatch} = require('../controllers/match.controller');

router.get('/', getAllMatches);
router.post('/create', addMatch);
router.put('/:id/result', updateResult);
router.delete('/:id', verifyAdmin, deleteMatch); 

module.exports = router;

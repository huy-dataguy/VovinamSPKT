const express = require("express");
const router = express.Router();
const { createFighter, getFighters } = require("../controllers/fighter.controller");

// Đăng ký võ sinh
router.post("/register", createFighter);

// Lấy danh sách võ sinh
router.get("/fighters", getFighters);

module.exports = router;

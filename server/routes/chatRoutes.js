const express = require("express");

const router = express.Router();

const { chatWithAI } = require("../controllers/chatController");


// Chat Route
router.post("/", chatWithAI);


module.exports = router;
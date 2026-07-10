const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller");

router.post("/:conversationId", chatController.search);

module.exports = router;
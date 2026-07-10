const express = require("express");
const router = express.Router();

const controller = require("../controllers/conversation.controller");

router.get("/", controller.getConversations);

router.post("/", controller.createConversation);

module.exports = router;
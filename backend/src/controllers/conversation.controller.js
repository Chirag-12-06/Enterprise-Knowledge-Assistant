const Conversation = require("../models/Conversation");

exports.createConversation = async (req, res) => {
  console.log("Request received");
  try {
    console.log("Creating...");
    const conversation = await Conversation.create({});
    console.log("Created");
    return res.status(201).json(conversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load messages",
    });
  }
};
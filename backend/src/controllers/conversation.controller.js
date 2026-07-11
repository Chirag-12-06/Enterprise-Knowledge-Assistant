const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({});
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
      message: "Failed to fetch messages",
    });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    await Conversation.findByIdAndDelete(conversationId);

    await Message.deleteMany({
      conversationId,
    });

    res.json({
      message: "Conversation deleted",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};

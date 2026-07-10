const chatService = require("../services/chat.service");

exports.search = async (req, res) => {
    try {
        const { question } = req.body;
        const { conversationId } = req.params;

        if (!question) {
            return res.status(400).json({
                message: "Question is required",
            });
        }

        const result = await chatService.search(question, conversationId);

        res.json(result);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Search failed",
        });
    }
};
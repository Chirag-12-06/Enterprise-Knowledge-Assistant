const chatService = require("../services/chat.service");

exports.search = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Question is required",
            });
        }

        const results = await chatService.search(question);

        res.json({
            question,
            results,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Search failed",
        });
    }
};
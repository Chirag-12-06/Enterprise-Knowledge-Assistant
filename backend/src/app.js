const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/upload.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "RAG API Running",
  });
});

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

module.exports = app;

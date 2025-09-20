const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/download", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing url");

  try {
    const resp = await axios.get(url, { responseType: "stream" });

    res.setHeader("Content-Type", resp.headers["content-type"] || "video/mp4");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="youtube-${Date.now()}.mp4"`
    );
    resp.data.pipe(res);
  } catch (e) {
    console.error("Server error:", e.message);
    res.status(500).send("Failed to fetch video");
  }
});



// for instagram
app.get("/api/downloads", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing url");

  try {
    const resp = await axios.get(url, { responseType: "stream" });

    res.setHeader("Content-Type", resp.headers["content-type"] || "video/mp4");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="instagram-${Date.now()}.mp4"`
    );

    resp.data.pipe(res);
  } catch (e) {
    console.error("Server error:", e.message);
    res.status(500).send("Failed to fetch video");
  }
});

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

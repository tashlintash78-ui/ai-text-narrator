const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getNarration = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(text);
    const response = await result.response;
    const narration = response.text();

    return res.json({
      narration
    });

  } catch (error) {
    console.log("ERROR:", error.message);

    // Better debugging
    if (error.message?.includes("429")) {
      return res.status(429).json({
        error: "Rate limit hit (too many requests). Wait and retry."
      });
    }

    if (error.message?.includes("API_KEY")) {
      return res.status(500).json({
        error: "Invalid or missing API key"
      });
    }

    return res.status(500).json({
      error: "AI service failed. Check logs."
    });
  }
};

module.exports = { getNarration };
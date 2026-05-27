const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY
);

const getNarration = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text required"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const result = await model.generateContent(text);

    const response = result.response.text();

    res.json({
      narration: response
    });

  } catch (error) {

    // 👇 REPLACE YOUR OLD CATCH WITH THIS
    console.log(error);

    if (error.message.includes("429")) {
      return res.status(429).json({
        error: "AI service temporarily busy. Try again in a minute."
      });
    }

    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

module.exports = { getNarration };
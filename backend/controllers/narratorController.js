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
  console.log("FULL ERROR:", error);
  console.log("MESSAGE:", error.message);
  console.log("STACK:", error.stack);

  return res.status(500).json({
    error: error.message
  });
}
}
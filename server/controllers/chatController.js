const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini API initialize
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// Gemini Model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});


// Chat Controller
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await model.generateContent(message);

    const reply = result.response.text();

    res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {

    console.log("========== GEMINI ERROR ==========");
    console.log(error);
    console.log("==================================");

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Export
module.exports = {
  chatWithAI,
};
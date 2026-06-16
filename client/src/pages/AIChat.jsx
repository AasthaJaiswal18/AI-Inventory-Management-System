import { useState } from "react";
import API from "../services/api";

function AIChat() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Send message to Gemini AI
  const sendMessage = async () => {

    if (!message.trim()) {
      return;
    }

    try {

      setLoading(true);

      const response = await API.post("/chat", {
        message: message,
      });

      setReply(response.data.reply);

    } catch (error) {

      console.log("AI Error:", error);

      setReply("❌ AI failed to respond");

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        🤖 Gemini AI Assistant
      </h1>


      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl">


        <textarea
          rows="4"
          placeholder="Ask anything about inventory..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-3 rounded-lg outline-none"
        />


        <button
          onClick={sendMessage}
          className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Thinking..." : "Send"}
        </button>


        {reply && (

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">

            <h2 className="font-bold mb-2">
              🤖 AI Reply:
            </h2>

            <p className="text-gray-700 whitespace-pre-line">
              {reply}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIChat;
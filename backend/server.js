// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post("/api/chat", async (req, res) => {
//     const userMessage = req.body.message;
//     const apiKey = process.env.API_KEY;

//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//     try {
//         const response = await fetch(apiUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 contents: [
//                     {
//                         parts: [{ text: userMessage }],
//                     },
//                 ],
//             }),
//         });

//         const data = await response.json();

//         if (!data.candidates?.length || !data.candidates[0].content?.parts?.length) {
//             throw new Error("Invalid response from Gemini API");
//         }

//         const reply = data.candidates[0].content.parts[0].text.trim();
//         res.json({ reply });
//     } catch (error) {
//         console.error("Error from Gemini API:", error);
//         res.status(500).json({ reply: "Sorry, something went wrong." });
//     }
// });


// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
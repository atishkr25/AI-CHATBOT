let chatbotInput, chatbotMsgBody;

document.addEventListener("DOMContentLoaded", function () {
    const chatbotIcon = document.querySelector("#chatbot-icon");
    const chatbotContainer = document.querySelector("#chatbot-container");
    const closeBtn = document.querySelector("#close-btn");
    const sendBtn = document.querySelector("#send-btn");

    chatbotMsgBody = document.querySelector("#chatbot-messages");
    chatbotInput = document.querySelector("#chatbot-input");

    chatbotIcon.addEventListener('click', () => {
        chatbotContainer.classList.toggle("hidden");
        chatbotContainer.style.display = chatbotContainer.classList.contains("hidden") ? "none" : "flex";
        chatbotIcon.classList.add("hidden");
    });

    closeBtn.addEventListener('click', () => {
        chatbotContainer.classList.add("hidden");
        chatbotContainer.style.display = "none";
        chatbotIcon.classList.remove("hidden");
    });

    sendBtn.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
        appendMessage('user', userMessage);
        chatbotInput.value = "";
        getChatBotReply(userMessage);
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatbotMsgBody.appendChild(messageElement);

    messageElement.scrollIntoView({ behavior: "smooth", block: "end" });
}

async function getChatBotReply(userMessage) {
    const apiKey = "AIzaSyDwxEl6C7mv_lp6s1OKkoYt-bo1dLqDnms";
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: userMessage }],
                    },
                ],
            }),
        });

        const data = await response.json();
        console.log("API response:", data);

        if (data.error && data.error.code === 429) {
            appendMessage("bot", "You've hit the usage limit. Please come here after some time");
            return;
        }

        if (
            !data.candidates ||
            !data.candidates.length ||
            !data.candidates[0].content ||
            !data.candidates[0].content.parts
        ) {
            throw new Error("Invalid response from Gemini API");
        }

        const botMessage = data.candidates[0].content.parts[0].text.trim();
        appendMessage("bot", botMessage);

    } catch (error) {
        console.error("Error:", error);
        appendMessage(
            "bot",
            "Sorry, I'm having trouble responding. Please try again."
        );
    }
}



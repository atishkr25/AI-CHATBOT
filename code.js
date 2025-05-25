let Chatbot_Input, Chatbot_Msg_Body;

document.addEventListener("DOMContentLoaded", function () {
    const Chatbot_Icon = document.querySelector("#chatbot-icon");
    const Chatbot_Container = document.querySelector("#chatbot-container");
    const Close_Btn = document.querySelector("#close-btn");
    const Send_Btn = document.querySelector("#send-btn");

    Chatbot_Msg_Body = document.querySelector("#chatbot-messages");
    Chatbot_Input = document.querySelector("#chatbot-input");

    Chatbot_Icon.addEventListener('click', () => {
        Chatbot_Container.classList.toggle("hidden");
        Chatbot_Container.style.display = Chatbot_Container.classList.contains("hidden") ? "none" : "flex";
        Chatbot_Icon.classList.add("hidden");
    });

    Close_Btn.addEventListener('click', () => {
        Chatbot_Container.classList.add("hidden");
        Chatbot_Container.style.display = "none";
        Chatbot_Icon.classList.remove("hidden");
    });

    Send_Btn.addEventListener('click', sendMassege);
    Chatbot_Input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMassege();
    });
});

function sendMassege() {
    const userMassege = Chatbot_Input.value.trim();
    if (userMassege) {
        appenMassege('user', userMassege);
        Chatbot_Input.value = "";
        getChatBotReply(userMassege);
    }
}

function appenMassege(sender, massege) {
    const massageElement = document.createElement('div');
    massageElement.classList.add('message', sender);
    massageElement.textContent = massege;
    Chatbot_Msg_Body.appendChild(massageElement);
    massageElement.scrollIntoView({ behavior: "smooth", block: "end" });
}

async function getChatBotReply(userMessage) {
    try {
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        if (!data.reply) {
            throw new Error("No reply from server");
        }

        appenMassege("bot", data.reply);
    } catch (error) {
        console.error("Error:", error);
        appenMassege(
            "bot",
            "Sorry, I'm having trouble responding. Please try again."
        );
    }
}

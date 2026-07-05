// State State variables
let currentPersona = "hc";

// Dynamic memory for conversations
const conversations = {
  hc: [
    {
      sender: "persona",
      text: "Hanji, Chai ready hai meri, aur aapki? ☕️",
    },
  ],
  piyush: [
    {
      sender: "persona",
      text: "Yo! What’s up? Let’s design something completely production-ready today. Thinking of scaling Node.js, Docker, or absolute WebRTC magic? 🚀",
    },
  ],
};

// System Configurations per Persona
const configurations = {
  hc: {
    name: "Hitesh Choudhary",
    gradient: "from-amber-500 to-orange-600",
    accent: "indigo",
    placeholder: "Ask Hitesh about System Design, JavaScript or Chai...",
    status:
      "<span class='w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse'></span> Chai aur Code Mode Active",
  },
  piyush: {
    name: "Piyush Garg",
    gradient: "from-cyan-500 to-blue-600",
    accent: "cyan",
    placeholder: "Ask Piyush about AWS, Docker, Next.js or Scaling...",
    status:
      "<span class='w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse'></span> Architecture Room Active",
  },
};

// DOM elements
const chatHistory = document.getElementById("chat-history");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const typingIndicator = document.getElementById("typing-indicator");
const typingText = document.getElementById("typing-text");
const activeAvatar = document.getElementById("active-avatar");
const activeName = document.getElementById("active-name");
const activeStatus = document.getElementById("active-status");
const sendBtn = document.getElementById("send-btn");

// Initial setup on boot
window.onload = () => {
  renderMessages();
};

// Switch active conversation persona view
function switchPersona(personaId) {
  if (currentPersona === personaId) return;

  currentPersona = personaId;
  const config = configurations[personaId];

  // Update UI Sidebar Buttons styling
  document.querySelectorAll("#persona-list button").forEach((btn) => {
    btn.classList.remove(
      "border-indigo-500/30",
      "bg-indigo-500/10",
      "border-cyan-500/30",
      "bg-cyan-500/10",
      "shadow-lg",
    );
    btn.classList.add("border-transparent", "hover:bg-slate-800/40");
    btn.querySelector("h3").className = "font-semibold text-sm text-slate-300";
  });

  const activeBtn = document.getElementById(`btn-${personaId}`);
  activeBtn.classList.remove("border-transparent", "hover:bg-slate-800/40");
  activeBtn.classList.add(
    `border-${config.accent}-500/30`,
    `bg-${config.accent}-500/10`,
    "shadow-lg",
  );
  activeBtn.querySelector("h3").className = `font-semibold text-sm text-white`;

  // Transform top Header bar elements with smooth classes
  activeAvatar.className = `w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold transition-all duration-300`;
  activeAvatar.innerText = personaId === "hc" ? "HC" : "PG";
  activeName.innerText = config.name;
  activeStatus.innerHTML = config.status;

  // Switch button themes dynamically
  sendBtn.className = `h-12 w-12 rounded-2xl bg-${config.accent}-600 hover:bg-${config.accent}-500 flex items-center justify-center text-white font-medium transition-all shadow-lg active:scale-95 shrink-0`;
  messageInput.placeholder = config.placeholder;
  messageInput.className = `w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-11 pr-12 py-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-${config.accent}-500 focus:ring-1 focus:ring-${config.accent}-500/30 transition-all`;

  // Flush out visual chat logs and render current selection
  renderMessages();
}

// Render function dynamically updating active chat viewport
function renderMessages() {
  chatHistory.innerHTML = "";
  const history = conversations[currentPersona];
  const config = configurations[currentPersona];

  history.forEach((msg) => {
    const isUser = msg.sender === "user";
    const wrapper = document.createElement("div");
    wrapper.className = `flex w-full items-end gap-2 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""} animate-[fadeIn_0.2s_ease-out]`;

    // Avatar bubble setup
    let avatarHTML = "";
    if (!isUser) {
      avatarHTML = `<div class="w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-md">${currentPersona === "hc" ? "HC" : "PG"}</div>`;
    } else {
      avatarHTML = `<div class="w-7 h-7 rounded-lg bg-slate-700 text-slate-200 text-[10px] flex items-center justify-center shrink-0 font-semibold"><i class="fa-solid fa-user"></i></div>`;
    }

    // Message bubble layout setup
    const bubble = document.createElement("div");
    bubble.className = `p-3.5 rounded-2xl text-sm leading-relaxed ${
      isUser
        ? `bg-${config.accent}-600 text-white rounded-br-none font-medium`
        : "bg-slate-900/90 text-slate-200 border border-slate-800/80 rounded-bl-none"
    }`;
    bubble.innerText = msg.text;

    wrapper.innerHTML = avatarHTML;
    wrapper.appendChild(bubble);
    chatHistory.appendChild(wrapper);
  });

  // Smooth scrolling container offset alignment
  chatHistory.scrollTo({
    top: chatHistory.scrollHeight,
    behavior: "smooth",
  });
}

// Intercept message pipelines and talk to the backend
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  const baseURL = "http://localhost:3000/persona";
  const apiRouteParam = currentPersona === "piyush" ? "pg" : currentPersona;
  if (!text) return;

  // 1. Log and render User's query node
  conversations[currentPersona].push({ sender: "user", text: text });
  document.getElementById(`preview-${currentPersona}`).innerText =
    `You: ${text}`;
  messageInput.value = "";
  renderMessages();

  // 2. Trigger dynamic visual typing sequence
  showTypingIndicator();

  // 3. Actual Backend Fetch API Pipeline
  try {
    // Change URL route '/api/chat' to match your actual backend configuration (e.g., 'http://localhost:5000/chat')
    const response = await fetch(`${baseURL}/${apiRouteParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: text,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response failure");
    }

    const data = await response.json();

    // Assumes backend returns structure like: { reply: "Your text here" }
    const backendReply = data.response || "No structured response received.";

    conversations[currentPersona].push({
      sender: "persona",
      text: backendReply,
    });
    document.getElementById(`preview-${currentPersona}`).innerText =
      backendReply;
  } catch (error) {
    console.error("Backend Error:", error);

    // Provide user feedback inside the chat context if the backend request fails
    conversations[currentPersona].push({
      sender: "persona",
      text: "❌ Failed to reach the system backend. Is the server running?",
    });
  } finally {
    hideTypingIndicator();
    renderMessages();
  }
});

function showTypingIndicator() {
  typingText.innerText = `${configurations[currentPersona].name} is typing`;
  typingIndicator.classList.remove("hidden");
  chatHistory.scrollTo({
    top: chatHistory.scrollHeight,
    behavior: "smooth",
  });
}

function hideTypingIndicator() {
  typingIndicator.classList.add("hidden");
}

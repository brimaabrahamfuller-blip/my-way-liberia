document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const persona = localStorage.getItem('quiz_result') || 'Explorer';

    chatBox.innerHTML = `
        <div class="chat-messages" id="chat-messages">
            <div class="message ai-message">
                👋 Hello! I'm your Myway AI Coach. Based on your <strong>${persona}</strong> persona, I'm here to help with CV reviews, interview prep, and career guidance. What can I help you with today?
            </div>
        </div>
        <form class="chat-input-area" id="chat-form">
            <input type="text" id="chat-input" placeholder="Ask about jobs, skills, or interviews..." required>
            <button type="submit">Send</button>
        </form>
    `;

    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = input.value;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message';
        userMsg.textContent = userText;
        messages.appendChild(userMsg);
        
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'message ai-message';
            aiMsg.textContent = getAIResponse(userText, persona);
            messages.appendChild(aiMsg);
            messages.scrollTop = messages.scrollHeight;
        }, 600);
    });

    function getAIResponse(text, persona) {
        const lower = text.toLowerCase();
        
        if (lower.includes('cv') || lower.includes('resume')) {
            return `💼 As a ${persona}, focus on highlighting achievements rather than just duties. For Liberia market, emphasize local experience and adaptability.`;
        }
        if (lower.includes('interview')) {
            return `🎤 Interview tip: Research the company's Liberian operations. Practice storytelling using the STAR method (Situation, Task, Action, Result).`;
        }
        if (lower.includes('job') || lower.includes('career')) {
            return `🚀 Great question! For ${persona}s, roles in tech, NGOs, and entrepreneurship are growing fast in Monrovia. Keep learning new skills.`;
        }
        if (lower.includes('salary') || lower.includes('pay')) {
            return `💰 Entry-level roles in Liberia average $400-800/month. Negotiate confidently based on your skills and market demand.`;
        }
        return `Thanks for asking! As a ${persona}, you have unique strengths. Keep developing your skills and stay connected with mentors. What else can I help with?`;
    }
});

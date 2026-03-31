document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.chat-container');
  container.innerHTML = `
    <div class="chat-messages" id="chat-messages">
      <div class="message ai-message">Hello! This is Myway messaging hub. Feature coming soon.</div>
    </div>
    <div class="chat-input-area">
      <input type="text" placeholder="Type message..." disabled>
      <button disabled>Send</button>
    </div>
  `;
});
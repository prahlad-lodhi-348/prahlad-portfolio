const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotModal = document.getElementById('chatbot-modal');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const openAiKeyInput = document.getElementById('openai-key');

const KEY_STORAGE = 'prahlad-openai-key';

const storedKey = localStorage.getItem(KEY_STORAGE);
if (storedKey && openAiKeyInput) {
  openAiKeyInput.value = storedKey;
}

function toggleChatbot(forceState) {
  if (!chatbotModal) return;
  const shouldShow = typeof forceState === 'boolean' ? forceState : chatbotModal.classList.contains('hidden');
  chatbotModal.classList.toggle('hidden', !shouldShow);
}

function appendMessage(role, text) {
  const bubble = document.createElement('div');
  bubble.className = `p-3 rounded-2xl text-sm ${role === 'user' ? 'bg-indigo-500/30 self-end ml-10 text-white' : 'bg-white/10 mr-10 text-slate-200'}`;
  bubble.textContent = text;
  chatbotBody?.appendChild(bubble);
  chatbotBody?.scrollTo({ top: chatbotBody.scrollHeight, behavior: 'smooth' });
}

async function sendChatMessage() {
  const key = openAiKeyInput?.value?.trim();
  const message = chatbotInput?.value?.trim();

  if (!key) {
    appendMessage('assistant', 'Add your OpenAI API key first. Stored only locally.');
    return;
  }

  if (!message) return;

  localStorage.setItem(KEY_STORAGE, key);
  appendMessage('user', message);
  chatbotInput.value = '';
  appendMessage('assistant', 'Thinking...');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a concise tech career assistant helping recruiters understand Prahlad Singh portfolio.' },
          { role: 'user', content: message }
        ],
        temperature: 0.4
      })
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'No response';

    chatbotBody.removeChild(chatbotBody.lastChild);
    appendMessage('assistant', reply);
  } catch (error) {
    chatbotBody.removeChild(chatbotBody.lastChild);
    appendMessage('assistant', 'API request failed. Check key or network and try again.');
    console.error(error);
  }
}

chatbotToggle?.addEventListener('click', () => toggleChatbot(true));
chatbotClose?.addEventListener('click', () => toggleChatbot(false));
chatbotSend?.addEventListener('click', sendChatMessage);
chatbotInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sendChatMessage();
});




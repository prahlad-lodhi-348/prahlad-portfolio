const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const cursorGlow = document.getElementById('cursor-glow');
const progressBar = document.getElementById('progress-bar');
const voiceButton = document.getElementById('voice-resume');
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');
const yearSpan = document.getElementById('year');

// Loading progress bar
let progress = 0;
const progressInterval = setInterval(() => {
  progress += (100 - progress) * 0.1;
  progressBar.style.transform = `scaleX(${progress / 100})`;
  if (progress > 99.5) {
    clearInterval(progressInterval);
    setTimeout(() => progressBar.style.opacity = '0', 300);
  }
}, 100);

// Theme persistence
const savedTheme = localStorage.getItem('prahlad-theme');
if (savedTheme === 'light') {
  body.classList.add('light');
} else {
  body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
  const mode = body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('prahlad-theme', mode);
});

// Typing effect
const phrases = [
  'Fullstack Developer',
  'DSA Enthusiast',
  'AI Explorer',
  'Open Source Contributor'
];
const typingTarget = document.querySelector('.typing-effect');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingTarget) return;
  const currentPhrase = phrases[phraseIndex];
  const displayed = deleting
    ? currentPhrase.substring(0, charIndex--)
    : currentPhrase.substring(0, charIndex++);
  typingTarget.textContent = displayed;

  if (!deleting && charIndex > currentPhrase.length) {
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  const delay = deleting ? 60 : 120;
  setTimeout(typeLoop, delay);
}
typeLoop();

// Mouse glow follower
window.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

// Voice resume using Web Speech API
voiceButton?.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }
  const text = `Namaste, main Prahlad Singh, RGPV Bhopal ka Computer Science student aur full stack developer hoon. 
  Django aur React stack se production grade apps banata hoon, AI automations aur DSA visualizers meri specialties hain.
  Let's build something amazing together!`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN';
  utterance.rate = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
});

// Contact form validation
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const isValid = [...formData.values()].every(value => value.trim().length > 2);
  if (!isValid) {
    contactFeedback.textContent = 'Please fill all fields with valid info.';
    contactFeedback.classList.remove('text-emerald-400');
    contactFeedback.classList.add('text-red-400');
    contactFeedback.classList.remove('hidden');
    return;
  }
  contactFeedback.textContent = 'Message sent! I will reach out soon 🚀';
  contactFeedback.classList.remove('text-red-400');
  contactFeedback.classList.add('text-emerald-400');
  contactFeedback.classList.remove('hidden');
  contactForm.reset();
});

// Skills radar chart
const radarCtx = document.getElementById('skills-radar');
if (radarCtx) {
  new Chart(radarCtx, {
    type: 'radar',
    data: {
      labels: ['Django', 'React', 'DSA', 'AI', 'DevOps', 'Product'],
      datasets: [{
        label: 'Expertise',
        data: [95, 92, 88, 84, 80, 90],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.25)',
        borderWidth: 2,
        pointBackgroundColor: '#ec4899'
      }]
    },
    options: {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          angleLines: { color: 'rgba(255,255,255,0.2)' },
          grid: { color: 'rgba(255,255,255,0.1)' },
          pointLabels: {
            color: '#e2e8f0',
            font: { family: 'Inter' }
          },
          ticks: { display: false }
        }
      }
    }
  });
}

// AOS init
AOS.init({
  duration: 1000,
  once: false,
  offset: 100
});

// Footer year
yearSpan.textContent = new Date().getFullYear();

// Service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.error);
  });
}


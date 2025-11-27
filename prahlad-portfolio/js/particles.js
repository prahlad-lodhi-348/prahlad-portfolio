document.addEventListener('DOMContentLoaded', () => {
  if (window.particlesJS) {
    particlesJS('particles-canvas', {
      particles: {
        number: { value: 65, density: { enable: true, value_area: 900 } },
        color: { value: ['#6366f1', '#ec4899', '#10b981'] },
        shape: { type: 'circle' },
        opacity: { value: 0.45 },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.2,
          width: 1
        },
        move: { enable: true, speed: 1.8, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 200, line_linked: { opacity: 0.35 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
});




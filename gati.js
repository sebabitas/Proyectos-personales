// ===== BACKGROUND FLOATING PAWS =====
const bgPaws = document.getElementById('bgPaws');

if (bgPaws) {
  const pawEmojis = ['🐾', '🐾', '🐱', '😸'];

  for (let i = 0; i < 18; i++) {
    const paw = document.createElement('div');

    paw.className = 'bg-paw';
    paw.textContent = pawEmojis[Math.floor(Math.random() * pawEmojis.length)];

    paw.style.left = Math.random() * 100 + 'vw';
    paw.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
    paw.style.animationDuration = (15 + Math.random() * 20) + 's';
    paw.style.animationDelay = -(Math.random() * 20) + 's';

    bgPaws.appendChild(paw);
  }
}

// ===== BOTÓN "NO TE AMO" =====
const noBtn = document.getElementById('noBtn');

let noBtnX = 0;
let noBtnY = 0;
let ready = false;

function initNoBtn() {

  if (!noBtn) return;

  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  // En celulares no hacemos que huya
  if (isMobile) {
    noBtn.style.position = 'static';
    noBtn.style.left = '';
    noBtn.style.top = '';
    ready = false;
    return;
  }

  const rect = noBtn.getBoundingClientRect();

  noBtnX = rect.left;
  noBtnY = rect.top;

  noBtn.style.position = 'fixed';
  noBtn.style.zIndex = '999';
  noBtn.style.margin = '0';
  noBtn.style.transition = 'none';
  noBtn.style.left = noBtnX + 'px';
  noBtn.style.top = noBtnY + 'px';

  ready = true;
}

// Inicialización
if (document.readyState === 'complete') {
  initNoBtn();
} else {

  window.addEventListener('load', initNoBtn);

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initNoBtn, 100);
  });

}

function escapar(mouseX, mouseY) {

  if (!ready || !noBtn) return;

  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const btnCX = noBtnX + btnW / 2;
  const btnCY = noBtnY + btnH / 2;

  let dx = btnCX - mouseX;
  let dy = btnCY - mouseY;

  const dist = Math.sqrt(dx * dx + dy * dy) || 1;

  const fuerza = Math.max(
    100,
    Math.min(350, 10000 / dist)
  );

  let newX = noBtnX + (dx / dist) * fuerza;
  let newY = noBtnY + (dy / dist) * fuerza;

  const maxX = window.innerWidth - btnW - 10;
  const maxY = window.innerHeight - btnH - 10;

  newX = Math.max(10, Math.min(maxX, newX));
  newY = Math.max(10, Math.min(maxY, newY));

  noBtnX = newX;
  noBtnY = newY;

  noBtn.style.transition = 'left 0.2s ease, top 0.2s ease';
  noBtn.style.left = noBtnX + 'px';
  noBtn.style.top = noBtnY + 'px';
}

if (noBtn) {

  noBtn.addEventListener('mouseenter', function (e) {
    escapar(e.clientX, e.clientY);
  });

}

document.addEventListener('mousemove', function (e) {

  if (!ready || !noBtn) return;

  const btnCX = noBtnX + noBtn.offsetWidth / 2;
  const btnCY = noBtnY + noBtn.offsetHeight / 2;

  const dist = Math.sqrt(
    Math.pow(e.clientX - btnCX, 2) +
    Math.pow(e.clientY - btnCY, 2)
  );

  if (dist < 130) {
    escapar(e.clientX, e.clientY);
  }

});

// ===== BOTÓN "SÍ TE AMO" =====
function yesPressed() {

  const overlay = document.getElementById('successOverlay');

  if (overlay) {
    overlay.classList.add('show');
  }

  const colors = [
    '#FF4D6D',
    '#FF7B9C',
    '#FFD700',
    '#FF9500',
    '#7BC67E',
    '#64B5F6',
    '#BA68C8',
    '#FFB74D'
  ];

  for (let i = 0; i < 150; i++) {

    setTimeout(() => {

      const piece = document.createElement('div');

      piece.className = 'confetti-piece';

      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.top = '-20px';

      piece.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      piece.style.width =
        (8 + Math.random() * 10) + 'px';

      piece.style.height =
        (8 + Math.random() * 10) + 'px';

      piece.style.borderRadius =
        Math.random() > 0.5 ? '50%' : '3px';

      piece.style.animationDuration =
        (1.5 + Math.random() * 2.5) + 's';

      piece.style.animationDelay =
        Math.random() * 0.5 + 's';

      document.body.appendChild(piece);

      setTimeout(() => piece.remove(), 4000);

    }, i * 15);
  }

  const kitties = [
    '🐱',
    '😸',
    '😻',
    '🐈',
    '🐾',
    '💕',
    '❤️',
    '✨',
    '🌟',
    '💖'
  ];

  for (let i = 0; i < 30; i++) {

    setTimeout(() => {

      const kitty = document.createElement('div');

      kitty.className = 'flying-kitty';

      kitty.textContent =
        kitties[Math.floor(Math.random() * kitties.length)];

      kitty.style.left =
        (10 + Math.random() * 80) + 'vw';

      kitty.style.top =
        (20 + Math.random() * 60) + 'vh';

      kitty.style.fontSize =
        (1.5 + Math.random() * 2.5) + 'rem';

      kitty.style.animationDuration =
        (1.5 + Math.random()) + 's';

      kitty.style.animationDelay =
        Math.random() * 0.8 + 's';

      document.body.appendChild(kitty);

      setTimeout(() => kitty.remove(), 3500);

    }, i * 80);
  }
}

// ===== CERRAR OVERLAY =====
function closeSuccess() {

  const overlay = document.getElementById('successOverlay');

  if (overlay) {
    overlay.classList.remove('show');
  }
}

const successOverlay = document.getElementById('successOverlay');

if (successOverlay) {

  successOverlay.addEventListener('click', function (e) {

    if (e.target === this) {
      closeSuccess();
    }

  });

}
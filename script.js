const firstActions = document.querySelector('#first-actions');
const noButton = document.querySelector('#no-button');
const yesButton = document.querySelector('#yes-button');
const confirmation = document.querySelector('#confirmation');
const celebration = document.querySelector('#celebration');
const question = document.querySelector('#sure-question');
const confirmYes = document.querySelector('#confirm-yes');
const confirmNo = document.querySelector('#confirm-no');
const inviteCard = document.querySelector('.invite-card');

let noCount = 0;
let dodgeCount = 0;
let buttonX = 0;
let buttonY = 0;

function moveNoButton() {
  // Dopo due fughe, il pulsante si lascia finalmente cliccare.
  if (dodgeCount >= 2) return;

  const safeMargin = 18;
  const cardRect = inviteCard.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const baseLeft = buttonRect.left - buttonX;
  const baseTop = buttonRect.top - buttonY;
  const minX = cardRect.left + safeMargin - baseLeft;
  const maxX = cardRect.right - safeMargin - noButton.offsetWidth - baseLeft;
  const minY = cardRect.top + safeMargin - baseTop;
  const maxY = cardRect.bottom - safeMargin - noButton.offsetHeight - baseTop;

  buttonX = minX + Math.random() * Math.max(0, maxX - minX);
  buttonY = minY + Math.random() * Math.max(0, maxY - minY);
  noButton.style.transform = `translate(${buttonX}px, ${buttonY}px) rotate(${buttonX / 12}deg)`;
  dodgeCount += 1;
}

function showConfirmation() {
  firstActions.classList.add('hidden');
  confirmation.classList.remove('hidden');
}

function showCelebration() {
  firstActions.classList.add('hidden');
  confirmation.classList.add('hidden');
  celebration.classList.remove('hidden');
}

function makeQuestion() {
  question.textContent = `Sei ${'sicuro '.repeat(noCount + 1).trim()}?`;
  confirmNo.textContent = noCount > 2 ? 'Ancora no...' : 'No';
}

noButton.addEventListener('pointerenter', moveNoButton);
noButton.addEventListener('focus', moveNoButton);
noButton.addEventListener('click', showConfirmation);
yesButton.addEventListener('click', showCelebration);
confirmYes.addEventListener('click', showCelebration);
confirmNo.addEventListener('click', () => {
  noCount += 1;
  makeQuestion();
  confirmNo.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 240 });
});

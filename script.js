const firstActions = document.querySelector('#first-actions');
const noButton = document.querySelector('#no-button');
const yesButton = document.querySelector('#yes-button');
const confirmation = document.querySelector('#confirmation');
const celebration = document.querySelector('#celebration');
const question = document.querySelector('#sure-question');
const confirmYes = document.querySelector('#confirm-yes');
const confirmNo = document.querySelector('#confirm-no');

let noCount = 0;
let dodgeCount = 0;
let buttonX = 0;
let buttonY = 0;
const maxDodges = 3;

function moveNoButton() {
  // Dopo tre fughe, il pulsante si lascia finalmente cliccare.
  if (dodgeCount >= maxDodges) return;

  const padding = 8;
  const area = firstActions.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();
  const baseLeft = button.left - buttonX;
  const baseTop = button.top - buttonY;
  const minX = area.left + padding - baseLeft;
  const maxX = area.right - padding - noButton.offsetWidth - baseLeft;
  const minY = area.top + padding - baseTop;
  const maxY = area.bottom - padding - noButton.offsetHeight - baseTop;

  buttonX = minX + Math.random() * Math.max(0, maxX - minX);
  buttonY = minY + Math.random() * Math.max(0, maxY - minY);
  noButton.style.transform = `translate(${buttonX}px, ${buttonY}px)`;
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
}

noButton.addEventListener('pointerenter', moveNoButton);
noButton.addEventListener('focus', moveNoButton);
noButton.addEventListener('click', showConfirmation);
yesButton.addEventListener('click', showCelebration);
confirmYes.addEventListener('click', () => {
  noCount += 1;
  makeQuestion();
  confirmYes.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }],
    { duration: 240 },
  );
});
confirmNo.addEventListener('click', showCelebration);

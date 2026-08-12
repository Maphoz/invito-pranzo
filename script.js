const firstActions = document.querySelector('#first-actions');
const noButton = document.querySelector('#no-button');
const yesButton = document.querySelector('#yes-button');
const confirmation = document.querySelector('#confirmation');
const celebration = document.querySelector('#celebration');
const question = document.querySelector('#sure-question');
const confirmYes = document.querySelector('#confirm-yes');
const confirmNo = document.querySelector('#confirm-no');

let noCount = 0;

function moveNoButton() {
  const maxX = Math.max(70, window.innerWidth * 0.22);
  const maxY = Math.max(45, window.innerHeight * 0.12);
  const x = (Math.random() * 2 - 1) * maxX;
  const y = (Math.random() * 2 - 1) * maxY;
  noButton.style.transform = `translate(${x}px, ${y}px) rotate(${x / 12}deg)`;
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

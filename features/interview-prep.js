document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    'Tell me about yourself.',
    'What is your greatest strength?',
    'Describe a challenge and how you handled it.',
  ];
  const questionsList = document.getElementById('questions-list');
  const button = document.getElementById('start-practice');
  questionsList.innerHTML = questions.map(q => `<li>• ${q}</li>`).join('');
  button.addEventListener('click', () => {
    alert('Practice mode started. Record or practice answers aloud.');
  });
});
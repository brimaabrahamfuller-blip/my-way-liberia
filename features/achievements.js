document.addEventListener('DOMContentLoaded', () => {
  const badges = [
    'Quiz Master', 'Application Track', 'Mentor Network', 'Goal Setter'
  ];
  const grid = document.getElementById('achievement-grid');
  grid.innerHTML = badges.map(b => `<div class="role-card"><h4>${b}</h4><p>Unlocked</p></div>`).join('');
});
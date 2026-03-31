document.addEventListener('DOMContentLoaded', () => {
  const courses = [
    { title: 'Business Writing', provider: 'LJMTI', price: '$29' },
    { title: 'Advanced Excel', provider: 'Starz University', price: '$39' }
  ];
  const grid = document.getElementById('training-grid');
  grid.innerHTML = courses.map(c => `<div class="role-card"><h4>${c.title}</h4><p>${c.provider}</p><p>${c.price}</p><button class="btn btn-primary" onclick="alert('Enrolled!')">Enroll</button></div>`).join('');
});
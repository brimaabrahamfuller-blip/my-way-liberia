document.addEventListener('DOMContentLoaded', () => {
  const peers = [
    { name: 'Aminah', role: 'Developer' },
    { name: 'Thomas', role: 'Designer' },
    { name: 'Korto', role: 'Data Analyst' }
  ];
  const grid = document.getElementById('peers-grid');
  grid.innerHTML = peers.map(p => `<div class="role-card"><h4>${p.name}</h4><p>${p.role}</p><button class="btn btn-primary" onclick="alert('Connect request sent.')">Connect</button></div>`).join('');
});
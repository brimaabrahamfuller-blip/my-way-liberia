document.addEventListener('DOMContentLoaded', () => {
  const sectors = [
    { name: 'Agriculture', trend: 'Up', value: '85%' },
    { name: 'Technology', trend: 'Up', value: '65%'},
  ];
  const insights = document.getElementById('insights-grid');
  insights.innerHTML = sectors.map(s => `<div class="role-card"><h4>${s.name}</h4><p>Demand: ${s.value}</p><p>Status: ${s.trend}</p></div>`).join('');
});
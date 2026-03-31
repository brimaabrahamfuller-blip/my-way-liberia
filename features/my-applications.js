document.addEventListener('DOMContentLoaded', () => {
  const applications = [
    { job: 'Junior Data Analyst', company: 'Liberia Statistics House', status: 'Interview' },
    { job: 'Marketing Specialist', company: 'Orange Liberia', status: 'Applied' }
  ];
  const list = document.getElementById('applications-list');
  list.innerHTML = applications.map(a => `<div class="job-card"><h4>${a.job}</h4><p>${a.company}</p><p>Status: <strong>${a.status}</strong></p></div>`).join('');
});
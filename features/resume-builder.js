document.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('preview');
  document.getElementById('generate-resume').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value;
    preview.innerHTML = `\n      <div class="role-card">\n        <h4>${name || 'Unnamed'}</h4>\n        <p><strong>${title || 'Your Title'}</strong></p>\n        <p>${summary || 'Your summary goes here.'}</p>\n        <p><em>Skills: ${skills || 'N/A'}</em></p>\n      </div>\n    `;
  });
});
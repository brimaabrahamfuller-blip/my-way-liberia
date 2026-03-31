document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('theme-select');
  const langSelect = document.getElementById('lang-select');
  document.getElementById('save-settings').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('myway_theme', themeSelect.value);
    localStorage.setItem('myway_lang', langSelect.value);
    alert('Settings saved! Please reload to apply.');
  });
});
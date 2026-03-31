document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('send-request').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Your mentorship request has been submitted. Counselor will respond soon.');
    window.location.href = 'student.html';
  });
});
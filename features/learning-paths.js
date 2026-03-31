document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        { id: 101, title: "Modern Leadership in Liberia", provider: "Blue Crest College", persona: "Leader", progress: 0, duration: "4 weeks" },
        { id: 102, title: "Advanced Excel & Finance", provider: "Starz University", persona: "Analyst", progress: 45, duration: "6 weeks" },
        { id: 103, title: "UI/UX Design Fundamentals", provider: "TechHub Monrovia", persona: "Creative", progress: 10, duration: "8 weeks" },
        { id: 104, title: "Human Resources Management", provider: "UL", persona: "Supporter", progress: 0, duration: "5 weeks" }
    ];

    const persona = localStorage.getItem('quiz_result') || null;
    const grid = document.getElementById('courses-grid');

    grid.innerHTML = courses.map(course => `
        <div class="role-card course-card">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <span class="job-badge">${course.persona}</span>
                    <h4>${course.title}</h4>
                    <p>${course.provider}</p>
                </div>
            </div>
            <p class="course-duration">⏱️ ${course.duration}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
            <p style="font-size: 0.85rem; color: #94a3b8;">${course.progress}% complete</p>
            <button class="btn btn-primary" onclick="alert('Enrollment coming soon!')">
                ${course.progress > 0 ? 'Continue' : 'Start'}
            </button>
        </div>
    `).join('');
});

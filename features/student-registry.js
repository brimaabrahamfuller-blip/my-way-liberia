document.addEventListener('DOMContentLoaded', () => {
    const mentees = [
        { id: 1, name: "James Tarpeh", persona: "Leader", status: "On Track", progress: 75, lastUpdate: "Today" },
        { id: 2, name: "Zainab Hoffman", persona: "Analyst", status: "Needs Support", progress: 45, lastUpdate: "2 days ago" },
        { id: 3, name: "Marcus Johnson", persona: "Creative", status: "On Track", progress: 60, lastUpdate: "Yesterday" },
        { id: 4, name: "Louise Roberts", persona: "Supporter", status: "Excelling", progress: 90, lastUpdate: "Today" }
    ];

    const grid = document.getElementById('mentees-grid');

    grid.innerHTML = mentees.map(m => `
        <div class="role-card">
            <h4>${m.name}</h4>
            <p><strong>${m.persona}</strong> | ${m.status}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${m.progress}%"></div>
            </div>
            <p style="font-size: 0.85rem; color: #94a3b8;">Progress: ${m.progress}% | Last: ${m.lastUpdate}</p>
            <button class="btn btn-primary" onclick="alert('View mentee details coming soon!')">View Profile</button>
        </div>
    `).join('');
});

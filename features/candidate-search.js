document.addEventListener('DOMContentLoaded', () => {
    const candidates = [
        { id: 1, name: "Kollie Mensah", role: "Junior Dev", persona: "Analyst", location: "Monrovia", skills: "JavaScript, React" },
        { id: 2, name: "Fatima Kamara", role: "Project Lead", persona: "Leader", location: "Gbarnga", skills: "Leadership, Agile" },
        { id: 3, name: "Sam Harris", role: "Designer", persona: "Creative", location: "Buchanan", skills: "UI/UX, Figma" },
        { id: 4, name: "Bendue Cooper", role: "Social Worker", persona: "Supporter", location: "Kakata", skills: "Community Outreach" }
    ];

    const grid = document.getElementById('candidates-grid');
    const searchInput = document.getElementById('search-input');
    const personaFilter = document.getElementById('persona-filter');

    function render() {
        let filtered = candidates;

        if (searchInput.value.trim()) {
            filtered = filtered.filter(c => 
                c.skills.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                c.name.toLowerCase().includes(searchInput.value.toLowerCase())
            );
        }

        if (personaFilter.value) {
            filtered = filtered.filter(c => c.persona === personaFilter.value);
        }

        grid.innerHTML = filtered.map(c => `
            <div class="role-card">
                <h4>${c.name}</h4>
                <p><strong>${c.role}</strong></p>
                <p>📍 ${c.location}</p>
                <p style="color: #64748b; font-size: 0.9rem;">Skills: ${c.skills}</p>
                <span class="job-badge">${c.persona}</span>
                <button class="btn btn-primary" onclick="alert('Message candidate feature coming soon!')">Contact</button>
            </div>
        `).join('');
    }

    searchInput.addEventListener('input', render);
    personaFilter.addEventListener('change', render);
    render();
});

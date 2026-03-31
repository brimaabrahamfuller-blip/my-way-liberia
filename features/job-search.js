document.addEventListener('DOMContentLoaded', () => {
    const mockJobs = [
        { id: 1, title: "Junior Data Analyst", company: "Liberia Statistics House", location: "Monrovia", persona: "Analyst", salary: "$500/mo" },
        { id: 2, title: "Marketing Specialist", company: "Orange Liberia", location: "Monrovia", persona: "Creative", salary: "$600/mo" },
        { id: 3, title: "Community Outreach Lead", company: "Save the Children", location: "Gbarnga", persona: "Supporter", salary: "$550/mo" },
        { id: 4, title: "Project Manager Trainee", company: "ArcelorMittal", location: "Buchanan", persona: "Leader", salary: "$700/mo" },
        { id: 5, title: "Graphic Designer", company: "Creative Hub", location: "Monrovia", persona: "Creative", salary: "$480/mo" },
        { id: 6, title: "Financial Assistant", company: "EcoBank", location: "Kakata", persona: "Analyst", salary: "$650/mo" }
    ];

    const persona = localStorage.getItem('quiz_result') || null;
    const jobGrid = document.getElementById('job-grid');
    const searchInput = document.getElementById('search-input');
    const personaMatch = document.getElementById('persona-match');

    function renderJobs() {
        let filtered = mockJobs;
        
        // Filter by search
        if (searchInput.value.trim()) {
            filtered = filtered.filter(job => 
                job.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                job.company.toLowerCase().includes(searchInput.value.toLowerCase())
            );
        }

        // Filter by persona
        if (personaMatch.checked && persona) {
            filtered = filtered.filter(job => job.persona === persona);
        }

        jobGrid.innerHTML = filtered.map(job => `
            <div class="job-card">
                <div class="job-header">
                    <h3>${job.title}</h3>
                    <span class="job-salary">${job.salary}</span>
                </div>
                <p class="job-company"><strong>${job.company}</strong></p>
                <p class="job-location">📍 ${job.location}, Liberia</p>
                <span class="job-badge">${job.persona} Match</span>
                <button class="btn btn-primary" onclick="alert('Apply feature coming soon!')">Apply Now</button>
            </div>
        `).join('');

        if (filtered.length === 0) {
            jobGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No jobs match your search. Try adjusting filters.</p>';
        }
    }

    searchInput.addEventListener('input', renderJobs);
    personaMatch.addEventListener('change', renderJobs);

    renderJobs();
});

document.addEventListener('DOMContentLoaded', () => {
    const requests = [
        { id: 1, student: "Amara Sumo", persona: "Leader", request: "Seeking guidance on project management career", status: "pending" },
        { id: 2, student: "David Geplay", persona: "Analyst", request: "Help with data analysis skills", status: "pending" },
        { id: 3, student: "Mary Flomo", persona: "Creative", request: "Portfolio review for design roles", status: "pending" }
    ];

    const grid = document.getElementById('requests-grid');
    let requestList = [...requests];

    function render() {
        grid.innerHTML = requestList.length > 0 ? requestList.map(r => `
            <div class="role-card">
                <h4>${r.student}</h4>
                <p><strong>${r.persona} Persona</strong></p>
                <p style="color: #475569; margin: 0.8rem 0;">"${r.request}"</p>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-primary" onclick="acceptRequest(${r.id})" style="flex: 1;">Accept</button>
                    <button onclick="rejectRequest(${r.id})" style="flex: 1; background: #f5f5f5; color: #333; border: none; padding: 8px; border-radius: 8px; cursor: pointer;">Decline</button>
                </div>
            </div>
        `).join('') : '<p style="grid-column: 1/-1; text-align: center;">No pending requests</p>';
    }

    window.acceptRequest = (id) => {
        requestList = requestList.filter(r => r.id !== id);
        alert('Mentorship match accepted!');
        render();
    };

    window.rejectRequest = (id) => {
        requestList = requestList.filter(r => r.id !== id);
        render();
    };

    render();
});

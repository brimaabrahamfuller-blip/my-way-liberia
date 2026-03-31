document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "When working on a project, what do you enjoy most?",
            options: [
                { text: "Leading the team and making decisions", type: "Leader" },
                { text: "Analyzing data and solving complex problems", type: "Analyst" },
                { text: "Designing the look and feel", type: "Creative" },
                { text: "Helping others and coordinating tasks", type: "Supporter" }
            ]
        },
        {
            question: "Which environment suits you best?",
            options: [
                { text: "A fast-paced startup", type: "Leader" },
                { text: "A quiet research lab or office", type: "Analyst" },
                { text: "A studio or flexible workspace", type: "Creative" },
                { text: "A community center or classroom", type: "Supporter" }
            ]
        }
    ];

    let currentQuestion = 0;
    let scores = { Leader: 0, Analyst: 0, Creative: 0, Supporter: 0 };
    const container = document.getElementById('quiz-container');

    function renderQuestion() {
        if (currentQuestion >= quizData.length) {
            finishQuiz();
            return;
        }

        const q = quizData[currentQuestion];
        container.innerHTML = `
            <div class="quiz-card">
                <p class="quiz-progress">Question ${currentQuestion + 1} of ${quizData.length}</p>
                <h2>${q.question}</h2>
                <div class="quiz-options">
                    ${q.options.map((opt, idx) => `
                        <button class="quiz-option" data-type="${opt.type}" data-index="${idx}">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-type');
                scores[type]++;
                currentQuestion++;
                renderQuestion();
            });
        });
    }

    function finishQuiz() {
        const persona = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        localStorage.setItem('quiz_result', persona);
        
        container.innerHTML = `
            <div class="quiz-result-card">
                <h2>Your Career Persona</h2>
                <div class="persona-badge">${persona}</div>
                <p>This persona defines your strengths and ideal career paths.</p>
                <div class="persona-description">
                    ${getPersonaDescription(persona)}
                </div>
                <button onclick="window.location.href='student.html';" class="btn btn-primary">Back to Dashboard</button>
            </div>
        `;
    }

    function getPersonaDescription(persona) {
        const descriptions = {
            Leader: "<strong>Leaders</strong> thrive in management roles, driving teams toward goals. Consider: Project Manager, Team Lead, Product Manager.",
            Analyst: "<strong>Analysts</strong> excel with data and complex problems. Consider: Data Scientist, Financial Analyst, Business Analyst.",
            Creative: "<strong>Creatives</strong> design and innovate. Consider: UX/UI Designer, Graphic Designer, Content Creator.",
            Supporter: "<strong>Supporters</strong> build community and help others. Consider: HR Specialist, Social Worker, Community Manager."
        };
        return descriptions[persona] || "";
    }

    renderQuestion();
});

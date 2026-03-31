document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutBtn = document.getElementById('logout-btn');
    const dashboardContent = document.getElementById('dashboard-content');
    const navLinks = document.getElementById('nav-links');

    // Career Quiz Data
    const quizQuestions = [
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

    // Mock Job Data for Liberia
    const mockJobs = [
        { id: 1, title: "Junior Data Analyst", company: "Liberia Statistics House", location: "Monrovia", persona: "Analyst" },
        { id: 2, title: "Marketing Specialist", company: "Orange Liberia", location: "Monrovia", persona: "Creative" },
        { id: 3, title: "Community Outreach Lead", company: "Save the Children", location: "Gbarnga", persona: "Supporter" },
        { id: 4, title: "Project Manager Trainee", company: "ArcelorMittal", location: "Buchanan", persona: "Leader" },
        { id: 5, title: "Graphic Designer", company: "Creative Hub", location: "Monrovia", persona: "Creative" },
        { id: 6, title: "Financial Assistant", company: "EcoBank", location: "Kakata", persona: "Analyst" }
    ];

    // Mock Learning Paths
    const mockCourses = [
        { id: 101, title: "Modern Leadership in Liberia", provider: "Blue Crest College", persona: "Leader", progress: 0 },
        { id: 102, title: "Advanced Excel for Analysts", provider: "Starz University", persona: "Analyst", progress: 45 },
        { id: 103, title: "UI/UX Design Fundamentals", provider: "TechHub Monrovia", persona: "Creative", progress: 10 },
        { id: 104, title: "Human Resources Management", provider: "UL", persona: "Supporter", progress: 0 }
    ];

    // Mock Peer Network
    const mockPeers = [
        { id: 201, name: "Kollie Mensah", role: "Junior Dev", persona: "Analyst", location: "Monrovia" },
        { id: 202, name: "Fatima Kamara", role: "Project Lead", persona: "Leader", location: "Gbarnga" },
        { id: 203, name: "Sam Harris", role: "Designer", persona: "Creative", location: "Buchanan" },
        { id: 204, name: "Bendue Cooper", role: "Social Worker", persona: "Supporter", location: "Kakata" }
    ];

    // New Mock Data for Phase 2
    const mockApplications = [
        { id: 1, job: "Junior Data Analyst", company: "Liberia Statistics House", status: "Interview", date: "2024-03-15" },
        { id: 2, job: "Marketing Specialist", company: "Orange Liberia", status: "Applied", date: "2024-03-10" }
    ];

    const mockInstitutions = [
        { name: "Blue Crest College", location: "Monrovia", rating: 4.8, reviews: 124, type: "Degree/Diploma" },
        { name: "Starz University", location: "Airfield", rating: 4.5, reviews: 89, type: "IT/Coding" },
        { name: "LOIC", location: "Various", rating: 4.2, reviews: 210, type: "Vocational" }
    ];

    const industryStats = [
        { label: "Agriculture", value: 85 },
        { label: "Technology", value: 65 },
        { label: "Healthcare", value: 45 },
        { label: "Construction", value: 70 }
    ];

    // Mock Events for Phase 3
    const mockEvents = [
        { id: 301, title: "Tech Career Fair 2024", date: "2024-04-05", time: "10:00 AM", type: "Virtual", description: "Meet top tech employers in Liberia." },
        { id: 302, title: "CV & Cover Letter Masterclass", date: "2024-04-12", time: "2:00 PM", type: "Webinar", description: "Optimize your profile for Liberian NGOs." },
        { id: 303, title: "Entrepreneurship Summit", date: "2024-04-20", time: "11:00 AM", type: "Workshop", description: "Start your own business in Monrovia." }
    ];

    // Localization Engine
    const translations = {
        en: { welcome: "Hello", coach: "AI Coach", search: "Job Search", settings: "Settings" },
        lr: { welcome: "Tell ya hello", coach: "Myway Expert", search: "Find Work", settings: "Fix Account" }
    };

    let currentQuestionIndex = 0;
    let quizScores = {
        Leader: 0,
        Analyst: 0,
        Creative: 0,
        Supporter: 0
    };

    // 1. Session Initialization
    const checkSession = () => {
        // Global Preferences
        if (localStorage.getItem('myway_lite') === 'true') document.body.classList.add('lite-mode');

        const user = JSON.parse(localStorage.getItem('myway_user'));
        if (user) {
            renderDashboard(user);
        } else {
            showAuth();
        }
    };

    const showAuth = () => {
        authSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        logoutBtn.style.display = 'none';
        navLinks.innerHTML = '';
    };

    const setupCategoryButtons = () => {
        document.querySelectorAll('.category-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const role = e.currentTarget.getAttribute('data-role');
                const guest = {
                    name: 'Guest',
                    email: `guest_${role}@myway.local`,
                    role: role,
                    isPremium: false
                };
                localStorage.setItem('myway_user', JSON.stringify(guest));

                // Support either SPA dashboard or dedicated pages
                const rolePage = `${role}.html`;
                if (document.location.pathname.endsWith('index.html') || document.location.pathname.endsWith('/')) {
                    window.location.href = rolePage;
                } else {
                    renderDashboard(guest);
                }
            });
        });
    };

    const getCategoryPageMarkup = (role) => {
        if (role === 'student') {
            return `
                <section class="role-card-section">
                    <h3>Student Dashboard</h3>
                    <p>Personalized study plan, skill boost, and mentorship connections in real time.</p>
                    <div class="role-card-grid">
                        <article class="role-card"><h4>Learning Roadmap</h4><p>Create your career path in 3 clicks.</p></article>
                        <article class="role-card"><h4>Job Matches</h4><p>Live matching for entry roles across Liberia.</p></article>
                        <article class="role-card"><h4>Peer Space</h4><p>Connect with 150+ students and mentors.</p></article>
                    </div>
                </section>
            `;
        }

        if (role === 'employer') {
            return `
                <section class="role-card-section">
                    <h3>Employer Dashboard</h3>
                    <p>Fast candidate sourcing, applicant tracking, and hiring insights.</p>
                    <div class="role-card-grid">
                        <article class="role-card"><h4>Post Job</h4><p>Publish a job in 30 seconds.</p></article>
                        <article class="role-card"><h4>Candidate Pool</h4><p>Filter by skill and persona live.</p></article>
                        <article class="role-card"><h4>Analytics</h4><p>View weekly application trends.</p></article>
                    </div>
                </section>
            `;
        }

        if (role === 'counselor') {
            return `
                <section class="role-card-section">
                    <h3>Counselor Dashboard</h3>
                    <p>Mentor queue, student insights, and program reports.</p>
                    <div class="role-card-grid">
                        <article class="role-card"><h4>Mentee List</h4><p>Real-time tracking of your students' progress.</p></article>
                        <article class="role-card"><h4>Match Requests</h4><p>Accept and review mentorship requests instantly.</p></article>
                        <article class="role-card"><h4>Impact Notes</h4><p>Share milestones and watch outcomes.</p></article>
                    </div>
                </section>
            `;
        }

        return '';
    };
    // 2. Dashboard Rendering (Multi-Role Logic)
    const renderDashboard = (user) => {
        authSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        logoutBtn.style.display = 'block';
        
        const roles = {
            student: {
                msg: "Your career journey starts here. Explore AI-powered mentorship.",
                links: ['Career Quiz', 'AI Coach', 'Learning Paths', 'Resume Builder', 'Interview Prep', 'Peer Network', 'Job Search', 'Virtual Events', 'Mentorship Request', 'Messages', 'My Applications', 'Training Marketplace', 'Industry Insights', 'Achievements', 'Settings']
            },
            employer: {
                msg: "Find the best Liberian talent for your organization.",
                links: ['Post Job', 'Manage Applications', 'Candidate Search', 'Company Profile', 'Analytics', 'Settings']
            },
            counselor: {
                msg: "Guide the next generation of Liberian professionals.",
                links: ['Student Registry', 'Match Requests', 'Messages', 'Resources', 'Virtual Events', 'Analytics Dashboard', 'Settings']
            }
        };
        
        const lang = localStorage.getItem('myway_lang') || 'en';
        const t = translations[lang];
        const roleData = roles[user.role] || roles.student;
        const premiumBadge = user.isPremium ? `<span class="premium-badge">PRO</span>` : '';
        let contentHtml = `<h1>${t.welcome}, ${user.name}${premiumBadge}</h1>`;
        contentHtml += `<p class="role-intro">${roleData.msg}</p>`;

        // Role-specific block to simulate separate category pages
        contentHtml += getCategoryPageMarkup(user.role);

        // Calculate unread messages for the badge
        const allMessages = JSON.parse(localStorage.getItem('myway_p2p_messages')) || [];
        const lastViewed = parseInt(localStorage.getItem(`myway_last_msg_view_${user.email}`)) || 0;
        const manuallyUnread = JSON.parse(localStorage.getItem(`myway_manual_unread_${user.email}`)) || [];
        
        const unreadCount = allMessages.filter(m => m.to === user.email && m.timestamp > lastViewed).length + manuallyUnread.length;

        const routeMap = {
            'career-quiz': 'career-quiz.html',
            'ai-coach': 'ai-coach.html',
            'learning-paths': 'learning-paths.html',
            'resume-builder': 'resume-builder.html',
            'interview-prep': 'interview-prep.html',
            'peer-network': 'peer-network.html',
            'job-search': 'job-search.html',
            'virtual-events': 'training-marketplace.html',
            'mentorship-request': 'mentorship-request.html',
            'messages': 'messages.html',
            'my-applications': 'my-applications.html',
            'training-marketplace': 'training-marketplace.html',
            'industry-insights': 'industry-insights.html',
            'achievements': 'achievements.html',
            'settings': 'settings.html',
            'post-job': 'post-job.html',
            'candidate-search': 'candidate-search.html',
            'student-registry': 'student-registry.html',
            'match-requests': 'match-requests.html'
        };

        let linksHtml = roleData.links.map(link => {
            const pageId = link.toLowerCase().replace(' ', '-');
            const href = routeMap[pageId] || '#';
            const badge = (pageId === 'messages' && unreadCount > 0) ? `<span class="badge">${unreadCount}</span>` : '';
            return `<a href="${href}" class="nav-item" data-page="${pageId}">${link}${badge}</a>`;
        }).join('');

        dashboardContent.innerHTML = `
            <div class="dashboard-card" id="main-display">
                ${contentHtml}
                <div class="role-links">
                    <span>Quick jump:</span>
                    <button class="role-switch" data-role="student">Student</button>
                    <button class="role-switch" data-role="employer">Employer</button>
                    <button class="role-switch" data-role="counselor">Counselor</button>
                </div>
            </div>
        `;
        navLinks.innerHTML = linksHtml;

        document.querySelectorAll('.role-switch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const newRole = e.currentTarget.getAttribute('data-role');
                const switchedUser = {...user, role: newRole};
                localStorage.setItem('myway_user', JSON.stringify(switchedUser));
                renderDashboard(switchedUser);
            });
        });

        // Check for existing quiz results
        const savedResult = localStorage.getItem(`quiz_${user.email}`);
        if (savedResult && user.role === 'student') {
            document.getElementById('main-display').innerHTML += `
                <div class="quiz-container">
                    <h3>Your Career Persona: <span style="color:var(--secondary-color)">${savedResult}</span></h3>
                    <button id="retake-quiz" style="width: auto; padding: 10px 20px;">Retake Quiz</button>
                </div>`;
        }

        setupNavigation(user);
    };

    const setupNavigation = (user) => {
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page === 'career-quiz') startQuiz(user);
                if (page === 'ai-coach') startAIMentor(user);
                if (page === 'job-search') startJobSearch(user);
                if (page === 'learning-paths') startLearningPaths(user);
                if (page === 'resume-builder') startResumeBuilder(user);
                if (page === 'interview-prep') startInterviewPrep(user);
                if (page === 'peer-network') startPeerNetwork(user);
                if (page === 'my-applications') startStudentATS(user);
                if (page === 'training-marketplace') startMarketplace(user);
                if (page === 'industry-insights') startInsights(user);
                if (page === 'achievements') startRewards(user);
                if (page === 'company-profile') startEmployerProfile(user);
                if (page === 'candidate-search') startCandidateSearch(user);
                if (page === 'virtual-events') startVirtualEvents(user);
                if (page === 'analytics-dashboard') startCounselorAnalytics(user);
                if (page === 'analytics') startEmployerAnalytics(user);
                if (page === 'settings') startSettings(user);
                if (page === 'messages') {
                    // Mark messages as read and clear the badge UI
                    localStorage.setItem(`myway_last_msg_view_${user.email}`, Date.now());
                    const badge = link.querySelector('.badge');
                    if (badge) badge.remove();
                    startMessages(user);
                }
                if (page === 'mentorship-request') startMentorshipRequest(user);
                if (page === 'match-requests') startMatchRequests(user);
            });
        });

        const retakeBtn = document.getElementById('retake-quiz');
        if (retakeBtn) retakeBtn.onclick = () => startQuiz(user);
    };

    // 4. Quiz Logic
    const startQuiz = (user) => {
        currentQuestionIndex = 0;
        quizScores = { Leader: 0, Analyst: 0, Creative: 0, Supporter: 0 };
        renderQuestion(user);
    };

    const renderQuestion = (user) => {
        const question = quizQuestions[currentQuestionIndex];
        if (!question) {
            finishQuiz(user);
            return;
        }

        dashboardContent.innerHTML = `
            <div class="quiz-container">
                <p>Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</p>
                <div class="quiz-question">${question.question}</div>
                <div class="quiz-options">
                    ${question.options.map(opt => `
                        <button class="quiz-option" data-type="${opt.type}">${opt.text}</button>
                    `).join('')}
                </div>
            </div>
        `;

        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.onclick = (e) => {
                const type = e.target.getAttribute('data-type');
                quizScores[type]++;
                currentQuestionIndex++;
                renderQuestion(user);
            };
        });
    };

    const finishQuiz = (user) => {
        const persona = Object.keys(quizScores).reduce((a, b) => quizScores[a] > quizScores[b] ? a : b);
        localStorage.setItem(`quiz_${user.email}`, persona);
        
        dashboardContent.innerHTML = `
            <div class="form-card result-card">
                <h2>Quiz Complete!</h2>
                <p>Your Career Persona is:</p>
                <div class="result-persona">${persona}</div>
                <p>We'll use this to customize your Myway experience.</p>
                <button onclick="location.reload()">Back to Dashboard</button>
            </div>
        `;
    };

    // 5. AI Mentor Logic
    const startAIMentor = (user) => {
        const persona = localStorage.getItem(`quiz_${user.email}`) || "Explorer";
        
        dashboardContent.innerHTML = `
            <div class="chat-container">
                <div class="chat-messages" id="chat-messages">
                    <div class="message ai-message">
                        Hello ${user.name}! I'm your Myway AI Mentor. Based on your <strong>${persona}</strong> persona, 
                        how can I help you navigate your career path today?
                    </div>
                </div>
                <form class="chat-input-area" id="chat-form">
                    <input type="text" id="chat-input" placeholder="Ask about jobs, skills, or interviews..." required>
                    <button type="submit">Send</button>
                </form>
            </div>
        `;

        const chatForm = document.getElementById('chat-form');
        const chatMessages = document.getElementById('chat-messages');

        chatForm.onsubmit = (e) => {
            e.preventDefault();
            const input = document.getElementById('chat-input');
            const userText = input.value;
            
            // Append User Message
            appendMessage('user', userText);
            input.value = '';

            // Simulate AI Response
            setTimeout(() => {
                const response = getAIResponse(userText, persona);
                appendMessage('ai', response);
            }, 800);
        };
    };

    const appendMessage = (sender, text) => {
        const chatMessages = document.getElementById('chat-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const getAIResponse = (text, persona) => {
        const responses = {
            Leader: "As a Leader, you should look into project management roles in Monrovia's tech scene. Have you considered starting a small business?",
            Analyst: "Your Analyst skills are in high demand for data entry and financial auditing roles. Focus on mastering Excel or SQL.",
            Creative: "Creatives like you thrive in marketing and UI design. I recommend building a digital portfolio to show Liberian employers.",
            Supporter: "With your Supporter persona, HR or community development roles would be a great fit. Look at local NGOs for opportunities.",
            Explorer: "Since you're still exploring, why not try a few vocational short courses to see what sticks?"
        };

        if (text.toLowerCase().includes('job') || text.toLowerCase().includes('work')) {
            return `That's a great question about the Liberian job market. ${responses[persona]}`;
        }
        
        return `I understand. Being a <strong>${persona}</strong> gives you a unique edge in Liberia. What specific skills would you like to develop?`;
    };

    // 6. Job Search Logic
    const startJobSearch = (user) => {
        const userPersona = localStorage.getItem(`quiz_${user.email}`) || "Explorer";
        
        dashboardContent.innerHTML = `
            <div class="job-search-header">
                <h2>Available Opportunities</h2>
                <div class="filter-controls">
                    <input type="checkbox" id="persona-filter">
                    <label for="persona-filter">Match my <strong>${userPersona}</strong> persona</label>
                </div>
            </div>
            <div class="job-grid" id="job-grid"></div>
        `;

        const personaFilter = document.getElementById('persona-filter');
        
        const renderJobs = (filterActive) => {
            const jobGrid = document.getElementById('job-grid');
            const filteredJobs = filterActive 
                ? mockJobs.filter(job => job.persona === userPersona)
                : mockJobs;

            if (filteredJobs.length === 0) {
                jobGrid.innerHTML = `<p>No matching jobs found for your persona yet. Keep checking!</p>`;
                return;
            }

            jobGrid.innerHTML = filteredJobs.map(job => `
                <div class="job-card">
                    <span class="job-badge">${job.persona} Match</span>
                    <h3>${job.title}</h3>
                    <p><strong>${job.company}</strong></p>
                    <p>${job.location}, Liberia</p>
                    <button class="apply-btn" style="padding: 8px 15px; font-size: 0.85rem;">View Details</button>
                </div>
            `).join('');
            
            document.querySelectorAll('.apply-btn').forEach(btn => {
                btn.onclick = () => alert("Job application feature coming soon to Myway!");
            });
        };

        personaFilter.onchange = (e) => renderJobs(e.target.checked);
        
        // Initial render
        renderJobs(false);
    };

    // 7. Learning Paths Logic
    const startLearningPaths = (user) => {
        const persona = localStorage.getItem(`quiz_${user.email}`) || "Explorer";
        dashboardContent.innerHTML = `
            <h2>Personalized Learning Paths</h2>
            <p>Skills curated for your <strong>${persona}</strong> persona.</p>
            <div class="dashboard-grid">
                ${mockCourses.map(course => `
                    <div class="card-item">
                        <div>
                            <span class="job-badge">${course.persona} Path</span>
                            <h3>${course.title}</h3>
                            <p>${course.provider}</p>
                        </div>
                        <div>
                            <div class="progress-bar"><div class="progress-fill" style="width: ${course.progress}%"></div></div>
                            <button class="nav-item">${course.progress > 0 ? 'Continue' : 'Start Course'}</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    };

    // 8. Resume Builder Logic
    const startResumeBuilder = (user) => {
        const persona = localStorage.getItem(`quiz_${user.email}`) || "Explorer";
        dashboardContent.innerHTML = `
            <div class="resume-builder-container">
                <div class="form-card" style="margin:0; width:100%;">
                    <h3>Resume Details</h3>
                    <input type="text" id="res-name" placeholder="Full Name" value="${user.name}">
                    <input type="text" id="res-title" placeholder="Professional Title (e.g. Junior Analyst)">
                    <textarea id="res-summary" placeholder="Brief Summary" style="width:100%; height:80px; padding:10px; border-radius:8px; border:1px solid #ddd;"></textarea>
                    <input type="text" id="res-skills" placeholder="Skills (comma separated)">
                </div>
                <div class="resume-preview" id="resume-preview">
                    <h1 id="p-name">${user.name}</h1>
                    <p id="p-title" style="font-weight:bold; color:var(--secondary-color)">${persona} / Professional</p>
                    <h2>Professional Summary</h2>
                    <p id="p-summary">Complete the form to see your preview...</p>
                    <h2>Skills</h2>
                    <p id="p-skills">Your skills will appear here.</p>
                    <button style="margin-top:20px;" onclick="window.print()">Export to PDF</button>
                </div>
            </div>
        `;

        // Live Preview Logic
        const sync = (id, target) => {
            document.getElementById(id).addEventListener('input', (e) => {
                document.getElementById(target).innerText = e.target.value;
            });
        };
        sync('res-name', 'p-name');
        sync('res-title', 'p-title');
        sync('res-summary', 'p-summary');
        sync('res-skills', 'p-skills');
    };

    // 9. Interview Prep Logic
    const startInterviewPrep = (user) => {
        const persona = localStorage.getItem(`quiz_${user.email}`) || "Explorer";
        const questions = {
            Leader: "Tell me about a time you led a team through a difficult challenge in a project.",
            Analyst: "How do you ensure accuracy when dealing with large sets of data?",
            Creative: "Describe your creative process when starting a new design from scratch.",
            Supporter: "How do you handle conflict between team members to ensure a positive environment?",
            Explorer: "What career paths in Liberia are you currently most interested in?"
        };

        dashboardContent.innerHTML = `
            <div class="interview-stage">
                <h2>Mock Interview Simulator</h2>
                <p>Persona-based Question for a <strong>${persona}</strong>:</p>
                <div class="ai-message" style="margin: 20px 0; padding: 20px;">
                    "${questions[persona]}"
                </div>
                <textarea id="interview-answer" placeholder="Type your answer here..." style="width:100%; height:120px; padding:15px; border-radius:12px;"></textarea>
                <button id="submit-answer">Get AI Feedback</button>
                <div id="ai-feedback" class="ai-feedback-box" style="display:none;"></div>
            </div>
        `;

        document.getElementById('submit-answer').onclick = () => {
            const feedback = document.getElementById('ai-feedback');
            feedback.style.display = 'block';
            feedback.innerHTML = `<strong>AI Feedback:</strong> Great start! Since you are a <strong>${persona}</strong>, try to emphasize specific Liberian context in your answer, like local teamwork dynamics or resource management. You should mention specific tools like Excel or Trello to sound more professional.`;
        };
    };

    // 10. Peer Network Logic
    const startPeerNetwork = (user) => {
        const persona = localStorage.getItem(`quiz_${user.email}`) || "Explorer";
        dashboardContent.innerHTML = `
            <h2>Peer Network</h2>
            <p>Connect with other ${persona}s in the Myway community.</p>
            <div class="dashboard-grid">
                ${mockPeers.map(peer => `
                    <div class="card-item">
                        <div style="display:flex; gap:15px; align-items:center;">
                            <div style="width:50px; height:50px; border-radius:50%; background:var(--primary-color); color:white; display:flex; align-items:center; justify-content:center; font-weight:bold;">
                                ${peer.name[0]}
                            </div>
                            <div>
                                <h4 style="margin:0;">${peer.name}</h4>
                                <small>${peer.role}</small>
                            </div>
                        </div>
                        <p style="font-size: 0.8rem; margin: 10px 0;">${peer.location}, Liberia</p>
                        <span class="job-badge" style="width:fit-content">${peer.persona}</span>
                        <button class="nav-item" style="margin-top:10px; background:var(--secondary-color); border:none;">Connect</button>
                    </div>
                `).join('')}
            </div>
        `;
    };

    // 11. Student ATS (Idea #7)
    const startStudentATS = (user) => {
        dashboardContent.innerHTML = `
            <h2>My Applications</h2>
            <table class="data-table">
                <thead>
                    <tr><th>Job Title</th><th>Company</th><th>Date Applied</th><th>Status</th></tr>
                </thead>
                <tbody>
                    ${mockApplications.map(app => `
                        <tr>
                            <td>${app.job}</td>
                            <td>${app.company}</td>
                            <td>${app.date}</td>
                            <td><span class="status-pill status-${app.status.toLowerCase()}">${app.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    };

    // 12. Vocational Marketplace (Idea #8)
    const startMarketplace = (user) => {
        dashboardContent.innerHTML = `
            <h2>Vocational Training Marketplace</h2>
            <div class="dashboard-grid">
                ${mockInstitutions.map(inst => `
                    <div class="card-item">
                        <h3>${inst.name}</h3>
                        <p>${inst.type} • ${inst.location}</p>
                        <div style="color: var(--secondary-color); font-weight: bold;">⭐ ${inst.rating} (${inst.reviews} reviews)</div>
                        <button class="nav-item" style="margin-top:10px;">View Programs</button>
                    </div>
                `).join('')}
            </div>
        `;
    };

    // 13. Industry Insights (Idea #9)
    const startInsights = (user) => {
        dashboardContent.innerHTML = `
            <h2>Liberian Industry Insights</h2>
            <div class="insights-grid">
                <div class="card-item">
                    <h3>Skill Demand by Sector</h3>
                    <div class="bar-chart">
                        ${industryStats.map(stat => `
                            <div class="bar-row">
                                <div style="width: 100px; font-size: 0.8rem;">${stat.label}</div>
                                <div class="bar-bg"><div class="bar-fill-blue" style="width: ${stat.value}%"></div></div>
                                <div style="font-size: 0.8rem;">${stat.value}%</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="card-item">
                    <h3>Quick Stats</h3>
                    <p>🔥 Trending: <strong>Renewable Energy Tech</strong></p>
                    <p>📍 Top Location: <strong>Monrovia Free Zone</strong></p>
                </div>
            </div>
        `;
    };

    // 14. Gamification & Rewards (Idea #10)
    const startRewards = (user) => {
        dashboardContent.innerHTML = `
            <h2>My Achievements</h2>
            <div class="card-item" style="margin-bottom: 20px;">
                <h3>Rank: Rising Star</h3>
                <div class="progress-bar"><div class="progress-fill" style="width: 65%"></div></div>
                <p>650 / 1000 XP to Senior Professional</p>
            </div>
            <div class="badge-grid">
                <div class="badge-item">🏅<br><small>Quiz Master</small></div>
                <div class="badge-item">📝<br><small>Resume Pro</small></div>
                <div class="badge-item" style="opacity:0.3;">🤝<br><small>Networker</small></div>
            </div>
        `;
    };

    // 15. Employer Profile (Idea #6)
    const startEmployerProfile = (user) => {
        dashboardContent.innerHTML = `
            <div class="form-card" style="margin:0; width:100%; max-width: none;">
                <h2>Company Profile Settings</h2>
                <div class="resume-builder-container">
                    <div>
                        <label>Company Name</label>
                        <input type="text" value="New Venture Liberia">
                        <label>Sector</label>
                        <select><option>Technology</option><option>Agriculture</option></select>
                        <label>Bio</label>
                        <textarea style="width:100%; height:100px; padding:10px; border-radius:8px; border:1px solid #ddd;"></textarea>
                    </div>
                    <div class="card-item">
                        <h3>Public Preview</h3>
                        <p>Your profile will be visible to students in the Job Search and Marketplace sections.</p>
                        <button>Save Branding</button>
                    </div>
                </div>
            </div>
        `;
    };

    // 23. Advanced Candidate Search (Idea #15 - Feature Gating)
    const startCandidateSearch = (user) => {
        if (!user.isPremium) {
            dashboardContent.innerHTML = `
                <div class="upgrade-container">
                    <span style="font-size: 3rem;">🔒</span>
                    <h2>Unlock Advanced Candidate Search</h2>
                    <p>Upgrade to **Myway Premium** to filter Liberian talent by persona, skill sets, and location.</p>
                    <div style="margin: 20px 0;">
                        <ul style="list-style: none; padding: 0; color: var(--text-light);">
                            <li>✅ Filter by Career Persona (Leader, Analyst, etc.)</li>
                            <li>✅ Export candidate shortlists to CSV</li>
                            <li>✅ Direct messaging to top-tier graduates</li>
                        </ul>
                    </div>
                    <button id="upgrade-btn" style="max-width: 300px; background: var(--secondary-color);">Upgrade Now - $25/mo</button>
                </div>
            `;

            document.getElementById('upgrade-btn').onclick = () => {
                // Simulation: Update user object to premium
                user.isPremium = true;
                localStorage.setItem('myway_user', JSON.stringify(user));
                alert("Welcome to Myway Premium! Advanced features unlocked.");
                renderDashboard(user);
                startCandidateSearch(user);
            };
            return;
        }

        // Premium View
        dashboardContent.innerHTML = `
            <div class="job-search-header">
                <h2>Advanced Candidate Search</h2>
                <div class="filter-controls">
                    <select id="persona-filter-search">
                        <option value="all">All Personas</option>
                        <option value="Leader">Leaders</option>
                        <option value="Analyst">Analysts</option>
                        <option value="Creative">Creatives</option>
                    </select>
                </div>
            </div>
            <div class="dashboard-grid" id="candidate-results">
                ${mockPeers.map(peer => `
                    <div class="card-item">
                        <div style="display:flex; justify-content:space-between;">
                            <strong>${peer.name}</strong>
                            <span class="job-badge">${peer.persona}</span>
                        </div>
                        <p><small>${peer.role} • ${peer.location}</small></p>
                        <button class="nav-item" style="margin-top:10px; font-size:0.8rem;">View Full Profile</button>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.getElementById('persona-filter-search').onchange = (e) => {
            const filter = e.target.value;
            const results = document.getElementById('candidate-results');
            // Filtering logic would go here in a production app
            alert(`Filtering for ${filter}... (Feature enabled for PRO)`);
        };
    };

    // 21. Employer Analytics Logic
    const startEmployerAnalytics = (user) => {
        dashboardContent.innerHTML = `
            <h2>Recruitment Analytics</h2>
            <div class="dashboard-grid">
                <div class="card-item stat-card">
                    <div style="font-size: 1.5rem; font-weight: 800;">452</div>
                    <div style="font-size: 0.8rem; color: var(--text-light);">Total Profile Views</div>
                </div>
                <div class="card-item stat-card">
                    <div style="font-size: 1.5rem; font-weight: 800;">12</div>
                    <div style="font-size: 0.8rem; color: var(--text-light);">Active Job Posts</div>
                </div>
            </div>
            <div class="insights-grid">
                <div class="card-item">
                    <h3>Applicant Funnel</h3>
                    <div class="chart-container">
                        <div class="funnel-step" style="width: 100%">Views: 1,200</div>
                        <div class="funnel-step" style="width: 60%">Applications: 720</div>
                        <div class="funnel-step" style="width: 30%">Shortlisted: 216</div>
                        <div class="funnel-step" style="width: 10%">Hired: 21</div>
                    </div>
                </div>
                <div class="card-item">
                    <h3>Persona Distribution</h3>
                    <p>The majority of your applicants are <strong>Analysts</strong> (45%).</p>
                    <p>Consider targeting <strong>Leaders</strong> to balance your team.</p>
                </div>
            </div>
        `;
    };

    // 22. Settings & Infrastructure Logic
    const startSettings = (user) => {
        const currentLite = localStorage.getItem('myway_lite') === 'true';
        const currentLang = localStorage.getItem('myway_lang') || 'en';

        dashboardContent.innerHTML = `
            <h2>System Settings</h2>
            <div class="card-item">
                <div class="settings-group">
                    <h3>Infrastructure & Data</h3>
                    <div class="toggle-container">
                        <span><strong>Lite Mode (Data Saver)</strong><br><small>Strips shadows and animations to save battery and data.</small></span>
                        <input type="checkbox" id="lite-mode-check" ${currentLite ? 'checked' : ''} style="width: 40px;">
                    </div>
                </div>
                <div class="settings-group">
                    <h3>Localization</h3>
                    <p>Select your preferred tone for Myway.</p>
                    <select id="lang-select">
                        <option value="en" ${currentLang === 'en' ? 'selected' : ''}>Standard English</option>
                        <option value="lr" ${currentLang === 'lr' ? 'selected' : ''}>Liberian English</option>
                    </select>
                </div>
                <button id="save-settings-btn">Apply Preferences</button>
            </div>
        `;

        document.getElementById('save-settings-btn').onclick = () => {
            const isLite = document.getElementById('lite-mode-check').checked;
            const lang = document.getElementById('lang-select').value;

            localStorage.setItem('myway_lite', isLite);
            localStorage.setItem('myway_lang', lang);

            if (isLite) document.body.classList.add('lite-mode');
            else document.body.classList.remove('lite-mode');

            alert("Settings updated. Refreshing dashboard...");
            location.reload();
        };
    };

    // 16. Virtual Events Logic (Idea #11)
    const startVirtualEvents = (user) => {
        dashboardContent.innerHTML = `
            <div class="calendar-container">
                <div class="calendar-header">
                    <h2>Upcoming Career Workshops</h2>
                    <p>April 2024</p>
                </div>
                <div class="event-list">
                    ${mockEvents.map(event => {
                        const dateObj = new Date(event.date);
                        const day = dateObj.getDate();
                        const month = dateObj.toLocaleString('default', { month: 'short' });
                        return `
                            <div class="event-item">
                                <div class="event-date-box">
                                    <span class="day">${day}</span>
                                    <span class="month">${month}</span>
                                </div>
                                <div class="event-info">
                                    <h4>${event.title}</h4>
                                    <p>${event.time} • ${event.type}</p>
                                    <p>${event.description}</p>
                                </div>
                                <div class="event-action">
                                    <button class="nav-item">Join Event</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    };

    // 18. Mentorship Request Logic (Student)
    const startMentorshipRequest = (user) => {
        dashboardContent.innerHTML = `
            <div class="form-card" style="margin:0; width:100%; max-width:600px;">
                <h2>Request a Mentor</h2>
                <p>Select a topic and tell us how a counselor can help you.</p>
                <form id="mentorship-form">
                    <label>Mentorship Topic</label>
                    <select id="mentor-topic" required>
                        <option value="Career Planning">Career Planning</option>
                        <option value="Interview Prep">Interview Prep</option>
                        <option value="Skill Development">Skill Development</option>
                        <option value="Job Search Strategy">Job Search Strategy</option>
                    </select>
                    <label>How can we help?</label>
                    <textarea id="mentor-msg" placeholder="Tell us more about your needs..." required style="width:100%; height:120px; padding:10px; border-radius:8px; border:1px solid #ddd; margin:10px 0;"></textarea>
                    <button type="submit">Submit Request</button>
                </form>
            </div>
        `;

        document.getElementById('mentorship-form').onsubmit = (e) => {
            e.preventDefault();
            const requests = JSON.parse(localStorage.getItem('myway_mentorship_requests')) || [];
            requests.push({
                id: Date.now(),
                studentName: user.name,
                studentEmail: user.email,
                topic: document.getElementById('mentor-topic').value,
                message: document.getElementById('mentor-msg').value,
                status: 'Pending',
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('myway_mentorship_requests', JSON.stringify(requests));
            alert("Your request has been submitted successfully!");
            renderDashboard(user);
        };
    };

    // 19. Match Requests Logic (Counselor)
    const startMatchRequests = (user) => {
        const requests = JSON.parse(localStorage.getItem('myway_mentorship_requests')) || [];
        
        dashboardContent.innerHTML = `
            <h2>Mentorship Match Requests</h2>
            <p>Manage and process student requests for one-on-one sessions.</p>
            <table class="data-table">
                <thead>
                    <tr><th>Student</th><th>Topic</th><th>Date</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                    ${requests.length === 0 ? '<tr><td colspan="5" style="text-align:center;">No requests found.</td></tr>' : 
                      requests.map(req => `
                        <tr>
                            <td><strong>${req.studentName}</strong><br><small>${req.studentEmail}</small></td>
                            <td>${req.topic}</td>
                            <td>${req.date}</td>
                            <td><span class="status-pill status-${req.status.toLowerCase()}">${req.status}</span></td>
                            <td>
                                ${req.status === 'Pending' ? `
                                    <button class="status-btn" data-id="${req.id}" data-status="Accepted" style="width:auto; padding:5px 10px; font-size:0.8rem; background:#4caf50; border:none; color:white; border-radius:4px; cursor:pointer;">Accept</button>
                                    <button class="status-btn" data-id="${req.id}" data-status="Declined" style="width:auto; padding:5px 10px; font-size:0.8rem; background:#f44336; border:none; color:white; border-radius:4px; cursor:pointer; margin-left:5px;">Decline</button>
                                ` : 'Processed'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.onclick = (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const newStatus = e.target.getAttribute('data-status');
                const reqs = JSON.parse(localStorage.getItem('myway_mentorship_requests')) || [];
                const idx = reqs.findIndex(r => r.id === id);
                if (idx !== -1) {
                    reqs[idx].status = newStatus;
                    if (newStatus === 'Accepted') reqs[idx].counselorEmail = user.email;
                    localStorage.setItem('myway_mentorship_requests', JSON.stringify(reqs));
                    startMatchRequests(user);
                }
            };
        });
    };

    // 20. Direct Messaging Logic
    const startMessages = (user) => {
        // Ensure timestamp is updated when the messaging view is loaded
        localStorage.setItem(`myway_last_msg_view_${user.email}`, Date.now());

        const requests = JSON.parse(localStorage.getItem('myway_mentorship_requests')) || [];
        const manuallyUnread = JSON.parse(localStorage.getItem(`myway_manual_unread_${user.email}`)) || [];
        const acceptedMatches = requests.filter(r => 
            r.status === 'Accepted' && (r.studentEmail === user.email || r.counselorEmail === user.email)
        );

        dashboardContent.innerHTML = `
            <h2>My Messages</h2>
            <div class="messages-layout">
                <div class="contacts-pane">
                    <div class="pane-header">Conversations</div>
                    <div id="contacts-list">
                        ${acceptedMatches.map(match => {
                            const contactName = user.role === 'student' ? 'Career Counselor' : match.studentName;
                            const contactEmail = user.role === 'student' ? match.counselorEmail : match.studentEmail;
                            const isUnread = manuallyUnread.includes(contactEmail);
                            return `
                                <div class="contact-item ${isUnread ? 'unread-manual' : ''}" data-email="${contactEmail}" data-name="${contactName}">
                                    <div class="registry-avatar">${contactName[0]}</div>
                                    <div class="contact-info">
                                        <h5>${contactName}</h5>
                                        <small>${match.topic}</small>
                                    </div>
                                    <button class="mark-unread-btn" data-email="${contactEmail}" title="Mark as unread">●</button>
                                </div>
                            `;
                        }).join('')}
                        ${acceptedMatches.length === 0 ? '<p style="padding:20px; font-size:0.8rem; color:#999;">No active mentorship matches found.</p>' : ''}
                    </div>
                </div>
                <div class="chat-pane" id="chat-pane">
                    <div class="no-selection">
                        <span style="font-size: 3rem;">💬</span>
                        <p>Select a contact to start messaging</p>
                    </div>
                </div>
            </div>
        `;

        document.querySelectorAll('.contact-item').forEach(item => {
            item.onclick = () => {
                document.querySelectorAll('.contact-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                renderChatWindow(user, item.getAttribute('data-email'), item.getAttribute('data-name'));
            };
        });

        document.querySelectorAll('.mark-unread-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const email = btn.getAttribute('data-email');
                let unread = JSON.parse(localStorage.getItem(`myway_manual_unread_${user.email}`)) || [];
                if (!unread.includes(email)) {
                    unread.push(email);
                    localStorage.setItem(`myway_manual_unread_${user.email}`, JSON.stringify(unread));
                    startMessages(user); // Refresh UI
                }
            };
        });
    };

    const renderChatWindow = (user, contactEmail, contactName) => {
        // Clear manual unread status for this contact when chat is opened
        let manuallyUnread = JSON.parse(localStorage.getItem(`myway_manual_unread_${user.email}`)) || [];
        if (manuallyUnread.includes(contactEmail)) {
            manuallyUnread = manuallyUnread.filter(email => email !== contactEmail);
            localStorage.setItem(`myway_manual_unread_${user.email}`, JSON.stringify(manuallyUnread));
        }

        const chatPane = document.getElementById('chat-pane');
        chatPane.innerHTML = `
            <div class="pane-header">Chat with ${contactName}</div>
            <div class="chat-messages" id="direct-messages"></div>
            <form class="chat-input-area" id="direct-chat-form">
                <input type="text" id="direct-chat-input" placeholder="Type a message..." required>
                <button type="submit">Send</button>
            </form>
        `;

        const loadMessages = () => {
            const allMessages = JSON.parse(localStorage.getItem('myway_p2p_messages')) || [];
            const thread = allMessages.filter(m => 
                (m.from === user.email && m.to === contactEmail) || 
                (m.from === contactEmail && m.to === user.email)
            );

            const container = document.getElementById('direct-messages');
            container.innerHTML = thread.map(m => `
                <div class="message ${m.from === user.email ? 'user-message' : 'ai-message'}" 
                     style="${m.from !== user.email ? 'background:#f0f0f0; border-left:4px solid var(--secondary-color);' : ''}">
                    ${m.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                    <div style="font-size:0.7rem; opacity:0.6; margin-top:5px; text-align:right;">
                        ${new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </div>
            `).join('');
            container.scrollTop = container.scrollHeight;
        };

        document.getElementById('direct-chat-form').onsubmit = (e) => {
            e.preventDefault();
            const input = document.getElementById('direct-chat-input');
            const text = input.value;

            const allMessages = JSON.parse(localStorage.getItem('myway_p2p_messages')) || [];
            allMessages.push({
                from: user.email,
                to: contactEmail,
                text: text,
                timestamp: Date.now()
            });

            localStorage.setItem('myway_p2p_messages', JSON.stringify(allMessages));
            input.value = '';
            loadMessages();
        };

        loadMessages();
    };

    // 17. Counselor Analytics Dashboard
    const startCounselorAnalytics = (user) => {
        const stats = [
            { label: "Registered Students", value: "1,240", icon: "👥" },
            { label: "Quiz Completion Rate", value: "88%", icon: "📝" },
            { label: "AI Coach Sessions", value: "3,120", icon: "🤖" },
            { label: "Resume Exports", value: "950", icon: "📄" }
        ];

        const personaDist = [
            { label: "Leaders", value: 30 },
            { label: "Analysts", value: 25 },
            { label: "Creatives", value: 20 },
            { label: "Supporters", value: 15 },
            { label: "Explorers", value: 10 }
        ];

        dashboardContent.innerHTML = `
            <h2>Advanced Analytics Dashboard</h2>
            <div class="dashboard-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
                ${stats.map(s => `
                    <div class="card-item stat-card">
                        <div style="font-size: 2rem;">${s.icon}</div>
                        <div style="font-size: 1.5rem; font-weight: 800; margin: 10px 0;">${s.value}</div>
                        <div style="color: var(--text-light); font-size: 0.9rem;">${s.label}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="insights-grid" style="margin-top: 30px;">
                <div class="card-item">
                    <h3>Student Persona Distribution</h3>
                    <div class="bar-chart">
                        ${personaDist.map(p => `
                            <div class="bar-row">
                                <div style="width: 100px; font-size: 0.8rem;">${p.label}</div>
                                <div class="bar-bg"><div class="bar-fill-blue" style="width: ${p.value}%"></div></div>
                                <div style="font-size: 0.8rem;">${p.value}%</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="card-item">
                    <h3>Engagement Trends</h3>
                    <p>📈 <strong>15% increase</strong> in AI Coach usage this week.</p>
                    <p>🎯 Top interest: <strong>Tech & Agriculture</strong>.</p>
                    <p>📅 Upcoming peak: <strong>Tech Career Fair</strong> (300+ signups).</p>
                </div>
            </div>
        `;
    };

    // 3. Event Listeners
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUser = {
            name: document.getElementById('signup-name').value,
            email: document.getElementById('signup-email').value,
            role: document.getElementById('signup-role').value,
            id: Date.now()
        };

        localStorage.setItem('myway_user', JSON.stringify(newUser));
        renderDashboard(newUser);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        // Simple mock login: check if local storage matches
        const storedUser = JSON.parse(localStorage.getItem('myway_user'));
        
        if (storedUser && storedUser.email === email) {
            renderDashboard(storedUser);
        } else {
            alert("Account not found. Please register first.");
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('myway_user');
        location.reload();
    });

    // Toggle Forms
    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-card').style.display = 'none';
        document.getElementById('signup-card').style.display = 'block';
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('signup-card').style.display = 'none';
        document.getElementById('login-card').style.display = 'block';
    });

    // Sitemap toggle
    const toggleSitemap = () => {
        const sitemap = document.getElementById('sitemap-section');
        if (sitemap) {
            sitemap.style.display = sitemap.style.display === 'none' ? 'block' : 'none';
        }
    };

    window.toggleSitemap = toggleSitemap;

    setupCategoryButtons();
    checkSession();
});
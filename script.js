// Countdown Timer Logic Removed for Event Day

// Snow Animation Logic
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initSnow() {
    for (let i = 0; i < 300; i++) {
        snowflakes.push(new Snowflake());
    }
}

function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });

    requestAnimationFrame(animateSnow);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Accordion Logic
const accordions = document.querySelectorAll('.accordion-header');

accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        accordion.classList.toggle('active');
        const content = accordion.nextElementSibling;

        if (accordion.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.padding = "0 0 1.5rem 0";
        } else {
            content.style.maxHeight = 0;
            content.style.padding = "0";
        }
    });
});

initSnow();
animateSnow();

function toggleTeamInput(show) {
    const teamMembersGroup = document.getElementById('team-members-group');
    const teamMembersInput = document.getElementById('team-members');

    if (show) {
        teamMembersGroup.style.display = 'block';
        teamMembersInput.setAttribute('required', 'required');
    } else {
        teamMembersGroup.style.display = 'none';
        teamMembersInput.removeAttribute('required');
        teamMembersInput.value = ''; // Clear input if hidden
    }
}

// --- GOOGLE SHEETS FORM SUBMISSION LOGIC ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbx7jLm0OGke-Pf7nX_pWgwCMWwtcBBQZCCuDSWSe8yvd4d9XuAddnV_WxLum__qvDOe/exec'; // <--- PASTE YOUR URL HERE
const form = document.getElementById('registration-form');
const statusMsg = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        statusMsg.style.display = 'none';

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                statusMsg.innerText = "Registration Successful! Welcome to Jingle Jam!";
                statusMsg.style.color = "#4ade80"; // Success Green
                statusMsg.style.display = "block";
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;

                // Trigger Confetti
                var duration = 3 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }

                var interval = setInterval(function () {
                    var timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    var particleCount = 50 * (timeLeft / duration);
                    // since particles fall down, start a bit higher than random
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);
            })
            .catch(error => {
                console.error('Error!', error.message);
                statusMsg.innerText = "Something went wrong. Please try again.";
                statusMsg.style.color = "#ef4444"; // Error Red
                statusMsg.style.display = "block";
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            });
    });
}

// PDF Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pdf-modal');
    const viewBtn = document.getElementById('view-guide-btn');
    const closeBtn = document.querySelector('.close-modal');

    if (viewBtn && modal && closeBtn) {
        viewBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            // Small delay to allow display:flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Wait for transition
        });

        // Close when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    }
});

// Language Toggle Logic
// Language Toggle Logic
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const pdfFrame = document.getElementById('pdf-frame');
    const downloadLink = document.getElementById('download-link');

    if (langToggle && pdfFrame && downloadLink) {
        console.log('Initializing language toggle');
        // Remove existing listeners if any (not easily possible without reference, but this init should run once)

        langToggle.addEventListener('change', () => {
            console.log('Language toggle changed. Checked:', langToggle.checked);
            if (langToggle.checked) {
                // English Selected
                console.log('Switching to English PDF');
                pdfFrame.src = 'assets/JINGLE%20WEB%20JAM%202025%20GUIDE%20(EN2).pdf#view=FitH&navpanes=0';
                downloadLink.href = 'assets/JINGLE%20WEB%20JAM%202025%20GUIDE%20(EN2).pdf';
            } else {
                // Turkish Selected (Default)
                console.log('Switching to Turkish PDF');
                pdfFrame.src = 'assets/JINGLE%20WEB%20JAM%202025%20GUIDE%20(TR2).pdf#view=FitH&navpanes=0';
                downloadLink.href = 'assets/JINGLE%20WEB%20JAM%202025%20GUIDE%20(TR2).pdf';
            }
        });
    } else {
        console.error('PDF elements not found:', { langToggle, pdfFrame, downloadLink });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageToggle);
} else {
    initLanguageToggle();
}

// Teams Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('teams-modal');
    const btn = document.getElementById('view-teams-btn');
    const closeBtn = document.getElementById('close-teams-modal');
    const teamsContainer = document.getElementById('teams-container');
    const searchInput = document.getElementById('teams-search');

    let allTeams = [];

    if (btn && modal && closeBtn) {
        // Open Modal
        btn.onclick = function () {
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent body scroll
            if (allTeams.length === 0) {
                fetchTeams();
            }
        }

        // Close Modal
        closeBtn.onclick = function () {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }

        // Close on outside click
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

    // Fetch Teams Data
    async function fetchTeams() {
        teamsContainer.innerHTML = '<div class="loading-spinner">Loading teams...</div>';
        try {
            const response = await fetch('assets/teams.json');
            if (!response.ok) throw new Error('Failed to load teams');
            allTeams = await response.json();
            renderTeams(allTeams);
        } catch (error) {
            console.error('Error fetching teams:', error);
            teamsContainer.innerHTML = '<div class="no-results">Failed to load team data. Please try again later.</div>';
        }
    }

    // Render Teams
    function renderTeams(teams) {
        teamsContainer.innerHTML = '';

        // Add Results Info Header
        const infoHeader = document.createElement('div');
        infoHeader.className = 'results-info';
        infoHeader.innerHTML = `
            <p>Evaluation Criteria: <strong>Max Jury Score: 24</strong> | <strong>Max Bonus Score from Challenges: 16</strong></p>
            <p>Total Possible Score: <strong>40</strong></p>
        `;
        teamsContainer.appendChild(infoHeader);

        if (teams.length === 0) {
            teamsContainer.innerHTML += '<div class="no-results">No teams found matching your search.</div>';
            return;
        }

        // Sort by rank
        teams.sort((a, b) => a.rank - b.rank);

        teams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = `team-card ${team.rank === 1 ? 'gold-shimmer' : ''}`;

            let rankDisplay = `<div class="rank-badge rank-${team.rank}">${team.rank}</div>`;
            if (team.rank === 1) rankDisplay = '<div class="rank-badge rank-1">🥇 1</div>';
            if (team.rank === 2) rankDisplay = '<div class="rank-badge rank-2">🥈 2</div>';
            if (team.rank === 3) rankDisplay = '<div class="rank-badge rank-3">🥉 3</div>';

            let participationBadge = '';
            if (team.participationType) {
                participationBadge = team.participationType === 'Online'
                    ? '<span class="participation-badge online">🌐 Online</span>'
                    : '<span class="participation-badge physical">🏢 Physical</span>';
            }

            const membersHtml = team.members.map(m => `<li>${m}</li>`).join('');

            let websiteBtn = '';
            if (team.websiteLink) {
                websiteBtn = `
                    <a href="${team.websiteLink}" target="_blank" class="visit-website-btn">
                        <span>🚀</span> Visit Website
                    </a>
                `;
            }

            teamCard.innerHTML = `
                <div class="team-header">
                    ${rankDisplay}
                    <div class="team-number">Team ${team.teamNumber}</div>
                    ${participationBadge}
                </div>
                <div class="team-score">Score: ${team.score.toFixed(2)}</div>
                <ul class="team-members">
                    ${membersHtml}
                </ul>
                ${websiteBtn}
            `;

            teamsContainer.appendChild(teamCard);
        });
    }

    // Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            if (searchTerm === '') {
                renderTeams(allTeams);
                return;
            }

            const filteredTeams = allTeams.filter(team => {
                return team.members.some(member =>
                    member.toLowerCase().includes(searchTerm)
                );
            });

            renderTeams(filteredTeams);
        });
    }
});

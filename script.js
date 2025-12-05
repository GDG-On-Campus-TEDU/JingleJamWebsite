// Countdown Timer Logic
const eventDate = new Date('December 20, 2025 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    let distance = eventDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<div class="time-unit"><span>00</span><label>Event Started!</label></div>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

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

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
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

                var interval = setInterval(function() {
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

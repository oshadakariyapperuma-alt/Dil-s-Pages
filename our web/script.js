// ==== PRELOADER ====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // Wait 1.5 seconds to show the beating heart
});

// ==== FLOATING HEARTS ====
function createHeart() {
    const heart = document.createElement('i');
    heart.classList.add('fa-solid', 'fa-heart', 'floating-heart');
    
    // Randomize position, size, and duration
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7 seconds
    heart.style.fontSize = Math.random() * 15 + 10 + 'px'; // 10px-25px
    
    // Some random colors (pink/red shades)
    const colors = ['#ff4b72', '#ff8fa3', '#ff2a55', '#ffccd5'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('floating-hearts').appendChild(heart);
    
    // Remove heart after animation finishes to prevent memory leak
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Create a new heart every 300ms
setInterval(createHeart, 300);

// ==== TYPEWRITER EFFECT ====
const textToType = "For My Beautiful Girl...";
let i = 0;
const speed = 100; // Typing speed in ms
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    if (i < textToType.length) {
        typewriterElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// We will start typing effect after login
// setTimeout(typeWriter, 1800);

// ==== ELEMENTS ====
const bgMusic = document.getElementById('bg-music');
const playBtn = document.getElementById('play-music');
const playIcon = playBtn.querySelector('i');
let isPlaying = false;

// Set default volume slightly lower for ambiance
bgMusic.volume = 0.5;

// ==== LOGIN LOGIC ====
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginHint = document.getElementById('login-hint');
const loginScreen = document.getElementById('login-screen');

loginBtn.addEventListener('click', () => {
    const user = usernameInput.value.trim().toLowerCase();
    const pass = passwordInput.value.trim();

    // Check username and password
    if (user === 'dilnithi' && pass === '1006') {
        // Success
        loginScreen.classList.add('hidden');
        document.body.classList.remove('locked');
        
        // Start background music
        bgMusic.load(); // Force reload audio file
        bgMusic.play().then(() => {
            playIcon.classList.remove('fa-music');
            playIcon.classList.add('fa-pause');
            isPlaying = true;
        }).catch(e => console.log("Autoplay prevented:", e));

        // Start typing effect
        setTimeout(typeWriter, 1000);
    } else {
        // Fail
        loginHint.classList.add('visible');
        loginBtn.classList.add('shake-anim');
        setTimeout(() => loginBtn.classList.remove('shake-anim'), 400);
    }
});

// Allow pressing Enter to login
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loginBtn.click();
});
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') passwordInput.focus();
});

// ==== SCROLL REVEAL ANIMATION ====
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var j = 0; j < reveals.length; j++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[j].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[j].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// ==== MUSIC PLAYER BUTTON LOGIC ====

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-music');
        isPlaying = false;
    } else {
        bgMusic.play();
        playIcon.classList.remove('fa-music');
        playIcon.classList.add('fa-pause');
        isPlaying = true;
    }
});

// Rotate Polaroid cards slightly on load for organic look
document.querySelectorAll('.polaroid').forEach(card => {
    const randomRot = (Math.random() * 6) - 3; // -3deg to +3deg
    card.style.transform = `rotate(${randomRot}deg)`;
    
    // Ensure hover resets the base transform logic (handled in CSS but good to apply base style)
});

// ==== SECRET BIRTHDAY LOGIC ====
const secretGiftBtn = document.getElementById('secret-gift-btn');
const birthdayModal = document.getElementById('birthday-modal');
const closeModal = document.getElementById('close-modal');
const countdownView = document.getElementById('countdown-view');
const birthdayView = document.getElementById('birthday-view');
const confettiContainer = document.getElementById('confetti-container');

let countdownInterval;

secretGiftBtn.addEventListener('click', () => {
    birthdayModal.classList.remove('hidden');
    checkBirthday();
    countdownInterval = setInterval(checkBirthday, 1000);
});

closeModal.addEventListener('click', () => {
    birthdayModal.classList.add('hidden');
    clearInterval(countdownInterval);
});

function checkBirthday() {
    const now = new Date();
    const currentYear = now.getFullYear();
    // October is month 9 (0-indexed)
    let targetDate = new Date(currentYear, 9, 6); 
    
    // Check if today is the birthday!
    if (now.getMonth() === 9 && now.getDate() === 6) {
        countdownView.classList.add('hidden');
        birthdayView.classList.remove('hidden');
        createConfetti();
        if(countdownInterval) clearInterval(countdownInterval);
        return;
    }
    
    // If birthday has passed this year, set for next year
    if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 9, 6);
    }
    
    const distance = targetDate.getTime() - now.getTime();
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

function createConfetti() {
    if(confettiContainer.children.length > 0) return;
    
    const colors = ['#ff4b72', '#ffde59', '#38b6ff', '#5ce1e6', '#ff8fa3'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        confettiContainer.appendChild(confetti);
    }
}

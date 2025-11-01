// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(0,0,0,0.85)';
    navbar.style.padding = '15px 50px';
  } else {
    navbar.style.background = 'transparent';
    navbar.style.padding = '20px 60px';
  }
});


// Scroll reveal animation
const revealElements = document.querySelectorAll('.gallery-card, .section-title');

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


// Scroll fade-in for About Section
const aboutItems = document.querySelectorAll('.about-image, .about-text');

const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

aboutItems.forEach(item => aboutObserver.observe(item));


// Message typing effect
const showMessageBtn = document.querySelector('.show-message-btn');
const messageBox = document.querySelector('.message-box');
const messageText = document.querySelector('.message-text');

const message = `Sometimes, connection isn’t about time — it’s about energy.  
Some people bring calm just by being themselves, and that’s rare.  
I just wanted to say, your presence had that kind of quiet impact today.`;

let index = 0;
let isTyping = false;

showMessageBtn.addEventListener('click', () => {
  if (isTyping) return;

  showMessageBtn.style.display = 'none';
  messageBox.style.display = 'block';
  setTimeout(() => {
    messageBox.style.opacity = '1';
    messageBox.style.transform = 'translateY(0)';
  }, 100);

  isTyping = true;
  typeMessage();
});

function typeMessage() {
  if (index < message.length) {
    messageText.innerHTML += message.charAt(index);
    index++;
    setTimeout(typeMessage, 45);
  }
}


// Reflection quote typing + fade animation
const reflectionQuote = document.querySelector('.reflection-quote');
const quoteText = `"Sometimes the best art isn’t painted — it’s felt,  
in small moments, in silence, in how two stories begin to meet."`;

function revealQuote() {
  const rect = reflectionQuote.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    reflectionQuote.style.opacity = '1';
    reflectionQuote.style.transform = 'translateY(0)';
    typeReflection();
    window.removeEventListener('scroll', revealQuote);
  }
}

let reflectionIndex = 0;
function typeReflection() {
  if (reflectionIndex < quoteText.length) {
    reflectionQuote.innerHTML += quoteText.charAt(reflectionIndex);
    reflectionIndex++;
    setTimeout(typeReflection, 45);
  }
}

window.addEventListener('scroll', revealQuote);


// Button reveal for David section
const davidBtn = document.querySelector('.david-btn');
const davidReveal = document.querySelector('.david-reveal');

davidBtn.addEventListener('click', () => {
  davidReveal.style.display = 'block';
  setTimeout(() => {
    davidReveal.style.opacity = '1';
    davidReveal.innerHTML = "Every creative work I build carries a piece of curiosity — maybe that’s what makes them real.";
  }, 100);
});


// ===== Message Form + Popup + Melody =====
const form = document.getElementById('messageForm');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Play melody (simple tone using Web Audio API)
function playMelody() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const notes = [262, 294, 330, 392]; // C D E G
  let time = ctx.currentTime;

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.2, time + i * 0.2);
    osc.start(time + i * 0.2);
    osc.stop(time + i * 0.2 + 0.2);
  });
}

// Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  playMelody();
  popup.style.display = 'flex';
  form.reset();
});

// Close popup
closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});


// ===== Rating Logic =====
const rateBtn = document.getElementById('rateBtn');
const ratingInput = document.getElementById('ratingInput');
const ratingResult = document.getElementById('ratingResult');

rateBtn.addEventListener('click', () => {
  const value = parseInt(ratingInput.value);

  if (isNaN(value) || value < 1 || value > 100) {
    ratingResult.style.color = '#ff5555';
    ratingResult.textContent = 'Please enter a number between 1 and 100 😊';
    ratingResult.style.animation = 'popResult 0.3s ease';
    return;
  }

  ratingResult.style.animation = 'popResult 0.5s ease';
  ratingResult.style.color = '#00ffcc';

  if (value === 100) {
    ratingResult.innerHTML = `Perfect 🌟 — Thank you so much!<br>This site is yours now 💝`;
  } else if (value >= 70) {
    ratingResult.innerHTML = `Cool 😎 — Thanks for checking it out!<br>This site belongs to you 💫`;
  } else {
    ratingResult.innerHTML = `Thank you 💐 — I’ll make it even better for you!<br>Remember, this site is yours 💖`;
  }

  ratingInput.value = '';
});


// ===== Dynamic Year in Footer =====
document.getElementById('year').textContent = new Date().getFullYear();

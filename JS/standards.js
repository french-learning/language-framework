// === POPUP FUNCTIONALITY ===
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');
const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
const helpBtn = document.getElementById('helpBtn');

// Check if popup should be hidden
const hidePopup = localStorage.getItem('hidePopup');

// Show popup only if user hasn’t dismissed it
if (hidePopup !== 'true' && popup) {
  popup.classList.add('show');
}

// When user clicks "Close"
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    if (dontShowAgainCheckbox && dontShowAgainCheckbox.checked) {
      localStorage.setItem('hidePopup', 'true');
    }
    popup.classList.remove('show');
  });
}

// When user clicks "Help" button
if (helpBtn) {
  helpBtn.addEventListener('click', () => {
    // Clear the “do not show again” setting and re-open popup
    localStorage.removeItem('hidePopup');
    popup.classList.add('show');
  });
}

const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");
const caption = document.getElementById("caption");

let currentIndex = 0;

// Captions for each slide (now 3 slides: intro, interpretive+interpersonal, standards)
const captions = [
  "Click on the squares to select your desired proficiency standard. Use the dots to navigate through the standards guide.",
  "Interpretive and Interpersonal Communication Standards - Compare both standards side by side.",
  "Click any card to open more detailed information or resources."
];

function showSlide(index) {
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentIndex = index;

  // Hide all slides, show only current one
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");

  // Update dots
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  // Update caption
  caption.textContent = captions[index];
}

// Button listeners
nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));
prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));

// Dots click
dots.forEach(dot => {
  dot.addEventListener("click", (e) => {
    const index = parseInt(e.target.dataset.index);
    showSlide(index);
  });
});

// Initialize
showSlide(0);


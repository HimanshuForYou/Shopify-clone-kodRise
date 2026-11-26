// 1. Support service sliding effect (mobile/tablet arrows)
const track = document.querySelector('.support-service');
document.querySelector('.left-arrow').addEventListener('click', () => {
    track.scrollBy({ left: -240, behavior: 'smooth' });
});
document.querySelector('.right-arrow').addEventListener('click', () => {
    track.scrollBy({ left: 240, behavior: 'smooth' });
});

// 2. Hero section image + text + progress togglers sync
const heroSlider = document.querySelector('.hero-slider');
const heroTexts = document.querySelectorAll('.home-sub-div');
const heroDots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let slideTimer;

function goToSlide(index) {
    currentSlide = (index + heroTexts.length) % heroTexts.length;

    // Slide the background image
    heroSlider.style.transform = `translateX(-${currentSlide * 33.3333}%)`;

    // Switch the active text block
    heroTexts.forEach((text, i) => {
        text.classList.toggle('active', i === currentSlide);
    });

    // Restart the white fill animation on the active toggler
    heroDots.forEach((dot, i) => {
        dot.classList.remove('active');
        void dot.offsetWidth; // Forces browser to restart CSS animation
        if (i === currentSlide) {
            dot.classList.add('active');
        }
    });
}

function startAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 4000);
}

heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        startAutoSlide();
    });
});

startAutoSlide();

// 3. Flash sale live countdown
const countdownItems = document.querySelectorAll('.countdown-item');
let totalSeconds = (15 * 3600) + (27 * 60) + 45;

setInterval(() => {
    if (totalSeconds <= 0 || countdownItems.length < 4) return;
    totalSeconds--;

    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    countdownItems[0].textContent = d;
    countdownItems[1].textContent = String(h).padStart(2, '0');
    countdownItems[2].textContent = String(m).padStart(2, '0');
    countdownItems[3].textContent = String(s).padStart(2, '0');
}, 1000);

// 4. Trending now carousel + bottom progress bar sync
const trendGrid = document.querySelector('.trending-grid');
const trendPrev = document.querySelector('.trend-prev');
const trendNext = document.querySelector('.trend-next');
const scrollThumb = document.querySelector('.scrollbar-thumb');

trendNext.addEventListener('click', () => {
    trendGrid.scrollBy({ left: trendGrid.clientWidth * 0.65, behavior: 'smooth' });
});

trendPrev.addEventListener('click', () => {
    trendGrid.scrollBy({ left: -trendGrid.clientWidth * 0.65, behavior: 'smooth' });
});

trendGrid.addEventListener('scroll', () => {
    const maxScroll = trendGrid.scrollWidth - trendGrid.clientWidth;
    const progress = maxScroll > 0 ? trendGrid.scrollLeft / maxScroll : 0;

    // Move the dark scrollbar thumb across the track
    const maxThumbMove = 100 - 62.5;
    scrollThumb.style.left = `${progress * maxThumbMove}%`;

    // Show/hide left and right arrows at the ends
    trendPrev.style.opacity = trendGrid.scrollLeft > 10 ? '1' : '0';
    trendPrev.style.pointerEvents = trendGrid.scrollLeft > 10 ? 'auto' : 'none';
    trendNext.style.opacity = trendGrid.scrollLeft >= maxScroll - 10 ? '0' : '1';
    trendNext.style.pointerEvents = trendGrid.scrollLeft >= maxScroll - 10 ? 'none' : 'auto';
});
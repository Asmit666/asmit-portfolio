/* =========================================
   1. EMERGENCY SCROLL & REFRESH FIXES
   ========================================= */
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

/* =========================================
   2. MOBILE NAVIGATION LOGIC
   ========================================= */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('menu-overlay');
const body = document.body;

function toggleMenu() {
    const isMobile = window.innerWidth <= 768;

    if (navLinks) navLinks.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('toggle');
    if (overlay) overlay.classList.toggle('active');

    if (isMobile && navLinks && navLinks.classList.contains('active')) {
        body.classList.add('no-scroll');
    } else {
        body.classList.remove('no-scroll');
    }
}

if (hamburger) hamburger.addEventListener('click', toggleMenu);
if (overlay) overlay.addEventListener('click', toggleMenu);

if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) toggleMenu();
        });
    });
}

/* =========================================
   3. OPTIMIZED REVEAL LOGIC
   ========================================= */
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            el.classList.add("active");
        }
    });
}

/* =========================================
   4. FLOWCHART SLIDER LOGIC
   ========================================= */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const slideInterval = 3000; // Normal auto-slide time (3 seconds)
const resumeDelay = 3000;   // Wait time after user's last click (3 seconds)

if (slides.length > 0) {
    let currentSlide = 0;
    let autoSlide;          // Timer for sliding
    let interactionTimer;   // Timer for waiting after user clicks

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    // Function to start the automatic loop
    function startAutoSlide() {
        clearInterval(autoSlide); // Safety check to prevent double-speed bug
        autoSlide = setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, slideInterval);
    }

    // Function to Pause and Resume later
    function resetAutoSlide() {
        clearInterval(autoSlide); // Stop the slider immediately
        clearTimeout(interactionTimer); // Reset the waiting clock

        // Start a countdown. If user doesn't click for 6 seconds, resume auto-slide
        interactionTimer = setTimeout(() => {
            startAutoSlide();
        }, resumeDelay);
    }

    // 1. Start it when the page loads
    startAutoSlide();

    // 2. Buttons with the new 'resetAutoSlide' logic
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
            resetAutoSlide(); // Trigger the pause & resume logic
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
            resetAutoSlide();
        });
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetAutoSlide();
            });
        });
    }
}

/* =========================================
   5. INITIALIZATION & CLEANUP
   ========================================= */
/* =========================================
   5. INITIALIZATION & CLEANUP
   ========================================= */
function initPage() {
    setTimeout(() => {
        body.classList.remove('no-scroll');
        if (navLinks) navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('toggle');
        if (overlay) overlay.classList.remove('active');

        // YAHAN FIX HAI: Check karo ki URL me koi #id toh nahi hai
        if (!window.location.hash) {
            // Agar koi # nahi hai, toh normally top par jao
            window.scrollTo(0, 0);
        } else {
            // Agar # hai (jaise #cinematic-showcase), toh us section par smoothly scroll karo
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        reveal();
    }, 50);
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", initPage);



/* =========================================
   6. GRAPHIC SHOWCASE SLIDER (Auto-Slide & Dots)
   ========================================= */
const gfxSlides = document.querySelectorAll('.gfx-slide');
const gfxDots = document.querySelectorAll('.gfx-dot');
const gfxNext = document.getElementById('gfxNextBtn');
const gfxPrev = document.getElementById('gfxPrevBtn');

if (gfxSlides.length > 0) {
    let gfxIndex = 0;
    let gfxAutoTimer;

    function updateGfxSlide(index) {
        gfxSlides.forEach(s => s.classList.remove('active'));
        gfxDots.forEach(d => d.classList.remove('active'));

        if (index >= gfxSlides.length) gfxIndex = 0;
        else if (index < 0) gfxIndex = gfxSlides.length - 1;
        else gfxIndex = index;

        gfxSlides[gfxIndex].classList.add('active');
        if (gfxDots[gfxIndex]) gfxDots[gfxIndex].classList.add('active');
    }

    // Function to start/restart the auto-timer
    function startGfxAuto() {
        clearInterval(gfxAutoTimer);
        gfxAutoTimer = setInterval(() => {
            updateGfxSlide(gfxIndex + 1);
        }, 4000); // 4 seconds delay
    }

    // Start it
    startGfxAuto();

    // User Interaction Fix: Pause auto-slide when user clicks
    function resetGfxTimer() {
        clearInterval(gfxAutoTimer);
        setTimeout(startGfxAuto, 3000); // Resume after 3 seconds of inactivity
    }

    if (gfxNext) {
        gfxNext.addEventListener('click', () => {
            updateGfxSlide(gfxIndex + 1);
            resetGfxTimer();
        });
    }

    if (gfxPrev) {
        gfxPrev.addEventListener('click', () => {
            updateGfxSlide(gfxIndex - 1);
            resetGfxTimer();
        });
    }

    // Dots click logic
    gfxDots.forEach((dot, dIdx) => {
        dot.addEventListener('click', () => {
            updateGfxSlide(dIdx);
            resetGfxTimer();
        });
    });
}













// 1. Set/Model Switcher
const aiWrapper = document.getElementById('aiWrapper');
const aiNext = document.getElementById('aiNext');
const aiPrev = document.getElementById('aiPrev');
let currentSet = 0;

aiNext.onclick = () => {
    if (currentSet < 2) {
        currentSet++;
        aiWrapper.style.transform = `translateX(-${currentSet * 33.333}%)`;
    }
};

aiPrev.onclick = () => {
    if (currentSet > 0) {
        currentSet--;
        aiWrapper.style.transform = `translateX(-${currentSet * 33.333}%)`;
    }
};

// 2. Drag Logic for All Sliders
const containers = document.querySelectorAll('.comparison-container');

containers.forEach(container => {
    const before = container.querySelector('.img-before');
    const beforeImg = before.querySelector('img');
    const slider = container.querySelector('.comparison-slider');

    // FIX 1: Properly declare the dragging state variable
    let isDragging = false; 

    // FIX 2: Prevent initial load squeezing by locking width immediately
    const setInitialWidth = () => {
        const rect = container.getBoundingClientRect();
        if (beforeImg) {
            beforeImg.style.width = rect.width + "px";
            beforeImg.style.height = rect.height + "px";
        }
    };
    
    // Set width on load and whenever the screen is resized
    setInitialWidth();
    window.addEventListener('resize', setInitialWidth);

    const drag = (e) => {
        if (!isDragging) return;
        
        // Prevent default behavior to stop text/image selection highlighting
        if (e.cancelable) e.preventDefault(); 

        let xPos = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let rect = container.getBoundingClientRect();
        let offset = xPos - rect.left;

        if (offset < 0) offset = 0;
        if (offset > rect.width) offset = rect.width;

        let percent = (offset / rect.width) * 100;
        
        // Move the mask and the slider handle
        before.style.width = percent + "%";
        slider.style.left = percent + "%";
        
        // Keep the image inside perfectly static
        if (beforeImg) {
            beforeImg.style.width = rect.width + "px"; 
            beforeImg.style.height = rect.height + "px";
        }
    };

    const startDragging = (e) => {
        isDragging = true; // Activate dragging state
        drag(e); // Trigger one frame immediately so it snaps to touch/click
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag, { passive: false });
    };

    const stopDragging = () => {
        isDragging = false; // Deactivate dragging state
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('touchmove', drag);
    };

    // Event Listeners
    slider.addEventListener('mousedown', startDragging);
    container.addEventListener('touchstart', startDragging, { passive: false });
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
});
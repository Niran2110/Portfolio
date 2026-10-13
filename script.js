/* =========================================================
   NIRANJAN JAGTAP — DEVELOPER PORTFOLIO
   SCRIPT.JS
========================================================= */

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
    initializePreloader();
    initializeNavbar();
    initializeMobileMenu();
    initializeThemeToggle();
    initializeTypingAnimation();
    initializeScrollReveal();
    initializeActiveNavigation();
    // initializeBackToTop();
    // initializeContactForm();
    initializeStatsCounter();
    initializeSkillCategories();
    initializeCertificateCarousel();

    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    });

/* ==================== 01. PRELOADER ==================== */

function initializePreloader() {
    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    const hidePreloader = () => {
        preloader.classList.add("loaded");
    };

    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader, {
            once: true
        });
    }

    // Safety timeout
    window.setTimeout(hidePreloader, 2500);
}

/* ==================== 02. NAVBAR SCROLL EFFECT ==================== */

function initializeNavbar() {
    const header = document.getElementById("header");

    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 30);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });
}

/* ==================== 03. MOBILE NAVIGATION ==================== */

function initializeMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;

    const menuIcon = menuToggle.querySelector("i");
    const links = navLinks.querySelectorAll("a");

    function openMenu() {
        navLinks.classList.add("active");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        if (menuIcon) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
        }
    }

    function closeMenu() {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        if (menuIcon) {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu after clicking a navigation link
    links.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu using Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Close menu when returning to desktop width
    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            closeMenu();
        }
    });
}

/* ==================== 04. DARK / LIGHT THEME ==================== */

function initializeThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector("i");

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (error) {
        // Storage may be unavailable.
    }

    const initialTheme =
        savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : "dark";

    function applyTheme(theme) {
        const isLight = theme === "light";

        document.body.classList.toggle("light-theme", isLight);

        if (themeIcon) {
            themeIcon.classList.toggle("fa-moon", !isLight);
            themeIcon.classList.toggle("fa-sun", isLight);
        }

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark theme"
                : "Switch to light theme"
        );

        themeToggle.setAttribute(
            "title",
            isLight
                ? "Switch to dark theme"
                : "Switch to light theme"
        );

        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            // Theme switching still works without storage.
        }
    }

    applyTheme(initialTheme);

    themeToggle.addEventListener("click", () => {
        const isLight =
            document.body.classList.contains("light-theme");

        applyTheme(isLight ? "dark" : "light");
    });
}

/* ==================== 05. TYPING ANIMATION ==================== */

function initializeTypingAnimation() {
    const typedText = document.querySelector(".typed-text");

    if (!typedText) return;

    const words = [
        "web.",
        "software.",
        "AI solutions.",
        "full-stack apps.",
        "blockchain apps."
    ];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        typedText.textContent = "web.";
        return;
    }

    let wordIndex = 0;
    let characterIndex = words[0].length;
    let deleting = true;

    const typingSpeed = 85;
    const deletingSpeed = 45;
    const pauseAfterTyping = 1200;
    const pauseAfterDeleting = 300;

    function type() {
        const currentWord = words[wordIndex];

        if (deleting) {
            characterIndex--;

            typedText.textContent = currentWord.substring(
                0,
                Math.max(0, characterIndex)
            );

            if (characterIndex <= 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;

                window.setTimeout(type, pauseAfterDeleting);
                return;
            }

            window.setTimeout(type, deletingSpeed);
            return;
        }

        const nextWord = words[wordIndex];

        characterIndex++;

        typedText.textContent = nextWord.substring(
            0,
            characterIndex
        );

        if (characterIndex >= nextWord.length) {
            deleting = true;

            window.setTimeout(type, pauseAfterTyping);
            return;
        }

        window.setTimeout(type, typingSpeed);
    }

    window.setTimeout(type, 1000);
}

/* ==================== 06. SCROLL REVEAL ANIMATIONS ==================== */

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    // Animate only once
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

/* ==================== 07. ACTIVE NAVIGATION LINK ==================== */

function initializeActiveNavigation() {
    const sections = [
    ...document.querySelectorAll("main section[id]")
].filter((section) =>
    document.querySelector(
        `.nav-links .nav-link[href="#${section.id}"]`
    )
);

    const navLinks = document.querySelectorAll(
        ".nav-links .nav-link"
    );

    if (!sections.length || !navLinks.length) return;

    function updateActiveLink() {
        const marker = window.scrollY + 160;
        let currentSection = "";

        sections.forEach((section) => {
            if (marker >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const targetId = href.slice(1);

            link.classList.toggle(
                "active",
                targetId === currentSection
            );
        });
    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });
}

/* ==================== 08. BACK TO TOP ==================== */

// function initializeBackToTop() {
//     const backToTop = document.getElementById("backToTop");

//     if (!backToTop) return;

//     function updateButton() {
//         backToTop.classList.toggle(
//             "visible",
//             window.scrollY > 450
//         );
//     }

//     updateButton();

//     window.addEventListener("scroll", updateButton, {
//         passive: true
//     });

//     backToTop.addEventListener("click", () => {
//         const reducedMotion = window.matchMedia(
//             "(prefers-reduced-motion: reduce)"
//         ).matches;

//         window.scrollTo({
//             top: 0,
//             behavior: reducedMotion ? "auto" : "smooth"
//         });
//     });
// }

/* ==================== 09. CONTACT FORM ==================== */

// function initializeContactForm() {
//     const contactForm = document.getElementById("contactForm");
//     const formStatus = document.getElementById("formStatus");

//     if (!contactForm || !formStatus) return;

//     contactForm.addEventListener("submit", (event) => {
//         event.preventDefault();

//         if (!contactForm.checkValidity()) {
//             contactForm.reportValidity();
//             return;
//         }

//         const formData = new FormData(contactForm);

//         const name = String(
//             formData.get("name") || ""
//         ).trim();

//         const email = String(
//             formData.get("email") || ""
//         ).trim();

//         const subject = String(
//             formData.get("subject") || ""
//         ).trim();

//         const message = String(
//             formData.get("message") || ""
//         ).trim();

//         if (!name || !email || !subject || !message) {
//             formStatus.textContent =
//                 "Please complete all fields before continuing.";
//             return;
//         }

//         /*
//           Frontend-only contact form.

//           This opens the visitor's default email application.
//           It does not send emails directly from the website.
//         */

//         const recipient = "niranjanjagtap9007@gmail.com";

//         const emailSubject = encodeURIComponent(subject);

//         const emailBody = encodeURIComponent(
//             `Name: ${name}\n` +
//             `Email: ${email}\n\n` +
//             `Message:\n${message}`
//         );

//         const mailtoURL =
//             `mailto:${recipient}` +
//             `?subject=${emailSubject}` +
//             `&body=${emailBody}`;

//         formStatus.textContent =
//             "Opening your email application...";

//         window.location.href = mailtoURL;
//     });
// }

/* ==================== 10. STATS COUNT-UP ANIMATION ==================== */

function initializeStatsCounter() {
    const counters = document.querySelectorAll(".count-up");

    if (!counters.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        const decimals = Number(
            counter.dataset.decimals || 0
        );

        if (!Number.isFinite(target)) return;

        // Display final values immediately for reduced motion.
        if (reducedMotion) {
            counter.textContent = target.toFixed(decimals);
            return;
        }

        let animated = false;

        function startCounter() {
            if (animated) return;

            animated = true;

            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                // Smooth ease-out animation
                const easedProgress =
                    1 - Math.pow(1 - progress, 4);

                const currentValue = target * easedProgress;

                counter.textContent = currentValue.toFixed(decimals);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toFixed(decimals);
                }
            }

            requestAnimationFrame(updateCounter);
        }

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries, currentObserver) => {
                    const isVisible = entries.some(
                        (entry) => entry.isIntersecting
                    );

                    if (isVisible) {
                        startCounter();
                        currentObserver.disconnect();
                    }
                },
                {
                    threshold: 0.4
                }
            );

            observer.observe(counter);
        } else {
            startCounter();
        }
    });
}

/* ==================== 11. CONSOLE MESSAGE ==================== */

console.log(
    "%cHello, Developer! 👋",
    "color: #a78bfa; font-size: 20px; font-weight: bold;"
);

console.log(
    "%cWelcome to Niranjan Jagtap's portfolio.",
    "color: #60a5fa; font-size: 13px;"
);

/* ================= SKILL CATEGORY FILTER ================= */

function initializeSkillCategories() {
    const categoryButtons = document.querySelectorAll(".skill-category");
    const skillCards = document.querySelectorAll(".skill-tech-card");
    const titleElement = document.getElementById("skillCategoryTitle");
    const descriptionElement = document.getElementById(
        "skillCategoryDescription"
    );
    const countElement = document.getElementById("skillCount");

    if (
        !categoryButtons.length ||
        !skillCards.length ||
        !titleElement ||
        !descriptionElement ||
        !countElement
    ) {
        return;
    }

    const categoryInformation = {
        languages: {
            title: "Languages",
            description:
                "Programming languages used for application development and problem-solving."
        },
        frontend: {
            title: "Frontend & UI",
            description:
                "Technologies for responsive interfaces and interactive web applications."
        },
        backend: {
            title: "Backend Development",
            description:
                "Server-side programming, APIs, and application architecture."
        },
        databases: {
            title: "Databases",
            description:
                "Technologies for storing, querying, and managing application data."
        },
        "ai-blockchain": {
            title: "AI & Blockchain",
            description:
                "Machine learning, text analysis, and blockchain development technologies."
        },
        tools: {
            title: "Tools & CS Fundamentals",
            description:
                "Developer tools and computer science concepts used in software development."
        }
    };

    function selectCategory(category) {
        const information = categoryInformation[category];

        if (!information) return;

        categoryButtons.forEach(function (button) {
            const isActive =
                button.dataset.skillCategory === category;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        let visibleCount = 0;

        skillCards.forEach(function (card) {
            const shouldShow = card.dataset.category === category;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        titleElement.textContent = information.title;
        descriptionElement.textContent = information.description;

        countElement.textContent =
            visibleCount + (visibleCount === 1 ? " skill" : " skills");
    }

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectCategory(button.dataset.skillCategory);
        });
    });

    // Display Languages when the page first loads.
    selectCategory("languages");
}

/* ===== CERTIFICATE CAROUSEL ===== */
function initializeCertificateCarousel() {
    const carousel = document.querySelector(".certificates-carousel");
    if (!carousel) return;

    const viewport = carousel.querySelector(".certificates-viewport");
    const track = carousel.querySelector(".certificate-track");
    const prev = carousel.querySelector(".certificate-prev");
    const next = carousel.querySelector(".certificate-next");

    if (!viewport || !track || !prev || !next) return;

    const cards = [...track.querySelectorAll(".certificate-card")];
    const currentLabel = document.querySelector(".certificate-current");
    const totalLabel = document.querySelector(".certificate-total");

    if (!cards.length) return;

    let index = 0;

    function visibleCards() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1000) return 2;
        return 5;
    }

    function updateCarousel() {
        const visible = visibleCards();
        const maxIndex = Math.max(0, cards.length - visible);

        index = Math.min(index, maxIndex);
        index = Math.max(0, index);

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;

        track.style.transform =
            `translateX(-${index * (cardWidth + gap)}px)`;

        prev.disabled = index === 0;
        next.disabled = index >= maxIndex;

        if (currentLabel) {
            currentLabel.textContent =
                String(index + 1).padStart(2, "0");
        }

        if (totalLabel) {
            totalLabel.textContent =
                String(cards.length).padStart(2, "0");
        }
    }

    prev.addEventListener("click", () => {
        index = Math.max(0, index - 1);
        updateCarousel();
    });

    next.addEventListener("click", () => {
        const maxIndex = Math.max(0, cards.length - visibleCards());
        index = Math.min(maxIndex, index + 1);
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
}

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function toggleMenu() {
    nav.classList.toggle("open");
    const isOpen = nav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"
    );
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }

        if (window.innerWidth <= 767 && nav.classList.contains("open")) {
            nav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Ouvrir le menu de navigation");
        }
    });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

function filterProjects(category) {
    projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedCategory = button.getAttribute("data-filter");
        filterProjects(selectedCategory);
    });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const projectImages = document.querySelectorAll(".project-image");

function openLightbox(image) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxClose.focus();
}

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
}

projectImages.forEach((image) => {
    image.addEventListener("click", () => {
        openLightbox(image);
    });

    image.setAttribute("tabindex", "0");

    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(image);
        }
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
    }
});

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("form-success-message");

function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.add("input-error");
    errorElement.textContent = message;
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.remove("input-error");
    errorElement.textContent = "";
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateField(input) {
    const value = input.value.trim();

    if (input.id === "name") {
        if (value === "") {
            showError(input, "Le nom est requis.");
            return false;
        }
    }

    if (input.id === "email") {
        if (value === "") {
            showError(input, "L’adresse e-mail est requise.");
            return false;
        }

        if (!validateEmail(value)) {
            showError(input, "Veuillez saisir une adresse e-mail valide.");
            return false;
        }
    }

    if (input.id === "message") {
        if (value === "") {
            showError(input, "Le message est requis.");
            return false;
        }

        if (value.length < 10) {
            showError(input, "Le message doit contenir au moins 10 caractères.");
            return false;
        }
    }

    clearError(input);
    return true;
}

[nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
        if (input.classList.contains("input-error")) {
            validateField(input);
        }
    });
});

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const isNameValid = validateField(nameInput);
        const isEmailValid = validateField(emailInput);
        const isMessageValid = validateField(messageInput);

        if (isNameValid && isEmailValid && isMessageValid) {
            successMessage.textContent = "Votre message a été envoyé avec succès.";
            contactForm.reset();
            clearError(nameInput);
            clearError(emailInput);
            clearError(messageInput);
        } else {
            successMessage.textContent = "";
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {

    // Navbar
    const navbarContainer = document.getElementById("navbar-container");

    if (navbarContainer) {
        navbarContainer.innerHTML = generateNavbar();
        initDropdowns();
    }

    // Footer
    const footerContainer = document.getElementById("footer");

    if (footerContainer) {
        footerContainer.innerHTML = FOOTER;
    }

});

/* =====================================================
   DROPDOWN LOGIC
===================================================== */

function initDropdowns() {

    document.querySelectorAll(".dropdown-title").forEach(title => {

        title.addEventListener("click", (e) => {

            e.stopPropagation();

            const dropdown = title.parentElement;

            document.querySelectorAll(".dropdown")
                .forEach(d => {
                    if (d !== dropdown) d.classList.remove("active");
                });

            dropdown.classList.toggle("active");

        });

    });

    document.addEventListener("click", closeDropdowns);
    document.addEventListener("keydown", handleEscape);

    setActiveNav();

}

function closeDropdowns() {
    document.querySelectorAll(".dropdown")
        .forEach(d => d.classList.remove("active"));
}

function handleEscape(event) {
    if (event.key === "Escape") {
        closeDropdowns();
    }
}

function setActiveNav() {

    const brand = document.querySelector(".nav-brand");
    const dropdownTitles = document.querySelectorAll(".dropdown-title");
    const tools = dropdownTitles[0];
    const guides = dropdownTitles[1];
    const company = dropdownTitles[2];

    if (!brand && dropdownTitles.length === 0) return;

    [brand, tools, guides, company].filter(Boolean).forEach(el => {
        el.classList.remove("nav-active");
    });

    const path = (window.location.pathname || "/").toLowerCase();
    const normalizedPath = path.replace(/\/+$/, "") || "/";
    const pageName = normalizedPath.split("/").pop() || "index.html";

    if (normalizedPath === "/" || pageName === "index.html") {
        brand?.classList.add("nav-active");
        return;
    }

    const toolPages = [
        "final.html",
        "gpa.html",
        "tuition.html",
        "study.html",
        "loans.html"
    ];

    const guidesPages = [
        "buying-guides.html",
        "best-laptops.html"
    ];

    const companyPages = [
        "about.html",
        "contact.html",
        "privPolicy.html",
        "termsService.html"
    ];

    if (toolPages.includes(pageName)) {
        tools?.classList.add("nav-active");
    } else if (guidesPages.includes(pageName)) {
        guides?.classList.add("nav-active");
    } else if (companyPages.includes(pageName)) {
        company?.classList.add("nav-active");
    } else if (brand) {
        brand.classList.add("nav-active");
    }

}

/* =====================================================
   NAVIGATION HELPERS
===================================================== */

/**
 * Click Atlas logo → go home
 */
function goHome() {
    window.location.href = "index.html";
}

/* =====================================================
   CLICK DROPDOWN SYSTEM
===================================================== */

/**
 * Toggle dropdown open/close
 */
function toggleDropdown(el) {

    const dropdown = el.parentElement;

    // Close other dropdowns first
    document.querySelectorAll(".dropdown")
        .forEach(d => {
            if (d !== dropdown) d.classList.remove("active");
        });

    // Toggle this one
    dropdown.classList.toggle("active");

}

/**
 * Close dropdowns when clicking outside
 */
document.addEventListener("click", function (event) {

    const isDropdown = event.target.closest(".dropdown");

    if (!isDropdown) {

        document.querySelectorAll(".dropdown")
            .forEach(d => d.classList.remove("active"));

    }

});

/* =====================================================
   ACTIVE PAGE DETECTION
===================================================== */

function setActiveNav() {

    const path = window.location.pathname;

    const brand = document.querySelector(".nav-brand");

    const tools = document.querySelectorAll(".dropdown-title")[0];
    const guides = document.querySelectorAll(".dropdown-title")[1];
    const company = document.querySelectorAll(".dropdown-title")[2];

    // Reset
    if (brand) brand.classList.remove("nav-active");
    if (tools) tools.classList.remove("nav-active");
    if (guides) guides.classList.remove("nav-active");
    if (company) company.classList.remove("nav-active");

    // Home page
    if (path.includes("index.html") || path === "/") {
        if (brand) brand.classList.add("nav-active");
    }

    // List of all tool pages
    const toolPages = [
        "final.html",
        "gpa.html",
        "tuition.html",
        "study.html",
        "loans.html"
    ];

    // Highlight Tools if we're on any tool page
    if (toolPages.some(page => path.includes(page))) {
        if (tools) {
            tools.classList.add("nav-active");
        }
    }

    // List of all guides pages
    const guidesPages = [
        "buying-guides.html",
        "best-laptops.html"
    ];

    // Highlight Guides if we're on any guides page
    if (guidesPages.some(page => path.includes(page))) {
        if (guides) {
            guides.classList.add("nav-active");
        }
    }

    // List of all company pages
    const companyPages = [
        "about.html",
        "contact.html",
        "privPolicy.html",
        "termsService.html"
    ];

    // Highlight Company if we're on any company page
    if (companyPages.some(page => path.includes(page))) {
        if (company) {
            company.classList.add("nav-active");
        }
    }

}

setActiveNav();

/* =====================================================
   ESC KEY CLOSES MENUS
===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        document.querySelectorAll(".dropdown")
            .forEach(d => d.classList.remove("active"));

    }

});
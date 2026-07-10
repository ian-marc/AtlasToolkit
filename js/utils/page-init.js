/* =====================================================
   ATLAS TOOLKIT v1.0
   PAGE INITIALIZATION UTILITY

   Handles common page setup tasks to reduce boilerplate:
   - Navbar injection
   - Footer injection
   - Common event listeners
===================================================== */

/**
 * Initialize a page with standard components
 * Call this in a DOMContentLoaded event on every page
 * 
 * @example
 * document.addEventListener('DOMContentLoaded', () => {
 *   initializePage();
 * });
 */
function initializePage() {
    injectNavbar();
    injectFooter();
}

/**
 * Inject navbar into #navbar-container
 * Already handled in navbar.js, but kept here for reference
 */
function injectNavbar() {
    const container = document.getElementById("navbar-container");
    if (container && typeof NAVBAR !== 'undefined') {
        container.innerHTML = NAVBAR;
        if (typeof initDropdowns === 'function') {
            initDropdowns();
        }
    }
}

/**
 * Inject footer into #footer element
 */
function injectFooter() {
    const footer = document.getElementById("footer");
    if (footer && typeof FOOTER !== 'undefined') {
        footer.innerHTML = FOOTER;
    }
}

/**
 * Common scroll animation helper
 * @param {HTMLElement} element - Element to scroll to
 * @param {number} delay - Delay before scrolling (ms)
 */
function smoothScrollTo(element, delay = 150) {
    setTimeout(() => {
        element.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, delay);
}

/**
 * Setup Enter key navigation between input fields
 * @param {Array} fieldIds - Array of input element IDs in order
 * @param {function} onLastEnter - Callback when Enter pressed on last field
 * 
 * @example
 * setupKeyboardNavigation(
 *   ["input1", "input2", "input3"],
 *   () => calculate()
 * );
 */
function setupKeyboardNavigation(fieldIds, onLastEnter) {
    fieldIds.forEach((id, index) => {
        const element = document.getElementById(id);
        if (!element) return;

        element.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                
                // If last field, call the callback
                if (index === fieldIds.length - 1) {
                    if (onLastEnter) onLastEnter();
                } else {
                    // Move to next field
                    document.getElementById(fieldIds[index + 1])?.focus();
                }
            }
        });
    });
}

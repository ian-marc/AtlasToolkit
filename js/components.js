/* =====================================================
   Atlas Toolkit
   Components

   Shared HTML used across every page.
===================================================== */

/* =====================================================
   WEBSITE VERSION
===================================================== */

const VERSION = "1.1.1";


/* =====================================================
   NAVBAR COMPONENT
===================================================== */

/**
 * Generate navbar with correct paths based on current page location
 */
function generateNavbar() {
    const path = window.location.pathname;
    
    // Determine if we're on a guide page or calculator page
    const isGuide = path.includes('guides/');
    const isCalculator = path.includes('calculators/');
    const isCompany = path.includes('company/');
    
    // Determine base path for links
    let basePath = '';

if (isGuide || isCompany) {
    basePath = '../calculators/';
} else if (isCalculator) {
    basePath = './';
} else {
    basePath = 'html/calculators/';
}
    
    let guidesBasePath = '';

if (isCalculator || isCompany) {
    guidesBasePath = '../guides/';
} else if (isGuide) {
    guidesBasePath = './';
} else {
    guidesBasePath = 'html/guides/';
}
    
    return `

<div class="navbar">

    <div class="nav-brand"
         onclick="window.location.href='${isGuide || isCalculator || isCompany ? '../../index.html' : 'index.html'}'">

        Atlas Toolkit

    </div>

    <div class="nav-right">

        <!-- TOOLS -->

        <div class="dropdown">

            <div class="dropdown-title">

                Tools ▼

            </div>

            <div class="dropdown-menu">

                <div class="dropdown-item"
                     onclick="window.location.href='${basePath}final.html'">

                    Final Calculator

                </div>

                <div class="dropdown-item"
                     onclick="window.location.href='${basePath}gpa.html'">

                    GPA Calculator

                </div>

                <div class="dropdown-item"
                     onclick="window.location.href='${basePath}tuition.html'">

                    Tuition Calculator

                </div>

                <div class="dropdown-item"
                     onclick="window.location.href='${basePath}study.html'">

                    Study Time Calculator

                </div>

                <div class="dropdown-item"
                     onclick="window.location.href='${basePath}loans.html'">

                    Loan Calculator

                </div>

            </div>

        </div>

        <!-- GUIDES -->

        <div class="dropdown">

            <div class="dropdown-title">

                Guides ▼

            </div>

            <div class="dropdown-menu">

                <div class="dropdown-item"
                     onclick="window.location.href='${guidesBasePath}buying-guides.html'">

                    Buying Guides

                </div>

            </div>

        </div>

        <!-- COMPANY -->

        <div class="dropdown">

            <div class="dropdown-title">

                Company ▼

            </div>

            <div class="dropdown-menu">

                <div class="dropdown-item"
                     onclick="window.location.href='${isGuide || isCalculator || isCompany ? "../company/about.html" : "html/company/about.html"}'">

                    About

                </div>

                <div class="dropdown-item"
                     onclick="window.location.href='${isGuide || isCalculator || isCompany ? "../company/contact.html" : "html/company/contact.html"}'">

                    Contact Us

                </div>

                <div class="dropdown-item"
                     onclick="window.location.href='${isGuide || isCalculator || isCompany ? "../company/privPolicy.html" : "html/company/privPolicy.html"}'">

                    Privacy Policy

                </div>

                <div class="dropdown-item"
                     onclick="window.location.href='${isGuide || isCalculator ? "../company/termsService.html" : isCompany ? "termsService.html" : "html/company/termsService.html"}'">

                    Terms of Service

                </div>

            </div>

        </div>

    </div>

</div>

`;
}

// For backwards compatibility, generate navbar on load
const NAVBAR = generateNavbar();


/* =====================================================
   FOOTER COMPONENT
===================================================== */

const FOOTER = `

<footer class="footer">

    <div class="footer-brand">

        Atlas Toolkit

    </div>

    <div class="footer-tagline">

        Fast academic tools for students.

    </div>

    <div class="footer-version">

        Version ${VERSION}

    </div>

    <div class="footer-copyright">

        © 2026 Atlas Toolkit

    </div>

</footer>

`;
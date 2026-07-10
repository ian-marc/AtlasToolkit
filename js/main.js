/* =====================================================
   Atlas Toolkit v1.0
   File: main.js

   This file controls:
   - Homepage navigation
   - Final grade calculator
   - Input validation
   - Keyboard shortcuts
   - Result animations
===================================================== */


/* =====================================================
   TOOL NAVIGATION
===================================================== */

function openTool(tool) {

    switch (tool) {

        case "final":
            window.location.href = "html/calculators/final.html";
            break;

        case "gpa":
            window.location.href = "html/calculators/gpa.html";
            break;

        case "tuition":
            window.location.href = "html/calculators/tuition.html";
            break;

        default:
            console.log("Tool not found.");

    }

}

/*
--------------------------------------------------------
Load Footer
--------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", () => {

    const footer = document.getElementById("footer");

    if (footer) {

        footer.innerHTML = FOOTER;

    }

});

/* =====================================================
   FUTURE FEATURES
===================================================== */

/*

Future versions may include:

✓ Saved classes

✓ Semester planner

✓ Student dashboard

✓ Dark mode toggle

✓ User accounts

✓ Mobile app support

*/

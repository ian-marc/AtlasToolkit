/* =====================================================
   Atlas Toolkit v1.0
   File: script.js

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
            window.location.href = "final.html";
            break;

        case "gpa":
            window.location.href = "gpa.html";
            break;

        default:
            console.log("Tool not found.");

    }

}



/* =====================================================
   FINAL GRADE CALCULATOR
===================================================== */

/**
 * Calculates the score needed on the final exam.
 *
 * Formula:
 *
 * Needed Final =
 * (Desired Grade - Current Grade × Coursework Weight)
 * -----------------------------------------------
 * Final Exam Weight
 */

function calculate() {

    //--------------------------------------------------
    // Grab all HTML elements
    //--------------------------------------------------

    const currentInput = document.getElementById("current");
    const weightInput = document.getElementById("weight");
    const desiredInput = document.getElementById("desired");

    const resultCard = document.getElementById("resultCard");
    const resultText = document.getElementById("result");
    const hintText = document.getElementById("hint");


    //--------------------------------------------------
    // Convert text to numbers
    //--------------------------------------------------

    const current = parseFloat(currentInput.value);
    const weight = parseFloat(weightInput.value);
    const desired = parseFloat(desiredInput.value);


    //--------------------------------------------------
    // Show result card
    //--------------------------------------------------

    resultCard.classList.add("show");

    // Wait briefly, then scroll to the result
setTimeout(() => {

    resultCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}, 150);


    //--------------------------------------------------
    // Make sure every field has a number
    //--------------------------------------------------

    if (
        isNaN(current) ||
        isNaN(weight) ||
        isNaN(desired)
    ) {

        resultText.innerHTML = "--";
        hintText.innerHTML = "Please fill in every field.";

        return;
    }


    //--------------------------------------------------
    // Validate ranges
    //--------------------------------------------------

    if (weight <= 0 || weight >= 100) {

        resultText.innerHTML = "--";
        hintText.innerHTML =
            "Final exam weight must be between 1% and 99%.";

        return;
    }

    if (current < 0 || current > 100) {

        resultText.innerHTML = "--";
        hintText.innerHTML =
            "Current grade must be between 0% and 100%.";

        return;
    }

    if (desired < 0 || desired > 100) {

        resultText.innerHTML = "--";
        hintText.innerHTML =
            "Desired grade must be between 0% and 100%.";

        return;
    }


    //--------------------------------------------------
    // Perform calculation
    //--------------------------------------------------

    const examWeight = weight / 100;
    const courseworkWeight = 1 - examWeight;

    let needed =

        (desired - (current * courseworkWeight))

        / examWeight;

    // Round to one decimal place to prevent floating-point errors
        needed = Math.round(needed * 10) / 10;


    //--------------------------------------------------
    // Impossible
    //--------------------------------------------------

    if (needed > 100) {

        resultText.innerHTML =
            needed.toFixed(1) + "%";

        hintText.innerHTML =
            "Unfortunately, this is above 100%, so your goal is no longer mathematically possible.";

        return;
    }


    //--------------------------------------------------
    // Already guaranteed
    //--------------------------------------------------

    if (needed <= 0) {

        resultText.innerHTML =
            "0%";

        hintText.innerHTML =
            "🎉 Congratulations! You've already secured your desired final grade.";

        return;
    }


    //--------------------------------------------------
    // Normal result
    //--------------------------------------------------

    resultText.innerHTML =
        needed.toFixed(1) + "%";

    hintText.innerHTML =
        "Good luck! You've got this.";

}



/* =====================================================
   ENTER KEY NAVIGATION
===================================================== */

/*
This allows users to move through the calculator
using only the Enter key.

Current Grade
      ↓ Enter
Final Weight
      ↓ Enter
Desired Grade
      ↓ Enter
Calculate
*/

const currentInput = document.getElementById("current");
const weightInput = document.getElementById("weight");
const desiredInput = document.getElementById("desired");

if (currentInput && weightInput && desiredInput) {

    currentInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            event.preventDefault();
            weightInput.focus();
        }

    });

    weightInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            event.preventDefault();
            desiredInput.focus();
        }

    });

    desiredInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            event.preventDefault();
            calculate();
        }

    });

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
    const resources = document.querySelectorAll(".dropdown-title")[1];

    // Reset
    if (brand) brand.classList.remove("nav-active");
    if (tools) tools.classList.remove("nav-active");
    if (resources) resources.classList.remove("nav-active");

    // Home page
    if (path.includes("index.html") || path === "/") {
        if (brand) brand.classList.add("nav-active");
    }

    // List of all tool pages
    const toolPages = [
        "final.html",
        "gpa.html"
    ];

    // Highlight Tools if we're on any tool page
    if (toolPages.some(page => path.includes(page))) {
        if (tools) {
            tools.classList.add("nav-active");
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

/* =====================================================
   ATLAS TOOLKIT v1.0
   GPA CALCULATOR
===================================================== */

/*
--------------------------------------------------------
GRADE POINT VALUES

These are the standard 4.0 GPA values used for
calculating a weighted semester GPA.
--------------------------------------------------------
*/

const gradePoints = {

    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0

};

/*
--------------------------------------------------------
Stores every course the user adds.
--------------------------------------------------------
*/

let courses = [];


/*
--------------------------------------------------------
Add a course
--------------------------------------------------------
*/

function addCourse() {

    const name =
        document.getElementById("courseName").value.trim();

    const grade =
        document.getElementById("courseGrade").value;

    const credits =
        parseInt(
            document.getElementById("courseCredits").value
        );

    if (name === "") {

        alert("Please enter a class name.");

        return;

    }

    courses.push({

        name,
        grade,
        credits

    });

    document.getElementById("courseName").value = "";

    document.getElementById("courseName").focus();

    renderCourses();

}


/*
--------------------------------------------------------
Delete a course
--------------------------------------------------------
*/

function deleteCourse(index) {

    courses.splice(index, 1);

    renderCourses();

}


/*
--------------------------------------------------------
Render every course card
--------------------------------------------------------
*/

function renderCourses() {

    const list =
        document.getElementById("courseList");

    list.innerHTML = "";

    if (courses.length === 0) {

        list.innerHTML = `

            <div class="empty-state">

                No classes added yet.

            </div>

        `;

        document.getElementById("gpaResult").innerText = "0.00";

        document.getElementById("gpaHint").innerText =
            "Add your first class to begin.";

        return;

    }

    courses.forEach((course, index) => {

        list.innerHTML += `

        <div class="course-card">

            <div class="course-header">

                <div class="course-title">

                    ${course.name}

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteCourse(${index})">

                    🗑

                </button>

            </div>

            <div class="course-details">

                <div class="detail-box">

                    <div class="detail-label">

                        Grade

                    </div>

                    <div class="detail-value">

                        ${course.grade}

                    </div>

                </div>

                <div class="detail-box">

                    <div class="detail-label">

                        Credits

                    </div>

                    <div class="detail-value">

                        ${course.credits}

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    calculateGPA();

}


/*
--------------------------------------------------------
Calculate GPA
--------------------------------------------------------
*/

function calculateGPA() {

    let totalPoints = 0;

    let totalCredits = 0;

    courses.forEach(course => {

        totalPoints +=
            gradePoints[course.grade] *
            course.credits;

        totalCredits +=
            course.credits;

    });

    const gpa =
        totalPoints / totalCredits;

    document.getElementById("gpaResult").innerText =
        gpa.toFixed(2);

    if (gpa >= 3.8) {

        document.getElementById("gpaHint").innerText =
            "Excellent work.";

    }

    else if (gpa >= 3.5) {

        document.getElementById("gpaHint").innerText =
            "You're doing great.";

    }

    else if (gpa >= 3.0) {

        document.getElementById("gpaHint").innerText =
            "Keep it up.";

    }

    else {

        document.getElementById("gpaHint").innerText =
            "There's room to improve.";

    }

}


/*
--------------------------------------------------------
Press ENTER to add class
--------------------------------------------------------
*/

const courseInput =
    document.getElementById("courseName");

if (courseInput) {

    courseInput.addEventListener("keydown", function(event){

        if(event.key === "Enter"){

            addCourse();

        }

    });

}


/*
--------------------------------------------------------
Initialize page
--------------------------------------------------------
*/

if(document.getElementById("courseList")){

    renderCourses();

}



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
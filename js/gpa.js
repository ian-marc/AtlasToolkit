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

    const nameValidation = validateNotEmpty(name, "class name");
    if (!nameValidation.valid) {
        alert(nameValidation.message);
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
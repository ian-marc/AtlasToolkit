/* =====================================================
   ATLAS TOOLKIT v1.0
   STUDY TIME CALCULATOR
===================================================== */

function calculateStudyTime() {
    const creditsInput = document.getElementById("credits");
    const difficultyInput = document.getElementById("difficulty");
    const currentInput = document.getElementById("current");
    const targetInput = document.getElementById("target");
    const daysInput = document.getElementById("days");

    const resultCard = document.getElementById("resultCard");
    const resultText = document.getElementById("result");
    const hintText = document.getElementById("hint");

    const credits = parseFloat(creditsInput?.value);
    const difficulty = parseFloat(difficultyInput?.value);
    const current = parseFloat(currentInput?.value);
    const target = parseFloat(targetInput?.value);
    const days = parseFloat(daysInput?.value);

    resultCard.classList.add("show");
    smoothScrollTo(resultCard);

    if (!Number.isFinite(credits) || credits <= 0) {
        displayResult(resultText, hintText, "--", "Please enter a valid number of credit hours.");
        return;
    }

    if (!Number.isFinite(difficulty) || difficulty <= 0) {
        displayResult(resultText, hintText, "--", "Please choose a valid course difficulty.");
        return;
    }

    if (!Number.isFinite(current) || current < 0 || current > 100) {
        displayResult(resultText, hintText, "--", "Current grade must be between 0% and 100%.");
        return;
    }

    if (!Number.isFinite(target) || target < 0 || target > 100) {
        displayResult(resultText, hintText, "--", "Target grade must be between 0% and 100%.");
        return;
    }

    if (!Number.isFinite(days) || days <= 0) {
        displayResult(resultText, hintText, "--", "Please enter how many days you have until the exam.");
        return;
    }

    const gradeGap = target - current;

    if (gradeGap <= 0) {
        displayResult(resultText, hintText, "0.0 hrs/day", "You already meet your target grade. You can keep reviewing lightly.");
        return;
    }

    const studyHoursPerDay = ((gradeGap / 100) * credits * difficulty * 8) / Math.max(1, days / 7);
    const roundedHours = Math.max(0.5, Math.round(studyHoursPerDay * 10) / 10);

    const weeklyHours = roundedHours * 7;

    displayResult(
        resultText,
        hintText,
        `${roundedHours.toFixed(1)} hrs/day`,
        `Aim for about ${weeklyHours.toFixed(1)} study hours per week to raise your grade by ${gradeGap.toFixed(0)} points.`
    );
}

setupKeyboardNavigation(
    ["credits", "difficulty", "current", "target", "days"],
    () => calculateStudyTime()
);

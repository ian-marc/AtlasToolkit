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
    smoothScrollTo(resultCard);


    //--------------------------------------------------
    // Make sure every field has a number
    //--------------------------------------------------

    if (!areNumbersFilled(current, weight, desired)) {
        displayResult(resultText, hintText, "--", "Please fill in every field.");
        return;
    }

    //--------------------------------------------------
    // Validate ranges
    //--------------------------------------------------

    const weightValidation = validateExamWeight(weight);
    if (!weightValidation.valid) {
        displayResult(resultText, hintText, "--", weightValidation.message);
        return;
    }

    const currentValidation = validatePercentage(current, "Current grade");
    if (!currentValidation.valid) {
        displayResult(resultText, hintText, "--", currentValidation.message);
        return;
    }

    const desiredValidation = validatePercentage(desired, "Desired grade");
    if (!desiredValidation.valid) {
        displayResult(resultText, hintText, "--", desiredValidation.message);
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
        displayResult(resultText, hintText, 
            needed.toFixed(1) + "%",
            "Unfortunately, this is above 100%, so your goal is no longer mathematically possible."
        );
        return;
    }

    //--------------------------------------------------
    // Already guaranteed
    //--------------------------------------------------

    if (needed <= 0) {
        displayResult(resultText, hintText,
            "0%",
            "🎉 Congratulations! You've already secured your desired final grade."
        );
        return;
    }

    //--------------------------------------------------
    // Normal result
    //--------------------------------------------------

    displayResult(resultText, hintText,
        needed.toFixed(1) + "%",
        "Good luck! You've got this."
    );

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

setupKeyboardNavigation(
    ["current", "weight", "desired"],
    () => calculate()
);

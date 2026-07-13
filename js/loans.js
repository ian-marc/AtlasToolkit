/* =====================================================
   ATLAS TOOLKIT v1.0
   STUDENT LOAN CALCULATOR
===================================================== */

function calculateLoan() {
    const loanAmountInput = document.getElementById("loanAmount");
    const interestRateInput = document.getElementById("interestRate");
    const loanTermInput = document.getElementById("loanTerm");
    const extraPaymentInput = document.getElementById("extraPayment");

    const resultCard = document.getElementById("resultCard");
    const resultText = document.getElementById("result");
    const hintText = document.getElementById("hint");

    const loanAmount = parseFloat(loanAmountInput?.value);
    const annualRate = parseFloat(interestRateInput?.value);
    const loanTerm = parseFloat(loanTermInput?.value);
    const extraPayment = parseFloat(extraPaymentInput?.value) || 0;

    resultCard.classList.add("show");
    smoothScrollTo(resultCard);

    if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
        displayResult(resultText, hintText, "--", "Please enter a valid loan amount.");
        return;
    }

    if (!Number.isFinite(annualRate) || annualRate < 0) {
        displayResult(resultText, hintText, "--", "Please enter a valid annual interest rate.");
        return;
    }

    if (!Number.isFinite(loanTerm) || loanTerm <= 0) {
        displayResult(resultText, hintText, "--", "Please enter a valid loan term in years.");
        return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const months = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
        monthlyPayment = loanAmount / months;
    } else {
        monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    }

    const adjustedPayment = monthlyPayment + extraPayment;
    let balance = loanAmount;
    let totalPaid = 0;
    let totalInterest = 0;
    let payoffMonths = 0;

    while (balance > 0.01 && payoffMonths < 600) {
        const interest = balance * monthlyRate;
        const principal = Math.min(adjustedPayment - interest, balance);
        balance -= principal;
        totalPaid += principal + interest;
        totalInterest += interest;
        payoffMonths += 1;
    }

    const payoffYears = payoffMonths / 12;
    const formattedPayment = monthlyPayment.toFixed(2);
    const formattedTotal = totalPaid.toFixed(2);
    const formattedInterest = totalInterest.toFixed(2);

    displayResult(
        resultText,
        hintText,
        `$${formattedPayment}/mo`,
        `Estimated payoff: ${payoffYears.toFixed(1)} years. Total paid: $${formattedTotal} with $${formattedInterest} in interest.`
    );
}

setupKeyboardNavigation(
    ["loanAmount", "interestRate", "loanTerm", "extraPayment"],
    () => calculateLoan()
);

/* =====================================================
   ATLAS TOOLKIT v1.0
   VALIDATORS UTILITY

   Shared validation functions to prevent code duplication
   across calculators and tools.
===================================================== */

/**
 * Check if all fields are filled and numeric
 * @param {...values} values - One or more values to check
 * @returns {boolean} true if all are valid numbers
 */
function areNumbersFilled(...values) {
    return values.every(val => !isNaN(val) && val !== '');
}

/**
 * Validate a percentage value (0-100)
 * @param {number} value - The value to validate
 * @param {string} fieldName - Name of field for error message
 * @returns {object} {valid: boolean, message: string}
 */
function validatePercentage(value, fieldName = 'Value') {
    if (value < 0 || value > 100) {
        return {
            valid: false,
            message: `${fieldName} must be between 0% and 100%.`
        };
    }
    return { valid: true, message: '' };
}

/**
 * Validate exam weight (1-99%)
 * @param {number} weight - The weight to validate
 * @returns {object} {valid: boolean, message: string}
 */
function validateExamWeight(weight) {
    if (weight <= 0 || weight >= 100) {
        return {
            valid: false,
            message: 'Final exam weight must be between 1% and 99%.'
        };
    }
    return { valid: true, message: '' };
}

/**
 * Validate a credit hour value
 * @param {number} credits - The credits to validate
 * @returns {object} {valid: boolean, message: string}
 */
function validateCredits(credits) {
    if (credits <= 0 || credits > 6) {
        return {
            valid: false,
            message: 'Credits must be between 1 and 6.'
        };
    }
    return { valid: true, message: '' };
}

/**
 * Validate empty text field
 * @param {string} value - The text to validate
 * @param {string} fieldName - Name of field for error message
 * @returns {object} {valid: boolean, message: string}
 */
function validateNotEmpty(value, fieldName = 'Field') {
    if (value.trim() === '') {
        return {
            valid: false,
            message: `Please enter a ${fieldName.toLowerCase()}.`
        };
    }
    return { valid: true, message: '' };
}

/**
 * Display validation result to user
 * @param {HTMLElement} resultElement - Element to display result in
 * @param {HTMLElement} hintElement - Element to display message in
 * @param {string} result - The result to display (e.g. "0%", "--")
 * @param {string} message - The message/hint text
 */
function displayResult(resultElement, hintElement, result, message) {
    if (resultElement) resultElement.innerText = result;
    if (hintElement) hintElement.innerText = message;
}

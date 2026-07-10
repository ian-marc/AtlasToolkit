# Atlas Toolkit - Code Organization

This document describes the refactored structure to keep the codebase scalable and maintainable.

## 📁 File Structure

```
Atlas Toolkit/
├── css/
│   ├── style.css          ← ALL styling (global + calculator-specific)
│   └── navbar.css         ← Navbar-only styles
│
├── js/
│   ├── components.js      ← Shared HTML components (NAVBAR, FOOTER)
│   ├── navbar.js          ← Navbar initialization & interactions
│   ├── main.js            ← General page logic (footer, navigation)
│   ├── final.js           ← Final grade calculator logic
│   ├── gpa.js             ← Semester GPA calculator logic
│   │
│   └── utils/
│       ├── validators.js  ← Reusable validation functions
│       └── page-init.js   ← Reusable page initialization utilities
│
├── data/
│   └── colleges.csv       ← Static data files
│
├── index.html             ← Homepage
├── final.html             ← Final calculator page
├── gpa.html               ← GPA calculator page
├── TEMPLATE.html          ← Template for new pages (copy this!)
│
└── README.md

```

## 🎯 Key Improvements

### 1. **Single CSS File** (`css/style.css`)
- ✅ All calculator styles consolidated (no more final.css, gpa.css)
- ✅ Organized by section with clear comments
- ✅ Easier to find and update styles
- ✅ Reduces HTTP requests

### 2. **Validator Utilities** (`js/utils/validators.js`)
- ✅ Reusable validation functions
- ✅ Eliminates repeated validation logic
- ✅ Easy to extend for new validators
- ✅ Centralized error messages

**Available validators:**
```javascript
areNumbersFilled(...values)         // Check if numbers are filled
validatePercentage(value, name)     // Check 0-100 range
validateExamWeight(weight)          // Check 1-99% for exam weight
validateCredits(credits)            // Check 1-6 credit range
validateNotEmpty(value, name)       // Check text not empty
displayResult(el, hint, result, msg) // Display validation results
```

### 3. **Page Initialization** (`js/utils/page-init.js`)
- ✅ Reusable page setup functions
- ✅ Keyboard navigation simplified
- ✅ Smooth scrolling helper

**Available utilities:**
```javascript
initializePage()                    // Set up navbar & footer
setupKeyboardNavigation(ids, callback) // Auto Enter key handling
smoothScrollTo(element, delay)      // Smooth scroll with delay
```

## 🚀 Creating a New Page

1. **Copy** `TEMPLATE.html`
2. **Customize** the header, hero section, and content
3. **Create** a new `js/[tool].js` file for your logic
4. **Add** the script import to your HTML: `<script src="js/[tool].js"></script>`
5. **Use** shared utilities from `validators.js` and `page-init.js`

Example:
```html
<script src="js/components.js"></script>
<script src="js/navbar.js"></script>
<script src="js/utils/validators.js"></script>
<script src="js/utils/page-init.js"></script>
<script src="js/main.js"></script>
<script src="js/tuition.js"></script>  <!-- Your new tool -->
```

## 📝 Best Practices

### Validation
Instead of:
```javascript
if (value < 0 || value > 100) {
    resultText.innerHTML = "--";
    hintText.innerHTML = "Must be 0-100%";
    return;
}
```

Use:
```javascript
const validation = validatePercentage(value, "Field name");
if (!validation.valid) {
    displayResult(resultText, hintText, "--", validation.message);
    return;
}
```

### Keyboard Navigation
Instead of:
```javascript
input1.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input2.focus();
});
```

Use:
```javascript
setupKeyboardNavigation(["input1", "input2", "input3"], () => calculate());
```

### Smooth Scrolling
Instead of:
```javascript
setTimeout(() => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
}, 150);
```

Use:
```javascript
smoothScrollTo(element);  // Default 150ms delay
smoothScrollTo(element, 200);  // Custom delay
```

## 🔄 CSS Organization

All styles are in `style.css` with this structure:

```css
/* ================== THEME & BASE ================== */
:root { ... }
@media (prefers-color-scheme: dark) { ... }
body { ... }

/* ================== LAYOUT & COMPONENTS ================== */
.app { ... }
.hero { ... }
.grid { ... }
.card { ... }

/* ================== SPECIFIC CALCULATORS ================== */
/* Final Calculator Styles */
.field { ... }

/* GPA Calculator Styles */
select { ... }
.course-card { ... }
...

/* ================== RESPONSIVE ================== */
@media (max-width: 640px) { ... }
```

## ✨ Future Additions

When adding new tools, follow this pattern:

1. **Create** `js/[tool].js` with your logic
2. **Use** `validators.js` for validation
3. **Use** `page-init.js` for common patterns
4. **Style** in `css/style.css` under a new section
5. **Copy** `TEMPLATE.html` for the HTML structure

This keeps everything organized without creating too many files!

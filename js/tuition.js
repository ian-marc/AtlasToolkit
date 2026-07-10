/* =====================================================
   ATLAS TOOLKIT v1.0
   COLLEGE COST CALCULATOR
===================================================== */

let collegeData = [];
let selectedCollege = null;
let selectedTuitionType = 'inState';
let includeRoomBoard = true;

/* =====================================================
   LOAD COLLEGES DATA
===================================================== */

/**
 * Highlight search term in text
 * @param {string} text - The text to highlight in
 * @param {string} searchTerm - The term to highlight
 * @returns {string} HTML with highlighted spans
 */
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

/**
 * Fetch and parse colleges.csv
 */
async function loadColleges() {
    try {
        const response = await fetch('../../data/colleges.csv');
        const csv = await response.text();
        parseCollegeCSV(csv);
        populateCollegeDropdown();
    } catch (error) {
        console.error('Error loading colleges:', error);
    }
}

/**
 * Parse CSV text into array of objects
 */
function parseCollegeCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    
    collegeData = lines.slice(1).map(line => {
        const values = line.split(',');
        const college = {};
        headers.forEach((header, index) => {
            college[header.trim()] = values[index] ? values[index].trim() : '';
        });
        return college;
    });
}

/* =====================================================
   SEARCHABLE DROPDOWN
===================================================== */

const collegeSearchInput = document.getElementById('collegeSearch');
const collegeDropdown = document.getElementById('collegeDropdown');

if (collegeSearchInput) {
    collegeSearchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            collegeDropdown.innerHTML = '';
            collegeDropdown.classList.remove('active');
            return;
        }
        
        // Filter colleges
        const filtered = collegeData.filter(college =>
            college.name.toLowerCase().includes(searchTerm) ||
            college.city.toLowerCase().includes(searchTerm) ||
            college.state.toLowerCase().includes(searchTerm)
        );
        
        // Sort alphabetically by college name
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        
        // Populate dropdown
        if (filtered.length > 0) {
            collegeDropdown.innerHTML = filtered.map((college, index) => `
                <div class="dropdown-item" onclick="selectCollege(${collegeData.indexOf(college)})">
                    <div class="college-name">${highlightText(college.name, searchTerm)}</div>
                    <div class="college-location">${highlightText(college.city, searchTerm)}, ${highlightText(college.state, searchTerm)}</div>
                </div>
            `).join('');
            collegeDropdown.classList.add('active');
        } else {
            collegeDropdown.innerHTML = '<div class="dropdown-item disabled">No colleges found</div>';
            collegeDropdown.classList.add('active');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.searchable-dropdown')) {
            collegeDropdown.classList.remove('active');
        }
    });
}

/**
 * Populate initial dropdown
 */
function populateCollegeDropdown() {
    // Initially empty, user types to search
}

/**
 * Select a college from dropdown
 */
function selectCollege(index) {
    selectedCollege = collegeData[index];
    
    // Update input
    document.getElementById('collegeSearch').value = selectedCollege.name;
    collegeDropdown.classList.remove('active');
    
    // Show tuition type and room & board options
    document.getElementById('tuitionTypeContainer').classList.remove('hidden');
    document.getElementById('roomBoardContainer').classList.remove('hidden');
    document.getElementById('calculateBtn').classList.remove('hidden');
}

/* =====================================================
   TUITION TYPE SELECTION
===================================================== */

function selectTuitionType(type) {
    selectedTuitionType = type;
    
    // Update button states
    document.querySelectorAll('#tuitionTypeContainer .toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

/* =====================================================
   ROOM & BOARD TOGGLE
===================================================== */

function toggleRoomBoard(include) {
    includeRoomBoard = include;
    
    // Update button states
    document.querySelectorAll('#roomBoardContainer .toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

/* =====================================================
   CALCULATE TUITION
===================================================== */

function calculateTuition() {
    if (!selectedCollege) {
        alert('Please select a college first.');
        return;
    }
    
    const resultCard = document.getElementById('resultCard');
    const totalCostEl = document.getElementById('totalCost');
    const tuitionCostEl = document.getElementById('tuitionCost');
    const feesCostEl = document.getElementById('feesCost');
    const roomBoardCostEl = document.getElementById('roomBoardCost');
    const roomBoardItem = document.getElementById('roomBoardItem');
    const hintEl = document.getElementById('tuitionHint');
    
    // Get costs
    let tuitionCost = 0;
    if (selectedTuitionType === 'inState') {
        tuitionCost = parseInt(selectedCollege.inState) || 0;
    } else if (selectedTuitionType === 'outState') {
        tuitionCost = parseInt(selectedCollege.outState) || 0;
    } else if (selectedTuitionType === 'international') {
        tuitionCost = parseInt(selectedCollege.international) || 0;
    }
    
    const feesCost = parseInt(selectedCollege.fees) || 0;
    const roomBoardCost = includeRoomBoard ? (parseInt(selectedCollege.roomBoard) || 0) : 0;
    
    const totalCost = tuitionCost + feesCost + roomBoardCost;
    
    // Display costs
    tuitionCostEl.innerText = '$' + tuitionCost.toLocaleString();
    feesCostEl.innerText = '$' + feesCost.toLocaleString();
    roomBoardCostEl.innerText = '$' + roomBoardCost.toLocaleString();
    totalCostEl.innerText = '$' + totalCost.toLocaleString();
    
    // Show/hide room & board line item
    if (includeRoomBoard) {
        roomBoardItem.classList.remove('hidden');
    } else {
        roomBoardItem.classList.add('hidden');
    }
    
    // Display hint
    const tuitionTypeLabel = selectedTuitionType === 'inState' ? 'In-State' : 
                           selectedTuitionType === 'outState' ? 'Out-of-State' : 
                           'International';
    
    hintEl.innerText = `Annual cost for ${tuitionTypeLabel} students${includeRoomBoard ? ' (including room & board)' : ' (tuition & fees only)'}.`;
    
    // Show result
    resultCard.classList.add('show');
    smoothScrollTo(resultCard);
}

/* =====================================================
   INITIALIZE PAGE
===================================================== */

document.addEventListener('DOMContentLoaded', async () => {
    await loadColleges();
});

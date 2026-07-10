/* =========================================
   LOAD COLLEGES CSV
========================================= */

let COLLEGES = [];

async function loadColleges() {

    const response = await fetch("data/colleges.csv");
    const text = await response.text();

    const rows = text.trim().split("\n");

    const headers = rows[0].split(",");

    COLLEGES = rows.slice(1).map(row => {

        const values = row.split(",");

        let college = {};

        headers.forEach((h, i) => {
            college[h] = values[i];
        });

        // convert numbers
        college.inState = Number(college.inState);
        college.outState = Number(college.outState);
        college.international = Number(college.international);
        college.fees = Number(college.fees);

        college.home = Number(college.home);
        college.dorm = Number(college.dorm);
        college.apartment = Number(college.apartment);

        college.noMeal = Number(college.noMeal);
        college.basicMeal = Number(college.basicMeal);
        college.standardMeal = Number(college.standardMeal);
        college.premiumMeal = Number(college.premiumMeal);

        return college;

});

/* =========================================
   SORT COLLEGES A → Z
========================================= */

COLLEGES.sort((a, b) =>
    a.name.localeCompare(b.name)
);

console.log("Colleges loaded:", COLLEGES);

}
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const problemName = document.querySelector('input[type="text"]').value;
    const language = document.querySelectorAll("select")[0].value;
    const difficulty = document.querySelectorAll("select")[1].value;
    const date = document.querySelector('input[type="date"]').value;

    const problem = {
        problemName: problemName,
        language: language,
        difficulty: difficulty,
        date: date
    };

    let problems = JSON.parse(localStorage.getItem("codingProblems")) || [];

    problems.push(problem);

    localStorage.setItem("codingProblems", JSON.stringify(problems));

    alert("Coding problem saved successfully!");

    form.reset();

    displayProblems();
});


function displayProblems() {
    const problemList = document.getElementById("problemList");

    let problems = JSON.parse(localStorage.getItem("codingProblems")) || [];
    document.getElementById("totalProblems").textContent = problems.length;

document.getElementById("easyProblems").textContent =
    problems.filter(problem => problem.difficulty === "Easy").length;

document.getElementById("mediumProblems").textContent =
    problems.filter(problem => problem.difficulty === "Medium").length;

document.getElementById("hardProblems").textContent =
    problems.filter(problem => problem.difficulty === "Hard").length;

    problemList.innerHTML = "";

    problems.forEach(function(problem, index) {

        const problemCard = document.createElement("div");

        problemCard.innerHTML = `
            <h3>${problem.problemName}</h3>
            <p>Language: ${problem.language}</p>
            <p>Difficulty: ${problem.difficulty}</p>
            <p>Date: ${problem.date}</p>

            <button onclick="editProblem(${index})">Edit</button>
            <button onclick="deleteProblem(${index})">Delete</button>
        `;

        problemList.appendChild(problemCard);
    });
}


function deleteProblem(index) {
    let problems = JSON.parse(localStorage.getItem("codingProblems")) || [];

    problems.splice(index, 1);

    localStorage.setItem("codingProblems", JSON.stringify(problems));

    displayProblems();
}


function editProblem(index) {
    let problems = JSON.parse(localStorage.getItem("codingProblems")) || [];

    const newName = prompt("Enter new problem name:", problems[index].problemName);

    if (newName !== null && newName.trim() !== "") {
        problems[index].problemName = newName;

        localStorage.setItem("codingProblems", JSON.stringify(problems));

        displayProblems();
    }
}

displayProblems();
document.getElementById("searchInput").addEventListener("input", function() {
    const searchText = this.value.toLowerCase();

    const cards = document.querySelectorAll("#problemList > div");

    cards.forEach(function(card) {
        const problemName = card.querySelector("h3").textContent.toLowerCase();

        if (problemName.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
document.getElementById("difficultyFilter").addEventListener("change", function() {
    const selectedDifficulty = this.value;

    const cards = document.querySelectorAll("#problemList > div");

    cards.forEach(function(card) {
        const difficulty = card.querySelectorAll("p")[1].textContent;

        if (
            selectedDifficulty === "All" ||
            difficulty.includes(selectedDifficulty)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
document.getElementById("languageFilter").addEventListener("change", function() {
    const selectedLanguage = this.value;

    const cards = document.querySelectorAll("#problemList > div");

    cards.forEach(function(card) {
        const language = card.querySelectorAll("p")[0].textContent;

        if (
            selectedLanguage === "All" ||
            language.includes(selectedLanguage)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
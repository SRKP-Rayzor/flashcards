// Sélection des éléments du DOM
const inputList = document.getElementById("input-list");
const addCardsBtn = document.getElementById("add-cards-btn");
const insertSeparatorBtn = document.getElementById("insert-separator-btn");
const flashcardsContainer = document.getElementById("flashcards-container");
const clearAllBtn = document.getElementById("clear-all-btn");
const exportBtn = document.getElementById("export-btn");
const exportList = document.getElementById("export-list");

// Tableau pour stocker les cartes
let flashcards = [];

// Fonction pour insérer le séparateur "|"
insertSeparatorBtn.addEventListener("click", () => {
	inputList.value += " | ";
	inputList.focus();
});

// Fonction pour ajouter les cartes
addCardsBtn.addEventListener("click", () => {
	const input = inputList.value.trim();
	if (input === "") {
		alert("Veuillez insérer une liste valide.");
		return;
	}

	// Transformation de la liste en cartes
	const lines = input.split("\n");
	lines.forEach(line => {
		const [term, definition] = line.split("|").map(item => item.trim());
		if (term && definition) {
			flashcards.push({ term, definition });
			createFlashcard(term, definition);
		}
	});

	// Nettoyage du champ d'entrée
	inputList.value = "";
});

// Fonction pour créer une flashcard
function createFlashcard(term, definition) {
	const flashcard = document.createElement("div");
	flashcard.className = "flashcard";
	flashcard.textContent = term;

	// Bouton pour supprimer la carte
	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "×";
	deleteBtn.className = "delete-btn";

	deleteBtn.addEventListener("click", () => {
		const index = flashcards.findIndex(card => card.term === term && card.definition === definition);
		if (index > -1) flashcards.splice(index, 1);
		flashcard.remove();
	});

	flashcard.appendChild(deleteBtn);

	// État de la carte (recto ou verso)
	let flipped = false;
	flashcard.addEventListener("click", (e) => {
		// Empêche le clic sur le bouton de suppression de retourner la carte
		if (e.target !== deleteBtn) {
			flipped = !flipped;
			flashcard.textContent = flipped ? definition : term;
			flashcard.appendChild(deleteBtn);
			flashcard.classList.toggle("flipped", flipped);
		}
	});

	flashcardsContainer.appendChild(flashcard);
}

// Effacer toutes les cartes
clearAllBtn.addEventListener("click", () => {
	flashcards = [];
	flashcardsContainer.innerHTML = "";
});

// Fonction pour exporter les cartes
exportBtn.addEventListener("click", () => {
	const exportData = flashcards.map(card => `${card.term} | ${card.definition}`).join("\n");
	exportList.value = exportData;
});
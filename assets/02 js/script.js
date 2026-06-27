//--------------------------
//DOM Elements
//--------------------------

//--------------------------
// Event Listeners
//--------------------------

//--------------------------
//Search Function
//--------------------------

//--------------------------
//Clear Search
//--------------------------


const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResultsTitle = document.getElementById("search-results-title");
const searchResultsContainer = document.getElementById("search-results-container");
const featuredSection = document.getElementById("featured-characters-section");
const clearButton = document.getElementById("clear-button");

searchButton.addEventListener("click", searchCharacter);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchCharacter();
    }
})

clearButton.addEventListener("click", clearSearch);

async function searchCharacter() {
    const characterName = searchInput.value.trim();
    if (characterName === "") {
        featuredSection.style.display = "block";
        searchResultsContainer.innerHTML = "";
        return;
    }
    featuredSection.style.display = "none";

    const url = `https://api.potterdb.com/v1/characters?filter[name_cont]=${characterName}`;

    searchResultsTitle.textContent = "Searching the Wizarding World..."; ///add emoji or loading motion
    searchResultsContainer.innerHTML = "";
    const response = await fetch(url);
    const data = await response.json();

    if (data.data.length === 0) {
        searchResultsTitle.textContent = "No character found";
        searchResultsContainer.innerHTML = "<p>Try another spelling </p>";
        featuredSection.style.display = "block";
        return;
    }

    const characters = data.data;
    searchResultsTitle.textContent = `${characters.length} characters found for "${characterName}"`;
    searchResultsContainer.innerHTML = "";

    characters.forEach((characterData) => {
        const character = characterData.attributes;
        const image = character.image || "assets/03 images/default-character.webp.png";
        searchResultsContainer.innerHTML += `
        <div class="card">
        <img src="${image}" alt="${character.name}">
        <div class="card-content">
        <h2>${character.name}</h2>
        <p><strong>House:</strong> ${character.house || "Unknown House"}</p>
        <p><strong>Species:</strong> ${character.species || "Unknown"}</p>
        <p><strong> Nationality:</strong> ${character.nationality || "Unknown"}</p>
        <p><strong>Born:</strong> ${character.born || "Unknown"} </p>
        <a href="${character.wiki}" target="_blank">Read More</a>
        </div>
        </div>`;
    });
    searchResultsContainer.scrollIntoView({
        behavior: "smooth"
    });
}

function clearSearch() {
    searchInput.value = ""
    searchResultsTitle.textContent = "";
    searchResultsContainer.innerHTML = "";
    featuredSection.style.display = "block";
    searchInput.focus();
}
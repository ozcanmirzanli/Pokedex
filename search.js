function searchPokemon() {
  let searchInput = document.getElementById("search").value.toLowerCase();
  clearNotFoundMessage();

  if (searchInput.length === 0) {
    resetDisplayOnEmptySearch();
    return;
  }

  searchAndDisplayPokemon(searchInput);
}

function resetDisplayOnEmptySearch() {
  for (let i = 0; i < displayedPokemonNames.length; i++) {
    displayPokemon(displayedPokemonNames[i]);
  }
  loadMorePokemonBtn.style.display = "block";
}

function searchAndDisplayPokemon(searchInput) {
  let found = false;

  for (let i = 0; i < displayedPokemonNames.length; i++) {
    let name = displayedPokemonNames[i];
    if (name.toLowerCase().startsWith(searchInput)) {
      displayPokemon(name);
      found = true;
    } else {
      hidePokemon(name);
    }
  }

  clearAndShowElements(found);
}

function displayPokemon(name) {
  let miniContainer = document.getElementById(
    `pokedex-mini-container-${name.toLowerCase()}`
  );
  if (miniContainer) {
    miniContainer.style.display = "";
  }
}

function hidePokemon(name) {
  let miniContainer = document.getElementById(
    `pokedex-mini-container-${name.toLowerCase()}`
  );
  if (miniContainer) {
    miniContainer.style.display = "none";
  }
}

function clearAndShowElements(found) {
  if (!found) {
    showNotFoundMessage();
    loadMorePokemonBtn.style.display = "none";
  } else {
    clearNotFoundMessage();
    loadMorePokemonBtn.style.display = "none";
  }
}

function showNotFoundMessage() {
  if (!document.querySelector(".search-not-found")) {
    pokedexMini.innerHTML += generateDisplayNoPokemonFoundHTML();
  }
}

function clearNotFoundMessage() {
  let notFoundMessage = document.querySelector(".search-not-found");
  if (notFoundMessage) {
    notFoundMessage.remove();
  }
}

function generateDisplayNoPokemonFoundHTML() {
  return `
     <div class="search-not-found">
      <h2> No pokemon found</h2>
      <img src="img/search.png"> 
      </div>
      `;
}

function renderMiniPokedexEntry(pokemon) {
  let name = pokemon["name"];
  let image = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let types = pokemon.types.map((type) => type.type.name);
  let displayedName = displayName(name);
  let typesHtml = displayTypes(types, name);

  // Check if already rendered to avoid duplicates
  if (!document.getElementById(`pokedex-mini-container-${name}`)) {
    let pokedexId = `pokedex-mini-container-${name}`;
    pokedexMini.innerHTML += generatePokedexMiniHTML(
      pokedexId,
      name,
      displayedName,
      typesHtml,
      image
    );
    applyBackgroundColor(pokedexId, types, typeColorMap);
  }
}

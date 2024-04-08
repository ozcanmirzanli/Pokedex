async function loadMultiplePokemon() {
  showLoader();
  const initialLoad = 18; // How many Pokémon to loads initially
  const offset = 0; // Start from the first Pokémon in the list
  await loadPokemonBatch(initialLoad, offset);
  loadedPokemonCount = initialLoad;
  showLoadBtn();
}

async function loadPokemonBatch(initialLoad, offset) {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${initialLoad}&offset=${offset}`;
  const response = await fetch(url);

  const data = await response.json();

  for (let i = 0; i < data.results.length; i++) {
    await loadPokemon(data.results[i].name);
  }
}

let loadedPokemonCount = 0;

async function loadMorePokemon() {
  showLoader();
  const initialLoad = 18; // How many more Pokémon to load each time this function is called
  await loadPokemonBatch(initialLoad, loadedPokemonCount);
  loadedPokemonCount += initialLoad; // Update the count of loaded Pokémon

  const totalPokemon = 200;

  // Hide the load more button if all Pokémon have been loaded
  if (loadedPokemonCount >= totalPokemon) {
    hideLoadBtn();
  }
  showLoadBtn();
}

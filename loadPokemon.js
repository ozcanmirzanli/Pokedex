async function loadMultiplePokemon() {
  const initialLoad = 18; // How many Pokémon to loads initially
  const offset = 0; // Start from the first Pokémon in the list
  await loadPokemonBatch(initialLoad, offset);
}

async function loadPokemonBatch(initialLoad, offset) {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${initialLoad}&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();

  for (let pokemon of data.results) {
    await loadPokemon(pokemon.name);
  }
}

let loadedPokemonCount = 0; // Track how many Pokémon have been loaded

async function loadMorePokemon() {
  const initialLoad = 18; // How many more Pokémon to load each time this function is called
  await loadPokemonBatch(initialLoad, loadedPokemonCount);
  loadedPokemonCount += initialLoad; // Update the count of loaded Pokémon

  // Hide the load more button if all Pokémon have been loaded
  const totalPokemon = 100;
  if (loadedPokemonCount >= totalPokemon) {
    document.getElementById("loadMorePokemon").style.display = "none";
  }
}

loadedPokemonCount = 18;

const typeColorMap = {
  fire: "rgb(251, 108, 108)",
  grass: "rgb(76, 176, 80)",
  water: "rgb(119, 190, 254)",
  bug: "rgb(179, 230, 100)",
  normal: "rgb(167, 168, 119)",
  poison: "rgb(129, 66, 121)",
  electric: "rgb(255, 230, 1)",
  ground: "rgb(165, 42, 42)",
  fairy: "rgb(255, 192, 203)",
  fighting: "rgb(165,149,149)",
  psychic: "rgb(57,52,51)",
};

let pokedexContainer = document.getElementById("pokedex-container");
let pokedexMini = document.getElementById("pokedex-mini");
let pokedexBackground = document.getElementById("pokedex-background");
let loadMorePokemonBtn = document.getElementById("loadMorePokemon");
let sectionsContainer = document.getElementById("sections-container");
let chartContainer = document.getElementById("chart-container");
let dataContainer = document.getElementById("data-container");

let pokemonName = "bulbasaur";
let currentPokemon = pokemonName;
let displayedPokemonNames = [];
let currentPokemonNum = 1;

// prettier-ignore
async function loadPokemon(pokemonName) {
  showLoader();

  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  try {
    let response = await fetch(url);
    currentPokemon = await response.json(); 
    currentDisplayedPokemon(currentPokemon);

    const types = getPokemonTypes(currentPokemon.types);
    renderPokedex(currentPokemon["name"], currentPokemon["sprites"]["other"]["official-artwork"]["front_default"], types);
    renderPokemonInfo(currentPokemon);

    return currentPokemon;

  } finally {
    hideLoader();
    hideLoadBtn();
  }
}

function renderPokemonInfo(currentPokemon) {
  let name = currentPokemon.name;
  let image =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let types = getPokemonTypes(currentPokemon.types);
  let displayedName = displayName(name);
  let typesHtml = displayTypes(types, name);

  renderPokedexMini(name, image, types, displayedName, typesHtml);
  pokemonChartInfo(currentPokemon);
  showLoadBtn();
  showChart();
  underlineSection();
}

function pokemonChartInfo(currentPokemon) {
  const name = currentPokemon["name"];
  let labels = [];
  let dataPoints = [];
  for (let i = 0; i < currentPokemon.stats.length; i++) {
    labels.push(currentPokemon.stats[i].stat.name);
    dataPoints.push(currentPokemon.stats[i].base_stat);
  }
  const pokeChartId = `poke-chart-${name}`;

  renderChart(labels, dataPoints, pokeChartId);
}

// prettier-ignore
function renderPokedex(name, image, types) {
  pokedexContainer.innerHTML = "";
  let pokedexId = `pokedex-${name}`;
  let pokeChartId = `poke-chart-${name}`;
  let displayedName = displayName(name);
  let typesHtml = displayTypes(types, name);

pokedexContainer.innerHTML += generatePokedexDataHTML(pokedexId, displayedName, typesHtml, pokeChartId, image, name);
pokedexContainer.innerHTML += generateNextPokemonHTML()

applyBackgroundColor(pokedexId, types, typeColorMap)    
}

// prettier-ignore
function renderPokedexMini(name, image, types, displayedName, typesHtml) {
  // Check if the Pokémon name is not in the list of displayed Pokémon
  if (!displayedPokemonNames.includes(name)) {
    let pokedexId = `pokedex-mini-container-${name}`;
    pokedexMini.innerHTML += generatePokedexMiniHTML(pokedexId, name, displayedName, typesHtml, image);
    applyBackgroundColor(pokedexId, types, typeColorMap)    
    displayedPokemonNames.push(name);
  }
}

async function openStats(pokemonName) {
  pokedexBackground.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Ensure this fetches and displays the correct Pokémon based on 'name'
  let pokemon = await loadPokemon(pokemonName);
  renderPokemonInfo(pokemon);
}

function closeStats() {
  if (pokedexBackground) {
    pokedexBackground.style.display = "none";
    document.body.style.overflow = "auto";
  }
  showLoadBtn();
}

function currentDisplayedPokemon(currentPokemon) {
  if (currentPokemonNum !== currentPokemon.id) {
    currentPokemonNum = currentPokemon.id;
  }
}

async function nextPokemon(event) {
  stopPropagation(event);
  currentPokemonNum =
    currentPokemonNum >= loadedPokemonCount ? 1 : currentPokemonNum + 1;
  await openStats(currentPokemonNum);
}

async function previousPokemon(event) {
  stopPropagation(event);
  currentPokemonNum =
    currentPokemonNum <= 1 ? loadedPokemonCount : currentPokemonNum - 1;
  await openStats(currentPokemonNum);
}

searchPokemon();
loadMultiplePokemon();

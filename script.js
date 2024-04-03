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

let displayedPokemonNames = [];
let currentPokemonId = 1;

async function loadPokemon(pokemonName) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  let response = await fetch(url);
  let currentPokemon = await response.json();

  currentDisplayedPokemon(currentPokemon);

  renderPokedex(
    currentPokemon.name,
    currentPokemon.sprites.other["official-artwork"].front_default,
    currentPokemon.types.map((type) => type.type.name)
  );
  renderPokemonInfo(currentPokemon);

  return currentPokemon;
}

function renderPokemonInfo(currentPokemon) {
  let name = currentPokemon["name"];
  let image =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  let types = currentPokemon.types.map((type) => type.type.name);
  let displayedName = displayName(name);
  let typesHtml = displayTypes(types, name);

  renderPokedexMini(name, image, types, displayedName, typesHtml);
  pokemonChartInfo(currentPokemon);
}

function pokemonChartInfo(currentPokemon) {
  const name = currentPokemon["name"];
  const labels = currentPokemon.stats.map((stat) => stat.stat.name);
  const dataPoints = currentPokemon.stats.map((stat) => stat.base_stat);
  const pokeChartId = `poke-chart-${name}`;

  renderChart(labels, dataPoints, pokeChartId);
}

function displayName(name) {
  let displayedName = name[0].toUpperCase() + name.slice(1);
  return `${displayedName}`;
}

// prettier-ignore
function displayTypes(types, name) {
  let typesHtml = types.map((type) =>
  `<h4 class="pokemon-type" id="pokemon-type-${name}">${type}</h4>`
    ).join("");
  return `${typesHtml}`;
}

// prettier-ignore
function renderPokedex(name, image, types) {
  pokedexContainer.innerHTML = "";
  let pokedexId = `pokedex-${name}`;
  let pokeChartId = `poke-chart-${name}`;
  let displayedName = displayName(name);
  let typesHtml = displayTypes(types, name);

  pokedexContainer.innerHTML += generatePokedexHTML(pokedexId, displayedName, typesHtml, pokeChartId, image, name);
pokedexContainer.innerHTML += generateNextPokemonHTML()

  stylePokedex(pokedexId, types, typeColorMap);
}

// prettier-ignore
function generatePokedexHTML(pokedexId, displayedName, typesHtml, pokeChartId, image,name) {
  return /*html*/ `
  <div class="pokedex" id="${pokedexId}">
  <div class="pokedex-text">
  <h2 id="pokemon-name-${name}">${displayedName}</h2>
  ${typesHtml}
  </div>
    <img id="pokemon-image-${name}" class="pokemon-image" src=${image} />
    <div class="info-container">
  <canvas id="${pokeChartId}" width="350" height="300"></canvas>
</div>
</div>
`;
}

function generateNextPokemonHTML() {
  return /*html*/ `
<div class="next-previous-buttons">
<img onclick="previousPokemon(event)"  class="left" src="img/left.png" alt="left" />
<img onclick="nextPokemon(event)" class="right"  src="img/right.png" alt="right" />
  </div>
  `;
}

// prettier-ignore
function renderPokedexMini(name, image, types, displayedName, typesHtml) {
  // Check if the Pokémon name is not in the list of displayed Pokémon
  if (!displayedPokemonNames.includes(name)) {
    let miniContainerId = `pokedex-mini-container-${name}`;
    pokedexMini.innerHTML += generatePokedexMiniHTML(miniContainerId, name, displayedName, typesHtml, image);
    stylePokedexMini(miniContainerId, types, typeColorMap);
    
    // Add the Pokémon name to the list
    displayedPokemonNames.push(name);
  }
}

// prettier-ignore
function generatePokedexMiniHTML (miniContainerId,name, displayedName, typesHtml, image) {

  return /*html*/ `
  <div class="pokedex-mini-container" id="${miniContainerId}" onclick="openStats('${name}')">
  <div class="pokedex-text-mini">
  <h3 id="pokemon-name-${name}">${displayedName}</h3>
  ${typesHtml}
  </div>
  <img src=${image} alt="pokemon-img" />
  </div>`;
}

async function openStats(name) {
  pokedexBackground.style.display = "block";
  document.body.style.overflow = "hidden";

  const pokemon = await loadPokemon(name);
  renderPokemonInfo(pokemon);
}

function closeStats() {
  pokedexBackground.style.display = "none";
  document.body.style.overflow = "auto";
}

function setupBackgroundClose() {
  pokedexBackground.addEventListener("click", function (event) {
    // Only close if the click occurred directly on the background, not its children
    if (event.target === pokedexBackground) {
      closeStats();
    }
  });
}

function currentDisplayedPokemon(currentPokemon) {
  if (currentPokemonId !== currentPokemon.id) {
    currentPokemonId = currentPokemon.id;
  }
}

function nextPokemon(event) {
  if (event) event.stopPropagation();

  currentPokemonId =
    currentPokemonId >= loadedPokemonCount ? 1 : currentPokemonId + 1;
  loadPokemon(currentPokemonId);
}

function previousPokemon(event) {
  if (event) event.stopPropagation();

  currentPokemonId =
    currentPokemonId <= 1 ? loadedPokemonCount : currentPokemonId - 1;
  loadPokemon(currentPokemonId);
}

function stylePokedex(pokedexId, types, typeColorMap) {
  let pokedex = document.getElementById(pokedexId);

  if (pokedex) {
    const typeFound = types.find((type) => typeColorMap[type]);
    pokedex.style.backgroundColor = typeColorMap[typeFound];
  }
}

function stylePokedexMini(miniContainerId, types, typeColorMap) {
  let pokedexMini = document.getElementById(miniContainerId);

  if (pokedexMini) {
    const typeFound = types.find((type) => typeColorMap[type]);
    pokedexMini.style.backgroundColor = typeColorMap[typeFound];
  }
}

loadMultiplePokemon();
setupBackgroundClose();

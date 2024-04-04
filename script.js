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

let displayedPokemonNames = [];
let currentPokemonNum = 1;

async function loadPokemon(pokemonName) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  let response = await fetch(url);
  let currentPokemon = await response.json();

  currentDisplayedPokemon(currentPokemon);

  const types = getPokemonTypes(currentPokemon.types);

  renderPokedex(
    currentPokemon["name"],
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"],
    types
  );
  renderPokemonInfo(currentPokemon);

  return currentPokemon;
}

function renderPokemonInfo(currentPokemon) {
  let name = currentPokemon["name"];
  let image =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  const types = getPokemonTypes(currentPokemon.types);

  let displayedName = displayName(name);
  let typesHtml = displayTypes(types, name);

  renderPokedexMini(name, image, types, displayedName, typesHtml);
  pokemonChartInfo(currentPokemon);
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

function displayName(name) {
  let displayedName = name[0].toUpperCase() + name.slice(1);
  return `${displayedName}`;
}

function getPokemonTypes(typesArray) {
  let types = [];
  for (let i = 0; i < typesArray.length; i++) {
    types.push(typesArray[i].type.name);
  }
  return types;
}

// prettier-ignore
function displayTypes(types, name) {
  let typesHtml = "";
  for (let i = 0; i < types.length; i++) {
    typesHtml += `<h4 class="pokemon-type" id="pokemon-type-${name}">${types[i]}</h4>`;
  }
  return typesHtml;
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
function generatePokedexDataHTML(pokedexId, displayedName, typesHtml, pokeChartId, image, name) {
  return /*html*/ `
 ${generatePokedexInfoHTML(name, pokedexId, displayedName) }
  ${typesHtml}
  </div>
    <img id="pokemon-image-${name}" class="pokemon-image" src=${image} />
    <div class="info-container">
  <canvas id="${pokeChartId}" width="350" height="300"></canvas>
</div>
</div>
`;
}

function generatePokedexInfoHTML(name, pokedexId, displayedName) {
  return /*html*/ `
  <div class="pokedex" id="${pokedexId}" onclick="stopPropagation(event)">
  <div class="close-btn"><img src="img/close.png" alt="close" onclick="closeStats()">
  </div>
  <div class="pokemon-number">
  <p>#${currentPokemonNum}</p>
  </div>
  <div class="pokedex-text">
  <h2 id="pokemon-name-${name}">${displayedName}</h2>
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
    let pokedexId = `pokedex-mini-container-${name}`;
    pokedexMini.innerHTML += generatePokedexMiniHTML(pokedexId, name, displayedName, typesHtml, image);
    applyBackgroundColor(pokedexId, types, typeColorMap)    
    displayedPokemonNames.push(name);
  }
}

// prettier-ignore
function generatePokedexMiniHTML (pokedexId, name, displayedName, typesHtml, image) {

  return /*html*/ `
  <div class="pokedex-mini-container" id="${pokedexId}" onclick="openStats('${name}')">
  <div class="pokedex-text-mini">
  <h3 id="pokemon-name-${name}">${displayedName}</h3>
  ${typesHtml}
  </div>
  <img src=${image} alt="pokemon-img" />
  </div>`;
}

async function openStats(name) {
  pokedexBackground.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Ensure this fetches and displays the correct Pokémon based on 'name'
  let pokemon = await loadPokemon(name);
  renderPokemonInfo(pokemon);
}

function closeStats() {
  if (pokedexBackground) {
    pokedexBackground.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function currentDisplayedPokemon(currentPokemon) {
  if (currentPokemonNum !== currentPokemon.id) {
    currentPokemonNum = currentPokemon.id;
  }
}

function nextPokemon(event) {
  stopPropagation(event);

  currentPokemonNum =
    currentPokemonNum >= loadedPokemonCount ? 1 : currentPokemonNum + 1;
  loadPokemon(currentPokemonNum);
}

function previousPokemon(event) {
  stopPropagation(event);

  currentPokemonNum =
    currentPokemonNum <= 1 ? loadedPokemonCount : currentPokemonNum - 1;
  loadPokemon(currentPokemonNum);
}

function stopPropagation(event) {
  if (event) event.stopPropagation();
}

function applyBackgroundColor(pokedexId, types, typeColorMap) {
  let pokedex = document.getElementById(pokedexId);
  if (pokedex) {
    let typeFound = "";
    for (let i = 0; i < types.length; i++) {
      if (typeColorMap[types[i]]) {
        typeFound = types[i];
        break;
      }
    }
    pokedex.style.backgroundColor = typeColorMap[typeFound] || "#ffffff";
  }
}

searchPokemon();
loadMultiplePokemon();

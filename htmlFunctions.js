// prettier-ignore
function generatePokedexDataHTML(pokedexId, displayedName, typesHtml, pokeChartId, image, name) {
    return /*html*/ `
   ${generatePokedexInfoHTML(name, pokedexId, displayedName) }
    ${typesHtml}
    </div>
      <img id="pokemon-image-${name}" class="pokemon-image" src=${image} />
      <div class="info-container" id="info-container" >
      ${generatePokedexSectionsHTML()}
      <canvas class="canvas" id="${pokeChartId}" width="330" height="275"></canvas>
      <div id="data-container" class="data-container">
  </div>
  </div>
  `;
  }

function generatePokedexSectionsHTML() {
  return /*html*/ `
  <div class="section-links">
  <button id="base_stats" onclick="showChart(name)">Base Stats</button>
    <button id="about" onclick ="showAbout(currentPokemon)">About</button>
    <button id="moves" onclick ="showMoves(currentPokemon)" >Moves</button>
    </div>
  
    `;
}

function generateAboutHTML(height, weight, displayedAbilities) {
  return /*html*/ `
  <div class="about-section" id="about-section">
    <span class="about-text">Height <b>${
      height >= 1 ? height + " m" : height + " cm"
    }</b></span> 
    <span class="about-text">Weight <b>${weight} kg</b></span> 
    <span class="about-text">Abilities <b>${displayedAbilities}</b></span> 
    </div>
    `;
}

function generateMovesHTML(moves, levels) {
  let movesString = moves.join("<br>");
  return `
    <div class="moves-section" id="moves-section">
      <span style ="color: #58abf6;">Moves <br><b>${movesString}</b></span>
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

function generateDisplayNoPokemonFoundHTML() {
  return /*html*/ `
       <div class="search-not-found">
        <h2> No pokemon found</h2>
        <img src="img/search.png"> 
        </div>
        `;
}

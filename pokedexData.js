function showAbout(currentPokemon) {
  let height = +(currentPokemon.height / 10).toFixed(2) + "0";
  let weight = +(currentPokemon.weight / 10).toFixed(2);
  let abilities = currentPokemon.abilities.map(
    (ability) => ability.ability.name
  );
  document.querySelector(".canvas").style.display = "none";

  let displayedAbilities = displayAbilities(abilities);

  document.getElementById("data-container").innerHTML = "";

  document.getElementById("data-container").innerHTML = generateAboutHTML(
    height,
    weight,
    displayedAbilities
  );
}

function showMoves(currentPokemon) {
  let moves = currentPokemon.moves.map((move) => move.move.name);
  document.querySelector(".canvas").style.display = "none";

  document.getElementById("data-container").innerHTML = "";

  document.getElementById("data-container").innerHTML =
    generateMovesHTML(moves);
}

function showChart() {
  document.getElementById("data-container").innerHTML = "";
  document.querySelector(".canvas").style.display = "block";
}

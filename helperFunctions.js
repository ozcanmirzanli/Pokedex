function stopPropagation(event) {
  if (event) event.stopPropagation();
}

// prettier-ignore
function displayTypes(types, name) {
    let typesHtml = "";
    for (let i = 0; i < types.length; i++) {
      typesHtml += `<h4 class="pokemon-type" id="pokemon-type-${name}">${types[i]}</h4>`;
    }
    return typesHtml;
  }

function displayName(name) {
  let displayedName = name[0].toUpperCase() + name.slice(1);
  return `${displayedName}`;
}

function displayAbilities(abilities) {
  let displayedAbilities = [];

  for (let i = 0; i < abilities.length; i++) {
    let ability = abilities[i][0].toUpperCase() + abilities[i].slice(1);
    displayedAbilities.push(ability);
  }

  return displayedAbilities.join(", ");
}

function getPokemonTypes(typesArray) {
  let types = [];
  for (let i = 0; i < typesArray.length; i++) {
    types.push(typesArray[i].type.name);
  }
  return types;
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

function showLoader() {
  document.getElementById("loader").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
  document.body.style.overflow = "auto";
}

function showLoadBtn() {
  loadMorePokemonBtn.style.display = "flex";
}

function hideLoadBtn() {
  loadMorePokemonBtn.style.display = "none";
}

function underlineSection() {
  const sectionLinksContainer = document.querySelector(".section-links");
  const firstButton = sectionLinksContainer.querySelector("button");
  if (firstButton) {
    firstButton.classList.add("active");
  }

  if (sectionLinksContainer) {
    sectionLinksContainer.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") {
        const buttons = sectionLinksContainer.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove("active");
        }
        e.target.classList.add("active");
      }
    });
  }
}

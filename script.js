let pokemonList = [];
let currentIndex = 0;

// Capitalize Name
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fetch and display Pokémon
fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
  .then((response) => response.json())
  .then((data) => {
    pokemonList = data.results;
    const leftPanel = document.querySelector(".left-panel");
    const ul = document.createElement("ul");

    pokemonList.forEach((pokemon, index) => {
      const li = document.createElement("li");
      li.textContent = capitalize(pokemon.name);
      li.style.cursor = "pointer";

      li.addEventListener("click", () => {
        currentIndex = index;
        fetchPokemonDetails(pokemon.url);
        updateButtons();
      });

      ul.appendChild(li);
    });

    leftPanel.appendChild(ul);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

// Display details in right panel
function fetchPokemonDetails(url) {
  const card = document.querySelector(".pokemon-card");
  const loader = document.getElementById("loader");

  // 🚨 Show loader, hide card
  card.style.display = "none";
  loader.style.display = "flex";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // 🚧 Clear old content
      card.innerHTML = "";
      card.classList.remove("fade-in");

      // Build new card
      const name = document.createElement("h2");
      name.textContent = capitalize(data.name);

      const id = document.createElement("h3");
      id.id = "pokemon-id";
      id.textContent = `#${String(data.id).padStart(3, '0')}`;

      const sprite = document.createElement("img");
      sprite.src = data.sprites.front_default;
      sprite.alt = data.name;

      const types = document.createElement("h4");
      types.textContent = "Type: " + data.types.map(t => t.type.name).join(", ");

      const abilities = document.createElement("h4");
      abilities.textContent = "Abilities: " + data.abilities.map(a => capitalize(a.ability.name)).join(", ");

      const cry = document.createElement("audio");
      if (data.cries?.latest) {
        cry.src = data.cries.latest;
        cry.volume = 0.1;
        cry.play().catch(() => {});
      }


      card.appendChild(name);
      card.appendChild(sprite);
            card.appendChild(id);
      card.appendChild(abilities);
      card.appendChild(cry);

      // ✅ Show card, hide loader with fade-in
      setTimeout(() => {
        loader.style.display = "none";
        card.style.display = "block";
        setTimeout(() => card.classList.add("fade-in"), 10);
      }, 200);
    });
}

// Update Buttons Function
function updateButtons() {
  const prevButn = document.getElementById("previous-button");
  const nextButn = document.getElementById("next-button");

  prevButn.disabled = currentIndex === 0;
  nextButn.disabled = currentIndex === pokemonList.length - 1;
}

document.getElementById("previous-button").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    fetchPokemonDetails(pokemonList[currentIndex].url);
    updateButtons();
  }
});

document.getElementById("next-button").addEventListener("click", () => {
  if (currentIndex < pokemonList.length - 1) {
    currentIndex++;
    fetchPokemonDetails(pokemonList[currentIndex].url);
    updateButtons();
  }
});

// Add keyboard functionality
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && currentIndex < pokemonList.length - 1) {
    e.preventDefault();
    currentIndex++;
    fetchPokemonDetails(pokemonList[currentIndex].url);
    updateButtons();
  } else if (e.key === "ArrowLeft" && currentIndex > 0) {
    currentIndex--;
    fetchPokemonDetails(pokemonList[currentIndex].url);
    updateButtons();
  }
});
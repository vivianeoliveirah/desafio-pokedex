let pokemons = [];
const poke_container = document.getElementById("poke_container");
const url = "https://pokeapi.co/api/v2/pokemon";
const pokemons_number = 151; // Você pode ajustar esse número conforme necessário
const search = document.getElementById("search");
const form = document.getElementById("form");

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getAllPokemon(i);
  }
  pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const removePokemon = () => {
  const pokemonsEls = document.getElementsByClassName("pokemon");
  let removablePokemons = [];
  for (let i = 0; i < pokemonsEls.length; i++) {
    const pokemonEl = pokemonsEls[i];
    removablePokemons = [...removablePokemons, pokemonEl];
  }
  removablePokemons.forEach((remPoke) => remPoke.remove());
};

const getPokemon = async (id) => {
  const searchPokemons = pokemons.filter((poke) => poke.name === id);
  removePokemon();
  searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const getAllPokemon = async (id) => {
  const res = await fetch(`${url}/${id}`);
  const pokemon = await res.json();
  pokemons = [...pokemons, pokemon];
};

fetchPokemons();

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  const types = pokemon.types.map((el) => el.type.name).join(", ");
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const stats = pokemon.stats;

  const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  const pokeInnerHTML = `
    <div class="img-container">
      <img src="${pokemonImageURL}" alt="${name}" />
    </div>
    <div class="info">
      <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
      <h3 class="name">${name}</h3>
      <small class="type"><span>${types}</span></small>
    </div>
    <div class="stats">
      <h2>Stats</h2>
      <div class="flex">
        <ul>
          <li class="names">${stats[0].stat.name}: ${stats[0].base_stat}</li>
          <li class="names">${stats[1].stat.name}: ${stats[1].base_stat}</li>
          <li class="names">${stats[2].stat.name}: ${stats[2].base_stat}</li>
        </ul>
      </div>
    </div>
  `;

  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getPokemon(searchTerm);
    search.value = "";
  } else if (searchTerm === "") {
    pokemons = [];
    removePokemon();
    fetchPokemons();
  }
});

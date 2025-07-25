// const axios = require("axios").default;

const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

async function getPokemonWithAbilitiesAsync() {
  try {
    const pokemons = await axios.get(url);
    // console.log(pokemons)
    // if (!response.ok) throw new Error(response.status);
    // const pokemons = await response.json();
    const result = pokemons.data.results.map(async (pokemon, idx) => {
      const obj = {
        name: pokemon.name,
      };
      try {
        const pokemonDetail = await axios.get(pokemon.url);
        // if (!response.ok) throw response;
        // const pokemonDetail = await response.json();
        const pokemonAbilities = pokemonDetail.data.abilities.map((abilityItem) => {
          return abilityItem.ability.name;
        });
        Object.assign(obj, {
          abilities: pokemonAbilities,
        });
      } catch (err) {
        const error = new Error(`Error Fetching Pokemon Detail at index ${idx}\n${err.status}: ${err.statusText}`);
        throw error;
      }
      return obj;
    });
    return await Promise.all(result);
  } catch (err) {
    throw err;
  }
}

/**
 * [
 *  {
 *      name: "",
 *      abilities: []
 *  }
 * ]
 */

/**
 * section
 *  div
 *      p nama pokemon
 *  div
 *      n-p abilities (flex)
 */

(async function () {
  try {
    const pokemons = await getPokemonWithAbilitiesAsync();
    const main = document.querySelector("main");
    const pokemonElements = pokemons.map((pokemon) => {
      const section = document.createElement("section");
      section.classList.add("border-2", "border-solid", "border-black", "p-[5px]");
      // nama pokemon
      const title = document.createElement("div");
      const pName = document.createElement("p");
      pName.textContent = pokemon.name;
      pName.classList.add("text-2xl", "font-[cursive]");
      title.append(pName);
      // abiliites
      const content = document.createElement("div");
      content.classList.add("flex", "gap-[5px]");
      const pAbilities = pokemon.abilities.map((ability) => {
        const pAbility = document.createElement("p");
        pAbility.textContent = ability;
        return pAbility;
      });
      content.append(...pAbilities);
      // Penggabungan
      section.append(title, content);
      return section;
    });
    main.append(...pokemonElements);
  } catch (err) {
    console.log(err);
  }
})();

const chart = document.getElementById("grafiksaya");

new Chart(chart, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        fill: true,
        backgroundColor: "pink",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

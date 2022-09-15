import pokemonApi from "@/api/pokemonApi.js";

const getPokemons = () => {
  const pokemonArr = Array.from(Array(650));
  return pokemonArr.map((_, index) => index + 1);
};

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
  return pokemons;
};

const getPokemonNames = async ([one, two, three, four] = []) => {
  const promiseArr = [
    pokemonApi.get(`${one}`),
    pokemonApi.get(`${two}`),
    pokemonApi.get(`${three}`),
    pokemonApi.get(`${four}`)
  ];
  const [p1, p2, p3, p4] = await Promise.all(promiseArr);
  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id }
  ];
};

export default getPokemonOptions;

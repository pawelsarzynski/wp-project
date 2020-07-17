import { Axios } from "./api";
import { getRandomInt } from "../helpers/getRandomInt";

export const getPokemons = async () => {
  const pokemons = [];

  for (let i = 0; i < 5; i++) {
    const pokemon = await Axios.getInstance().get(
      `pokemon/${getRandomInt(1, 500)}`
    );

    pokemons.push(pokemon.data);
  }

  return pokemons;
};

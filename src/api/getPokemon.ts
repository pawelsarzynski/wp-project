import { Axios } from "./api";
import { getRandomInt } from "../helpers/getRandomInt";

export const getPokemon = async () => {
  const pokemon = await Axios.getInstance().get(
    `pokemon/${getRandomInt(1, 500)}`
  );

  return pokemon.data;
};

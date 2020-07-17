import { getRandomInt } from "../helpers/getRandomInt";

abstract class Creator {
  public abstract factoryMethod(): Pokemon;

  public serializePokemon(
    item: Record<string, unknown>
  ): Record<string, unknown> {
    const pokemon = this.factoryMethod();

    return pokemon.serialize(item);
  }
}

export class PokemonCreator extends Creator {
  public factoryMethod(): Pokemon {
    return new ConcretePokemon();
  }
}

interface Pokemon {
  serialize(item: Record<string, unknown>): Record<string, unknown>;
}

class ConcretePokemon implements Pokemon {
  public serialize(item: Record<string, any>): Record<string, unknown> {
    return {
      name: item.name,
      photo: item.sprites.front_default,
      stats: {
        hp: getRandomInt(1, 100),
        attack: getRandomInt(1, 50),
        defence: getRandomInt(1, 50),
      },
    };
  }
}

import { getRandomInt } from "../helpers/getRandomInt";

abstract class Creator {
  public abstract factoryMethod(): Product;

  public serializePokemon(
    item: Record<string, unknown>
  ): Record<string, unknown> {
    const product = this.factoryMethod();

    return product.serialize(item);
  }
}

export class PokemonCreator extends Creator {
  public factoryMethod(): Product {
    return new ConcretePokemon();
  }
}

interface Product {
  serialize(item: Record<string, unknown>): Record<string, unknown>;
}

class ConcretePokemon implements Product {
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

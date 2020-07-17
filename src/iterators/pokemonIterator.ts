import { PokemonCreator } from "../factory/pokemonFactory";

interface Iterator<T> {
  current(): T;

  next(): T;

  key(): number;

  valid(): boolean;

  rewind(): void;
}

interface Aggregator {
  getIterator(): Iterator<Record<string, unknown>>;
}

class PokemonIterator implements Iterator<Record<string, unknown>> {
  private collection: PokemonCollection;
  private position: number = 0;
  private pokemonFactory = new PokemonCreator();

  constructor(collection: PokemonCollection) {
    this.collection = collection;
  }

  public rewind() {
    this.position = 0;
  }

  public current(): Record<string, unknown> {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): Record<string, unknown> {
    const item = this.collection.getItems()[this.position];
    this.position += 1;
    return this.pokemonFactory.serializePokemon(item);
  }

  public valid(): boolean {
    return this.position < this.collection.getCount();
  }
}

export class PokemonCollection implements Aggregator {
  private items: Record<string, unknown>[] = [];

  public getItems(): Record<string, unknown>[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: Record<string, unknown>): void {
    this.items.push(item);
  }

  public getIterator(): Iterator<Record<string, unknown>> {
    return new PokemonIterator(this);
  }
}

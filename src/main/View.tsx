import React, { FC, useEffect, useState, useCallback } from "react";

import { getPokemons } from "../api/getPokemons";
import { getPokemon } from "../api/getPokemon";
import { PokemonCollection } from "../iterators/pokemonIterator";
import {
  Container,
  OpponentSection,
  TeamSection,
  Pokemon,
} from "./view.styles";

export const View: FC = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [opponent, setOpponent] = useState<Record<string, any>>({});
  const [attacker, setAttacker] = useState<Record<string, any>>({});

  useEffect(() => {
    getPokemon().then((opponent) => {
      const collection = new PokemonCollection();
      [opponent].forEach((member) => collection.addItem(member));
      const iterator = collection.getIterator();

      const newOpponent = iterator.next();

      setOpponent(newOpponent);
    });
  }, []);

  useEffect(() => {
    getPokemons().then((team) => {
      const collection = new PokemonCollection();
      team.forEach((member) => collection.addItem(member));
      const iterator = collection.getIterator();

      const newTeam = [];

      while (iterator.valid()) {
        newTeam.push(iterator.next());
      }

      setTeam(newTeam);
    });
  }, []);

  const getOpponent = useCallback(() => {
    getPokemon().then((opponent) => {
      const collection = new PokemonCollection();
      [opponent].forEach((member) => collection.addItem(member));
      const iterator = collection.getIterator();

      const newOpponent = iterator.next();

      setOpponent(newOpponent);
    });
  }, []);

  useEffect(() => {
    if (opponent.stats?.hp <= 0) setOpponent({});
  }, [opponent]);

  const attack = (pok: Record<string, any>) => {
    setOpponent({
      ...opponent,
      stats: {
        hp: opponent.stats.hp - (pok.stats.attack - opponent.stats.defence / 2),
        attack: opponent.stats.attack,
        defence: opponent.stats.defence,
      },
    });

    setAttacker(pok);
    new Promise((resolve) => setTimeout(resolve, 600)).then(() => {
      setTeam(
        team.reduce(
          (acc, p) =>
            p.name === pok.name
              ? [
                  ...acc,
                  {
                    ...pok,
                    stats: {
                      attack: pok.stats.attack,
                      defence: pok.stats.defence,
                      hp: pok.stats.hp - opponent.stats.attack / 2,
                    },
                  },
                ]
              : [...acc, p],
          []
        )
      );
      setAttacker({});
    });
  };

  if (!team.length) return <p>Loading...</p>;

  return (
    <Container>
      <OpponentSection isAttacking={attacker.name}>
        {opponent.name ? (
          <Pokemon isOpponent isAttacking={opponent.name === attacker.name}>
            <img src={opponent.photo} alt="Pokemon" />
            <span>{opponent.name}</span>
            <span>HP: {opponent.stats.hp}</span>
            <span>Attack: {opponent.stats.attack}</span>
            <span>Defence: {opponent.stats.defence}</span>
          </Pokemon>
        ) : (
          <div>
            <h3>You win</h3>
            <button onClick={getOpponent}>Fight again</button>
          </div>
        )}
      </OpponentSection>
      <TeamSection>
        {team.map((pokemon, i) => (
          <Pokemon
            onClick={() =>
              opponent.name && pokemon.stats.hp > 0 && attack(pokemon)
            }
            isAttacking={pokemon.name === attacker.name}
            index={i}
            isDead={pokemon.stats.hp <= 0}
          >
            <img src={pokemon.photo} alt="Pokemon" />
            <span>{pokemon.name}</span>
            <span>HP: {pokemon.stats.hp}</span>
            <span>Attack: {pokemon.stats.attack}</span>
            <span>Defence: {pokemon.stats.defence}</span>
          </Pokemon>
        ))}
      </TeamSection>
    </Container>
  );
};

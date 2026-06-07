import type { State } from "./state.js";

export async function commandPokedex(state: State, ...args: string[]) {

  const allPokemon = state.caughtPokemon;
  if (!allPokemon) {
    throw new Error("you have not caught any pokemon");
  }
  console.log("Your Pokedex:")
  for (let pokemon in allPokemon) {
    console.log(" - ", allPokemon[pokemon].name);
  }
}

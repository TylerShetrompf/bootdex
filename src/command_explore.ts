import { type State } from "./state.js";

export async function commandExplore(state: State, location: string) {
        
    const locResult = await state.poke.fetchLocation(location);
    console.log(`Exploring ${location} area...`);
    console.log("Found Pokemon:")
    for (let poke of locResult.pokemon_encounters) {
        console.log(` - ${poke.pokemon.name}`);
    }
}
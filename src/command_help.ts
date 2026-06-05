import { State } from "./state.js";

export async function commandHelp(state: State){
    console.log(`Welcome to the Pokedex!\nUsage:\n`);
    for (let com in state.commands) {
        console.log(`${state.commands[com].name}: ${state.commands[com].description}`)
    }
}
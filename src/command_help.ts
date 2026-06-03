import { CLICommand } from "./commands.js";

export function commandHelp(commands: Record<string, CLICommand>){
    console.log(`Welcome to the Pokedex!\nUsage:\n`);
    for (let com in commands) {
        console.log(`${commands[com].name}: ${commands[com].description}`)
    }
}
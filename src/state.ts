import { createInterface, type Interface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export type State = {
    shell: Interface;
    commands: Record<string, CLICommand>;
    poke: PokeAPI,
    nextLocationsURL: string,
    prevLocationsURL: string,
}

export function initState() {
    
    const shell = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Bootdex > ",
    })

    const commands = getCommands();

    const state : State = {
        shell: shell,
        commands: commands,
    }

    return state;
}
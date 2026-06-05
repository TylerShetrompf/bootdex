import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { type State } from "./state.js";

export function cleanInput(input: string): string[] {

    let lower = input.toLowerCase();
    let split = lower.split(" ");
    
    const output = [];
    
    for (let word of split) {
        if (word != " " && word != '') {
            output.push(word);
        }
    }

    return(output);

}

export async function startREPL(state: State) {

    state.shell.prompt();

    state.shell.on("line", async (input) =>{
        
        if (input === ""){
            console.log("Please input a command.");
            state.shell.prompt();
        }

        const cleaned = cleanInput(input);
        
        const commandName = cleaned[0];

        
        const cmd = state.commands[commandName];

        if (!cmd) {
            console.log("Please enter a command.");
            state.shell.prompt();
            return;
        } else {
            try {
                await cmd.callback(state);    
            } catch (error) {
                console.log((error as Error).message);
            }
            
        }

        state.shell.prompt();

    })

}


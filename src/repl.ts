import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands.js";

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

export function startREPL() {

    const shell = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Bootdex > ",
    })

    shell.prompt();

    shell.on("line", async (input) =>{
        
        if (input === ""){
            console.log("Please input a command.");
            shell.prompt();
        }

        const cleaned = cleanInput(input);
        
        const commandName = cleaned[0];

        const commands = getCommands();
        
        const cmd = commands[commandName];

        if (!cmd) {
            console.log();
            shell.prompt();
            return;
        } else {
            try {
                cmd.callback(commands);    
            } catch (error) {
                console.log(error);
            }
            
        }

        shell.prompt();

    })

}


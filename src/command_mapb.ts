import { type State } from "./state.js";

export async function commandMapBack(state: State) {
    
    if (!state.prevLocationsURL){
        console.log("You're on the first page!");
    } else {
        const locations = await state.poke.fetchLocations(state.prevLocationsURL);
        for (let loc of locations.results) {
            console.log(loc.name);
        }
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
    }
    
}
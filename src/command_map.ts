import { type State } from "./state.js";

export async function commandMapForward(state: State) {
    const locations = await state.poke.fetchLocations(state.nextLocationsURL);
    for (let loc of locations.results) {
        console.log(loc.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}
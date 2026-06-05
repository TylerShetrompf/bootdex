import { Cache } from "./pokecache.js";
export class PokeAPI {
    
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    pokeCache: Cache;

    constructor(){
        this.pokeCache = new Cache(5000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cached = this.pokeCache.get(url);
        if (!cached) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const locations: ShallowLocations = await response.json();
                this.pokeCache.add(url, locations);
                return(locations);

            } catch (error) {
                throw new Error(`Error fetching locations: ${(error as Error).message}`);
            }
        } else {
            return(cached);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.pokeCache.get(url);
        if (!cached) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const location: Location = await response.json();
                this.pokeCache.add(url, location);
                return(location);

            } catch (error) {
                throw new Error(`Error fetching location: ${(error as Error).message}`);
            }
        } else {
            return(cached);
        }
    }
}

export type ShallowLocations = {
    count: number, 
    next: string,
    previous: string,
    results: {
        name: string,
        url: string,
    }[];
}

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string,
            url: string
        },
        version_details: {
            rate: number,
            version: {
                name: string,
                url: string
            }
        }[]
    }[],
    game_index: number,
    id: number,
    location: {
        name: string,
        url: string,
    },
    name: string,
    names: {
        language: {
            name: string,
            url: string
        },
        name: string,
    }[],
    pokemon_encounters: {
        pokemon: {
            name: string,
            url: string,
        },
        version_details: {
            encounter_details: {
                chance: number,
                condition_values: any[],
                max_level: number,
                method: {
                    name: string,
                    url: string
                },
                min_level: number,
            }[],
            max_chance: number,
            version: {
                name: string,
                url: string
            }
        }[],

    }[]
}
export interface Pokemon {
    name: string;
    height: number;
    weight: number;
    moves: {
        move: {
            name: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
        }
    }[];
    sprites: {
        front_default: string;
        front_shiny: string;
    }
    types: {
        type: {
            name: string;
        }
    }[];
}

export interface PokemonSpecies {
    evolves_from_species: {
        name: string;
        url: string;
    };
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        }
        version: {
            name: string;
        }
    }[];
}
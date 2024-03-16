import { useState, ChangeEvent } from 'react'
import '../styles/HeroSection.css'

const apiURL = 'https://pokeapi.co/api/v2/pokemon';
const apiURLSpecies = 'https://pokeapi.co/api/v2/pokemon-species';

interface Pokemon {
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

interface PokemonSpecies {
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

export default function HeroSection() {

    const [searchTerm, setSearchTerm] = useState('');
    // const [evolveFrom, setEvolveFrom] = useState<Pokemon | null>(null);
    // const [evolveTo, setEvolveTo] = useState<Pokemon | null>(null);
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonDataSpecies, setPokemonDataSpecies] = useState<PokemonSpecies | null>(null);

    const searchPokemon = async () => {
        try {
            const response = await fetch(`${apiURL}/${searchTerm.toLowerCase()}`);
            const data = await response.json();

            const responseSpecies = await fetch(`${apiURLSpecies}/${searchTerm.toLocaleLowerCase()}`);
            const dataSpecies = await responseSpecies.json();

            setPokemonData(data);
            setPokemonDataSpecies(dataSpecies);
        } catch (error) {
            alert('Error fetching Pokémon data, try again later.')
        }
    }

    const englishRedFlavorText = pokemonDataSpecies?.flavor_text_entries.find(entry => entry.language.name === 'en');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleClick = () => {
        searchPokemon();
    }

    return (
        <div className="parent">
            <div className="hero">
                <div className="text">
                    <div className="text-wrapper">
                        <h1>Who's that Pokémon?</h1>

                        <div className="row-wrapper">
                            <div className="input-wrapper">
                                <input
                                    onChange={handleChange}
                                    value={searchTerm}
                                    type="text"
                                    id='pokemon-name'
                                    required
                                />
                                <label htmlFor="pokemon-name">Enter Pokémon Name</label>
                                <div className="underline"></div>
                            </div>

                            <div className="button-wrapper">
                                <button onClick={handleClick}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pokemon">
                    {pokemonData && (
                        <div className='pokemon-info'>
                            <div className="info">
                                <h2>{pokemonData.name}</h2>
                                <h3>{englishRedFlavorText ? englishRedFlavorText.flavor_text : 'Flavor text not available.'}</h3>
                                <div className="details-wrapper">
                                    <h3 className="abilities">Abilities: {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</h3>
                                    {/* <h3>Moves: {pokemonData.moves.map((moves) => moves.move.name).join(', ')}</h3> */}
                                </div>
                            </div>
                            <div className="info-details">
                                <div className="image-wrapper">
                                    <img
                                        src={pokemonData.sprites.front_default}
                                        alt={`${pokemonData.name} sprite`}
                                    />
                                    <img
                                        src={pokemonData.sprites.front_shiny}
                                        alt={`${pokemonData.name} sprite`}
                                    />
                                </div>
                                <div className="type-wrapper">
                                    <h3>{pokemonData.types.map((type) => type.type.name).join(' ')}</h3>
                                </div>
                                <div className="hw-wrapper">
                                    <h3>Height: {pokemonData.height / 10} m</h3>
                                    <h3>Weight: {pokemonData.weight / 10} kg</h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
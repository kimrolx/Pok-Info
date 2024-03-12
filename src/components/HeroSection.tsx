import { useState, ChangeEvent } from 'react'
import '../styles/HeroSection.css'

const apiURL = 'https://pokeapi.co/api/v2/pokemon';

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

export default function HeroSection() {

    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

    const searchPokemon = async () => {
        try {
            const response = await fetch(`${apiURL}/${searchTerm.toLowerCase()}`);
            const data = await response.json();

            setPokemonData(data);
        } catch (error) {
            alert('Error fetching Pokémon data')
        }
    }

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
                    <h1>Who's that Pokémon?</h1>

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
                <div className="pokemon">
                    {pokemonData && (
                        <div>
                            <h2>{pokemonData.name}</h2>
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
                            <div className="details-wrapper">
                                <h3>Height: {pokemonData.height / 10} m</h3>
                                <h3>Weight: {pokemonData.weight / 10} kg</h3>
                                <h3 className="abilities">Abilities: {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</h3>
                                {/* <h3>Moves: {pokemonData.moves.map((moves) => moves.move.name).join(', ')}</h3> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
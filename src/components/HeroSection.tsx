import { ChangeEvent, useState } from "react";
import styled, { css } from "styled-components";
import { Pokemon, PokemonSpecies } from "../models/types";
import PokemonDetails from "./PokemonDetails";

const CenteredDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const HorizontalAlignDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0;
    padding: 20px 35px 35px 35px;
`

const TitleText = styled.h1`
    font-size: 44px;
`

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`

const TextFieldStyle = styled.div`
    position: relative;
    font-size: 20px;
    margin: 20px 0px 20px 0px;
    margin-right: 12px;
`

const InputFieldStyle = styled.input`
    all: unset;
    width: 20rem;
    padding: 10px 0;
    border-bottom: 2px solid #dedede;
`

const InputLabelStyle = styled.label<{ isActive?: boolean }>`
    position: absolute;
    bottom: 10px;
    left: 0;
    color: #999999;
    pointer-events: none;
    transition: all 0.3s ease;

    ${({ isActive }) =>
        isActive && css`
            bottom: 100%;
            font-size: 16px;
            color: white;
        `}
`

const Underline = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #EF363E, #CC5036);
    scale: scale(0, 1);
    transition: transform 0.3s ease-out;
`

const StyledButton = styled.button`
    background: white;
    border: 0;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    color: black;
    width: 8rem;
    height: 40px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
        background: linear-gradient(#C93F32, #7D109D);
        color: white;
    }
`

const apiURL = 'https://pokeapi.co/api/v2/pokemon';
const apiURLSpecies = 'https://pokeapi.co/api/v2/pokemon-species';

export default function HeroSection() {
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonDataSpecies, setPokemonDataSpecies] = useState<PokemonSpecies | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const isLabelActive = isFocused || searchTerm.length > 0;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleClick = () => {
        searchPokemon();
    }

    return (
        <HorizontalAlignDiv >
            <TitleText> Who's that Pokémon? </TitleText>

            <FlexRow>
                <TextFieldStyle>
                    <InputFieldStyle
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={searchTerm}
                        type="text"
                        id="pokemon-name"
                        required
                    />
                    <InputLabelStyle htmlFor="pokemon-name" isActive={isLabelActive}>
                        Enter Pokémon Name
                    </InputLabelStyle>

                    <Underline style={{ transform: isFocused ? 'scale(1, 1)' : 'scale(0, 1)' }} />
                </TextFieldStyle>
                <CenteredDiv>
                    <StyledButton onClick={handleClick}> Submit </StyledButton>
                </CenteredDiv>
            </FlexRow>
            {pokemonData && (
                <PokemonDetails pokemonData={pokemonData} pokemonDataSpecies={pokemonDataSpecies} />
            )}
        </HorizontalAlignDiv>
    );
}
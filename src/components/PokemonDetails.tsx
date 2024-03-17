import { Pokemon, PokemonSpecies } from "../models/types";
import styled from "styled-components";

const CenteredDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const HorizontalAlign = styled.div`
    display: flex;
    justify-content: center;
`

const HorizontalAlignColumn = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

const InfoStyled = styled.div`
    flex: 0 0 calc(40% - 20px);
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const H3TextStyled = styled.h3`
    
`

const AbilityStyled = styled.div`
    text-transform: capitalize;
`

const PixelatedImage = styled.img`
    image-rendering: pixelated;
    display: block;
    width: 100%;
    height: auto;
`

interface PokemonDetailsProps {
    pokemonData: Pokemon;
    pokemonDataSpecies: PokemonSpecies | null;
}

const PokemonDetails = ({ pokemonData, pokemonDataSpecies }: PokemonDetailsProps) => {

    const englishFlavorText = pokemonDataSpecies?.flavor_text_entries.find(entry => entry.language.name === 'en');

    return (
        <FlexRow>
            <InfoStyled>
                <CenteredDiv style={{
                    margin: '0',
                    fontSize: '52px',
                    textTransform: 'capitalize',
                }}>
                    {pokemonData.name}
                </CenteredDiv>
                <H3TextStyled> {englishFlavorText ? englishFlavorText.flavor_text : 'Flavor text not available.'} </H3TextStyled>
                <AbilityStyled> Abilities: {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')} </AbilityStyled>
            </InfoStyled>
            <HorizontalAlignColumn style={{ flex: '1' }}>
                <HorizontalAlign>
                    <PixelatedImage
                        src={pokemonData.sprites.front_default}
                        alt={`${pokemonData.name} sprite`}
                    />
                    <PixelatedImage
                        src={pokemonData.sprites.front_shiny}
                        alt={`${pokemonData.name} sprite`}
                    />
                </HorizontalAlign>
                <HorizontalAlign style={{ textTransform: 'uppercase' }}>
                    <H3TextStyled> {pokemonData.types.map((type) => type.type.name).join(' ')}</H3TextStyled>
                </HorizontalAlign>
                <FlexRow style={{ justifyContent: 'space-around' }}>
                    <H3TextStyled> Height: {pokemonData.height / 10}m </H3TextStyled>
                    <H3TextStyled> Weight: {pokemonData.weight / 10}kg </H3TextStyled>
                </FlexRow>
            </HorizontalAlignColumn>
        </FlexRow>
    );
}

export default PokemonDetails;
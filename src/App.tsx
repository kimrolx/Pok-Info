import background from "./assets/pokemon_background.jpg"
import HeroSection from "./components/HeroSection";

import styled from 'styled-components';

function App() {

  const StyledPage = styled.div`
    height: 100vh;
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const GlassmorphismDiv = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.0px);
    -webkit-backdrop-filter: blur(8.0px);
    width: 80%;
    height: 700px;
  `

  return (
    <StyledPage>
      <GlassmorphismDiv>
        <HeroSection/>
      </GlassmorphismDiv> 
    </StyledPage>
  );
}

export default App

import HeroSection from "./components/HeroSection";
import background from "./assets/pokemon_background.jpg"

function App() {

  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div style={containerStyle}>
      <HeroSection />
    </div>
  );
}

export default App

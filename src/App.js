import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Naw from './components/Naw/Naw';
import Home from './pages/Home';
import BibliotecaGris from './pages/About';
import Contact from './pages/contact/contact';
import { DetalleJuego } from './pages/detalle_juego/DetalleJuego.js';
import Store from './pages/store/store';
import NewGames from './pages/new-games/new-games';
import Recommendations from './pages/recommendations/recommendations.js';


function App() {
  return (
    
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-container">
          <Naw />
          <Routes>     
            <Route path="/Gamebly_front" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<BibliotecaGris />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/store" element={<Store />} />
            <Route path="/juego/:id" element={<DetalleJuego />} />
            <Route path="/new-games" element={<NewGames />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </div>
         
      </div>
      
    </BrowserRouter>
  );
}

export default App;

// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyHomePage from './components/MyHomePage';
import ScheduleSelector from './components/ScheduleSelector';

// Importaciones de "Ida"
import LunesAViernesIda from './components/ida/LunesAViernesIda';
import SabadoIda from './components/ida/SabadoIda';
import DomingoYFeriadosIda from './components/ida/DomingoYFeriadosIda';

// Importaciones de "Vuelta"
import LunesAViernesVuelta from "./components/vuelta/LunesAViernesVuelta";
import SabadoVuelta from "./components/vuelta/SabadoVuelta";
import DomingoYFeriadosVuelta from "./components/vuelta/DomingoYFeriadosVuelta";


function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<MyHomePage />} />

        {/* Selector de horarios */}
        <Route path="/schedule" element={<ScheduleSelector />} />

        {/* Rutas para "Ida" */}
        <Route path="/ida/LunesAViernesIda" element={<LunesAViernesIda />} />
        <Route path="/ida/SabadoIda" element={<SabadoIda />} />
        <Route path="/ida/DomingoYFeriadosIda" element={<DomingoYFeriadosIda />} />

        {/* Rutas para "Vuelta" */}
        <Route path="/vuelta/LunesAViernesVuelta" element={<LunesAViernesVuelta />} />
        <Route path="/vuelta/SabadoVuelta" element={<SabadoVuelta />} />
        <Route path="/vuelta/DomingoYFeriadosVuelta" element={<DomingoYFeriadosVuelta />} />
      </Routes>
    </Router>
  );
}

export default App;




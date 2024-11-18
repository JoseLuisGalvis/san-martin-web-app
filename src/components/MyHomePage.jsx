// src/pages/MyHomePage.js
// npm install lucide-react

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logoImage from '../assets/images/ConSMLogo.jpeg';

const MyHomePage = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", !isDarkMode ? "enabled" : "disabled");
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 text-white">
      <header className="d-flex justify-content-between align-items-center w-100 py-3 px-4 bg-consultar">
        <h1 className="m-0">Consultar - San Martín</h1>
         {/* Aplicamos la clase 'current-time' al span del reloj */}
        <span className="current-time">Hora: {currentTime}</span>
        <button 
          className={`btn p-2 rounded-full ${isDarkMode ? 'bg-yellow-400' : 'bg-white'}`}
          onClick={handleDarkModeToggle}
          aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 text-gray-900" />
          ) : (
            <Moon className="h-6 w-6 text-gray-900" />
          )}
        </button>
      </header>
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3" data-aos="zoom-in">
      <img
          src={logoImage}
          className="img-fluid h-100 object-fit-cover"
          id="home-image"
          alt="Consultar San Martin Logo"
          loading="lazy"
        />
        <h2 className="my-4 home-title">Horarios de Servicio</h2>
        <button 
          onClick={() => navigate('/schedule')} 
          className="btn bg-consultar px-5"
        >
          Ir a la Consulta
        </button>
      </main>
    </div>
  );
};

export default MyHomePage;


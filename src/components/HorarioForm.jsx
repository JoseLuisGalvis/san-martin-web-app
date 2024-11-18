import { useState, useEffect } from 'react';

const HorarioForm = () => {
  const [estaciones, setEstaciones] = useState([]);
  const [selectedEstacion, setSelectedEstacion] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [horarios, setHorarios] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Cargar estaciones desde el archivo JSON
  useEffect(() => {
    const loadEstaciones = async () => {
      try {
        const response = await fetch('/assets/estaciones.json');
        const data = await response.json();
        setEstaciones(data.estaciones);
      } catch (error) {
        console.error("Error al cargar las estaciones:", error);
      }
    };
    loadEstaciones();
  }, []);

  // Llamada ficticia para obtener horarios, por ahora simulada
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedEstacion && selectedTime) {
      // Simulamos la respuesta de un servicio de horarios
      const resultadosHorarios = [
        { numTren: "123", horaEstacion: selectedTime },
        { numTren: "456", horaEstacion: selectedTime },
      ];
      setHorarios(resultadosHorarios);
      setShowResults(true);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-white">Consulta Retiro - Dr. Cabred <br/>Lunes a Viernes</h2>
      <form onSubmit={handleFormSubmit} className="form p-4" style={{ backgroundColor: '#AEDFF7', borderRadius: '8px' }}>
        <div className="form-group">
          <label htmlFor="estacion" className="text-dark font-weight-bold">Estación</label>
          <select
            id="estacion"
            className="form-control"
            value={selectedEstacion}
            onChange={(e) => setSelectedEstacion(e.target.value)}
          >
            <option value="">Selecciona una estación</option>
            {estaciones.map((estacion) => (
              <option key={estacion.id} value={estacion.nombre}>{estacion.nombre}</option>
            ))}
          </select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="hora" className="text-dark font-weight-bold">Hora</label>
          <input
            type="time"
            id="hora"
            className="form-control"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-4">
          Ver horarios
        </button>
      </form>

      {showResults && (
        <div className="mt-4 p-4" style={{ backgroundColor: '#AEDFF7', borderRadius: '8px' }}>
          <h4 className="text-white font-weight-bold">Resultados</h4>
          {horarios && horarios.length > 0 ? (
            horarios.map((horario, index) => (
              <div key={index} className="card mt-3" style={{ backgroundColor: '#8DC6E8' }}>
                <div className="card-body">
                  <h5 className="card-title">Tren {horario.numTren}</h5>
                  <p className="card-text">Hora de la estación: {horario.horaEstacion}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No se encontraron horarios disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HorarioForm;

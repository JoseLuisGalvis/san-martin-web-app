import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../assets/images'; // Importa el objeto de imágenes
const DomingoYFeriadosVuelta = () => {
  const [data, setData] = useState(null);
  const [estaciones, setEstaciones] = useState([]);
  const [selectedEstacion, setSelectedEstacion] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:2500';
    } else if (/192\.168\.\d+\.\d+/.test(window.location.hostname)) {
      return 'http://192.168.0.113:2500';
    } else {
      return 'http://10.0.2.2:2500';
    }
  };

  useEffect(() => {
    const fetchEstaciones = async () => {
      try {
        setError(null);
        const response = await fetch('/estaciones.json');
        if (!response.ok) {
          throw new Error('Error al cargar las estaciones');
        }
        const estacionesData = await response.json();
        setEstaciones(estacionesData.estaciones);
      } catch (error) {
        setError('Error al cargar las estaciones. Por favor, intente nuevamente.');
        console.error('Error fetching estaciones:', error);
      }
    };
    fetchEstaciones();
  }, []);

  const fetchHorarios = async () => {
    if (!selectedEstacion || !selectedTime) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const estacionNombre = estaciones.find(e => e.id === parseInt(selectedEstacion))?.nombre;

      if (!estacionNombre) {
        throw new Error('Estación no encontrada');
      }

      const formattedTime = selectedTime.replace(':', ':');
      const baseUrl = getBaseUrl();
      const url = `${baseUrl}/horariosvueltadom/${estacionNombre}/${formattedTime}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener los horarios');
      }

      const result = await response.json();
      setData(result.horarios);
    } catch (error) {
      setError('Error al obtener los horarios. Por favor, intente nuevamente.');
      console.error('Error en la solicitud a la API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHorarios();
  };

  return (
    <div className="container min-vh-100">
      <header className="d-flex justify-content-between align-items-center w-100 py-3 px-4 bg-consultar">
        <h2 className="text-white">Vuelta: Dr. Cabred - Retiro </h2>
        <h3 className="text-white">Horarios Domingo y Feriados</h3>
        <button 
          onClick={() => navigate('/schedule')} 
          className="btn btn-outline-light"
          aria-label="Volver al cronograma"
        >
          Atrás
        </button>
      </header>

      <div className="mt-4">
        <div className="row g-4">
          {/* Primera fila */}
          <div className="col-12 col-md-4">
            {/* Publicidad Izquierda Superior */}
            <div className="card h-100" data-aos="fade-right">
            <img
                src={images.publicidad}
                className="img-fluid h-100 object-fit-cover"
                alt="Publicidad"
                loading="lazy"
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            {/* Formulario de Búsqueda */}
            <div className="card h-100" data-aos="fade-down">
              <div className="card-body">
                <h5 className="card-title">Selecciona los detalles</h5>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="estacion" className="form-label">Estación</label>
                    <select
                      id="estacion"
                      className="form-select"
                      value={selectedEstacion}
                      onChange={(e) => setSelectedEstacion(e.target.value)}
                      required
                      aria-describedby="estacionHelp"
                    >
                      <option value="">Selecciona una estación</option>
                      {estaciones.map((estacion) => (
                        <option key={estacion.id} value={estacion.id}>
                          {estacion.nombre}
                        </option>
                      ))}
                    </select>
                    <div id="estacionHelp" className="form-text">
                      Selecciona la estación de la que deseas consultar los horarios
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="hora" className="form-label">Hora</label>
                    <input
                      type="time"
                      id="hora"
                      className="form-control"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                      aria-describedby="horaHelp"
                    />
                    <div id="horaHelp" className="form-text">
                      Ingresa la hora para consultar los próximos trenes
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn bg-consultar w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Consultando...' : 'Ver horarios'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            {/* Publicidad Derecha Superior */}
            <div className="card h-100" data-aos="fade-left">
            <img
                src={images.clientes}
                className="img-fluid h-100 object-fit-cover"
                alt="Publicidad"
                loading="lazy"
              />
            </div>
          </div>

          {/* Segunda fila */}
          <div className="col-12 col-md-4">
            {/* Publicidad Izquierda Inferior */}
            <div className="card h-100" data-aos="fade-right">
            <img
                src={images.camion}
                className="img-fluid h-100 object-fit-cover"
                alt="Publicidad"
                loading="lazy"
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            {/* Resultados de la Búsqueda */}
            <div className="card h-100" data-aos="fade-up">
              <div className="card-body">
                <h5 className="card-title">Horarios Disponibles</h5>
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : data ? (
                  data.length > 0 ? (
                    <div className="overflow-auto" style={{ maxHeight: '400px' }}>
                      {data.map((horario, index) => (
                        <div key={index} className="card mb-2">
                          <div className="card-body py-2">
                            <h6 className="card-subtitle mb-1">Tren {horario.num_tren}</h6>
                            <p className="card-text m-0">Hora de salida: {horario.hora_estacion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-info" role="alert">
                      No se encontraron horarios disponibles para la hora seleccionada.
                    </div>
                  )
                ) : (
                  <p className="text-muted text-center" id="responseHelp">
                    Selecciona una estación y hora para ver los horarios disponibles
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            {/* Publicidad Derecha Inferior */}
            <div className="card h-100" data-aos="fade-left">
            <img
                src={images.valla}
                className="img-fluid h-100 object-fit-cover"
                alt="Publicidad"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomingoYFeriadosVuelta;

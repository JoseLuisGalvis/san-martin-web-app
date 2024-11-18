import { useNavigate } from 'react-router-dom';

const ScheduleSelector = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container d-flex flex-column align-items-center min-vh-100 text-white">
      <header className="d-flex justify-content-between align-items-center w-100 py-3 px-4 bg-consultar">
        <h2 className="m-0">Consultar - San Martín - Selector de Horarios</h2>
        <button
          onClick={() => navigate('/')}
          className="btn btn-outline-light"
          aria-label="Volver al Inicio"
        >
          Atrás
        </button>
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center text-center px-3">
        {/* Grid 3x2 */}
        <div className="row g-4 w-100">
          {/* Primera Fila */}
          <div className="col-12 col-md-4">
            {/* Publicidad Izquierda Superior */}
            <div className="card rounded h-100" data-aos="fade-right">
              <img
                src={'/src/assets/images/publicidad.jpg'}
                className="img-fluid h-100 object-fit-cover rounded"
                alt="Publicidad"
                loading="lazy"
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            {/* Card de Horarios Ida */}
            <div className="card h-100 d-flex align-items-center justify-content-center p-3" data-aos="fade-down">
              <h2 className="mb-4 text-primary">Ida: Retiro - Dr. Cabred</h2>
              <button
                className="btn bg-consultar mb-3 w-100"
                onClick={() => handleButtonClick('/ida/LunesAViernesIda')}
              >
                Lunes a Viernes
              </button>
              <button
                className="btn bg-consultar mb-3 w-100"
                onClick={() => handleButtonClick('/ida/sabadoIda')}
              >
                Sábado
              </button>
              <button
                className="btn bg-consultar mb-3 w-100"
                onClick={() => handleButtonClick('/ida/DomingoYFeriadosIda')}
              >
                Domingo y Feriados
              </button>
            </div>
          </div>

          <div className="col-12 col-md-4">
            {/* Publicidad Derecha Superior */}
            <div className="card rounded h-100" data-aos="fade-left">
              <img
                src={'/src/assets/images/Clientes.jpg'}
                className="img-fluid h-100 object-fit-cover rounded"
                alt="Publicidad"
                loading="lazy"
              />
            </div>
          </div>

          {/* Segunda Fila */}
          <div className="col-12 col-md-4">
            {/* Publicidad Izquierda Inferior */}
            <div className="card rounded h-100" data-aos="fade-right">
              <img
                src={'/src/assets/images/publicidad.jpeg'}
                className="img-fluid h-100 object-fit-cover rounded"
                alt="Publicidad"
                loading="lazy"
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            {/* Card de Horarios Vuelta */}
            <div className="card h-100 d-flex align-items-center justify-content-center p-3" data-aos="fade-up">
              <h2 className="mb-4 text-primary">Vuelta: Dr. Cabred - Retiro</h2>
              <button
                className="btn bg-consultar mb-3 w-100"
                onClick={() => handleButtonClick('/vuelta/LunesAViernesVuelta')}
              >
                Lunes a Viernes
              </button>
              <button
                className="btn bg-consultar mb-3 w-100"
                onClick={() => handleButtonClick('/vuelta/sabadoVuelta')}
              >
                Sábado
              </button>
              <button
                className="btn bg-consultar mb-3 w-100"
                onClick={() => handleButtonClick('/vuelta/DomingoYFeriadosVuelta')}
              >
                Domingo y Feriados
              </button>
            </div>
          </div>

          <div className="col-12 col-md-4">
            {/* Publicidad Derecha Inferior */}
            <div className="card rounded h-100" data-aos="fade-left">
              <img
                src={'/src/assets/images/publicar.jpg'}
                className="img-fluid h-100 object-fit-cover rounded"
                alt="Publicidad"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScheduleSelector;






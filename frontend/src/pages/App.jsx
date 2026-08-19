import { Link } from "react-router-dom";

const App = () => {
  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <section
        className="card shadow"
        style={{ width: 500, maxWidth: "90vw" }}
        aria-labelledby="titulo-principal"
      >
        <div className="card-body text-center p-4">
          <h1 id="titulo-principal" className="mb-3">
            Minha Biblioteca
          </h1>

          <p className="text-muted mb-4">
            Gerencie seus livros e registre suas resenhas em um só lugar.
          </p>

          <Link to="/livros" className="btn btn-primary">
            Ver livros
          </Link>
        </div>
      </section>
    </main>
  );
};

export default App;
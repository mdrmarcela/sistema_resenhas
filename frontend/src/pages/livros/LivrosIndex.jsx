import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import LivrosList from "../../components/livros/LivrosList";

const LivrosIndex = () => {
  const location = useLocation();

  const okMsg = location.state?.ok;

  return (
    <>
      <Navbar />

      <main className="container mt-3">
        <section aria-labelledby="titulo-biblioteca">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <Link to="/" className="btn btn-outline-secondary">
              Voltar
            </Link>

            <Link to="/livros/create" className="btn btn-success">
              + Criar Livro
            </Link>
          </div>

          <div className="mt-3">
            <h1 id="titulo-biblioteca" className="mb-1">
              Minha Biblioteca
            </h1>

            <p className="text-muted">
              Gerencie seus livros e resenhas.
            </p>
          </div>

          {okMsg && (
            <div
              className="alert alert-success mt-3 mb-0"
              role="status"
            >
              {okMsg}
            </div>
          )}

          <div className="mt-3">
            <LivrosList />
          </div>
        </section>
      </main>
    </>
  );
};

export default LivrosIndex;
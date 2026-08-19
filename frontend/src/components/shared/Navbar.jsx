import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav
        className="navbar navbar-dark bg-dark"
        aria-label="Navegação principal"
      >
        <div className="container d-flex flex-wrap gap-3 justify-content-between align-items-center">
          <Link className="navbar-brand mb-0" to="/">
            Minha Biblioteca
          </Link>

          <div className="d-flex flex-wrap gap-2">
            <Link
              className="btn btn-outline-light"
              to="/livros"
            >
              Livros
            </Link>

            <Link
              className="btn btn-outline-light"
              to="/livros/create"
            >
              Novo livro
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
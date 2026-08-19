import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        aria-label="Navegação principal"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Minha Biblioteca
          </Link>

          <div className="d-flex gap-2">
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
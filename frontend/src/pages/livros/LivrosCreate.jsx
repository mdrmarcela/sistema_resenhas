import Navbar from "../../components/shared/Navbar";
import { Link } from "react-router-dom";
import LivroFormCreate from "../../components/livros/LivroFormCreate";

const LivrosCreate = () => {
  return (
    <>
      <Navbar />

      <main className="container mt-3 mb-5">
        <section
          aria-labelledby="titulo-criar-livro"
          style={{ maxWidth: 760 }}
        >
          <Link to="/livros" className="btn btn-outline-secondary">
            Voltar
          </Link>

          <h1 id="titulo-criar-livro" className="mt-3">
            Criar Livro
          </h1>

          <p className="text-muted">
            Preencha os dados abaixo para cadastrar um novo livro.
          </p>

          <LivroFormCreate />
        </section>
      </main>
    </>
  );
};

export default LivrosCreate;
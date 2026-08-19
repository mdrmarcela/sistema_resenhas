import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

const LivroFormCreate = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [isbn, setIsbn] = useState("");

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErro("");

    if (!titulo.trim() || !autor.trim() || !isbn.trim()) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (isbn.trim().length < 3) {
      setErro("O ISBN deve possuir pelo menos 3 caracteres.");
      return;
    }

    const novoLivro = {
      titulo: titulo.trim(),
      autor: autor.trim(),
      isbn: isbn.trim(),
    };

    // Gênero é opcional
    if (genero.trim()) {
      novoLivro.genero = genero.trim();
    }

    try {
      setSalvando(true);

      const response = await fetch(`${API_URL}/livros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLivro),
      });

      if (!response.ok) {
        const dados = await response.json();

        throw new Error(
          dados.erro || "Não foi possível cadastrar o livro."
        );
      }

      navigate("/livros", {
        state: {
          ok: "Livro cadastrado com sucesso.",
        },
      });
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">
          Título *
        </label>

        <input
          type="text"
          id="titulo"
          className="form-control"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="autor" className="form-label">
          Autor *
        </label>

        <input
          type="text"
          id="autor"
          className="form-control"
          value={autor}
          onChange={(event) => setAutor(event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="genero" className="form-label">
          Gênero
        </label>

        <input
          type="text"
          id="genero"
          className="form-control"
          value={genero}
          onChange={(event) => setGenero(event.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="isbn" className="form-label">
          ISBN *
        </label>

        <input
          type="text"
          id="isbn"
          className="form-control"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
          minLength="3"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-success"
        disabled={salvando}
      >
        {salvando ? "Salvando..." : "Cadastrar Livro"}
      </button>
    </form>
  );
};

export default LivroFormCreate;
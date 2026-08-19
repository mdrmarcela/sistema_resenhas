import { useEffect, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000";

const LivrosEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    genero: "",
    isbn: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarLivro = async () => {
      try {
        setErro("");
        setLoading(true);

        const response = await fetch(`${API_URL}/livros/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.erro || "Erro ao carregar livro.");
        }

        setForm({
          titulo: data.titulo || "",
          autor: data.autor || "",
          genero: data.genero || "",
          isbn: data.isbn || "",
        });
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarLivro();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((formAtual) => ({
      ...formAtual,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErro("");

    if (
      !form.titulo.trim() ||
      !form.autor.trim() ||
      !form.isbn.trim()
    ) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.isbn.trim().length < 3) {
      setErro("O ISBN deve possuir pelo menos 3 caracteres.");
      return;
    }

    const livroAtualizado = {
      titulo: form.titulo.trim(),
      autor: form.autor.trim(),
      isbn: form.isbn.trim(),
    };

    if (form.genero.trim()) {
      livroAtualizado.genero = form.genero.trim();
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/livros/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livroAtualizado),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.erro || "Não foi possível atualizar o livro."
        );
      }

      navigate(`/livros/${id}`);
    } catch (error) {
      setErro(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container mt-3" style={{ maxWidth: 720 }}>
        <section aria-labelledby="titulo-editar-livro">
          <Link to="/livros" className="btn btn-outline-secondary">
            Voltar
          </Link>

          <h1 id="titulo-editar-livro" className="mt-3">
            Editar Livro
          </h1>

          {erro && (
            <div className="alert alert-danger mt-2" role="alert">
              {erro}
            </div>
          )}

          {loading && (
            <div className="alert alert-info mt-2" role="status">
              Carregando...
            </div>
          )}

          {!loading && (
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                  Título *
                </label>

                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  className="form-control"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="autor" className="form-label">
                  Autor *
                </label>

                <input
                  id="autor"
                  name="autor"
                  type="text"
                  className="form-control"
                  value={form.autor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="genero" className="form-label">
                  Gênero
                </label>

                <input
                  id="genero"
                  name="genero"
                  type="text"
                  className="form-control"
                  value={form.genero}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="isbn" className="form-label">
                  ISBN *
                </label>

                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  className="form-control"
                  value={form.isbn}
                  onChange={handleChange}
                  minLength="3"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
            </form>
          )}
        </section>
      </main>
    </>
  );
};

export default LivrosEdit;
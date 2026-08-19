import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000";

const ResenhaEditForm = ({ resenha }) => {
  const { livro_id, id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: resenha.titulo || "",
    conteudo: resenha.conteudo || "",
    nota: resenha.nota || 5,
  });

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

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

    if (!form.titulo.trim() || !form.conteudo.trim()) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const nota = Number(form.nota);

    if (nota < 1 || nota > 5) {
      setErro("A nota deve estar entre 1 e 5.");
      return;
    }

    const resenhaAtualizada = {
      titulo: form.titulo.trim(),
      conteudo: form.conteudo.trim(),
      nota,
    };

    try {
      setSalvando(true);

      const response = await fetch(
        `${API_URL}/livros/${livro_id}/resenhas/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resenhaAtualizada),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.erro || "Não foi possível atualizar a resenha."
        );
      }

      navigate(`/livros/${livro_id}`);
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3" style={{ maxWidth: 720 }}>
      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="titulo-resenha" className="form-label">
          Título *
        </label>

        <input
          id="titulo-resenha"
          name="titulo"
          type="text"
          className="form-control"
          value={form.titulo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="conteudo-resenha" className="form-label">
          Conteúdo *
        </label>

        <textarea
          id="conteudo-resenha"
          name="conteudo"
          className="form-control"
          rows="5"
          value={form.conteudo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="nota-resenha" className="form-label">
          Nota *
        </label>

        <input
          id="nota-resenha"
          name="nota"
          type="number"
          min="1"
          max="5"
          className="form-control"
          value={form.nota}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={salvando}
      >
        {salvando ? "Salvando..." : "Salvar alterações"}
      </button>
    </form>
  );
};

export default ResenhaEditForm;
import { useEffect, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { Link, useParams } from "react-router-dom";
import ResenhaEditForm from "../../components/resenhas/ResenhaEditForm";

const API_URL = "http://localhost:3000";

const ResenhasEdit = () => {
  const { livro_id, id } = useParams();

  const [resenha, setResenha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarResenha = async () => {
      try {
        setErro("");
        setLoading(true);

        const response = await fetch(
          `${API_URL}/livros/${livro_id}/resenhas/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.erro || "Erro ao carregar resenha."
          );
        }

        setResenha(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarResenha();
  }, [livro_id, id]);

  return (
    <>
      <Navbar />

      <main className="container mt-3">
        <section aria-labelledby="titulo-editar-resenha">
          <Link
            to={`/livros/${livro_id}`}
            className="btn btn-outline-secondary"
          >
            Voltar
          </Link>

          <h1
            id="titulo-editar-resenha"
            className="mt-3"
          >
            Editar Resenha
          </h1>

          {erro && (
            <div
              className="alert alert-danger mt-2"
              role="alert"
            >
              {erro}
            </div>
          )}

          {loading && (
            <div
              className="alert alert-info mt-2"
              role="status"
            >
              Carregando...
            </div>
          )}

          {!loading && resenha && (
            <ResenhaEditForm resenha={resenha} />
          )}
        </section>
      </main>
    </>
  );
};

export default ResenhasEdit;
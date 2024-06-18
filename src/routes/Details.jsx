import "../assets/css/app.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import axios from "axios";

const Details = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Buscar detalhes do usuário pelo id
    axios
      .get(`http://localhost:3000/usuarios/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do usuário", error);
      });
  }, [id]);

  if (!user) {
    return <div>Carteira Não encontrado!</div>;
  }

  const handleDelete = () => {
    // Deletar usuário pelo id
    axios
      .delete(`http://localhost:3000/usuarios/${id}`)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Erro ao excluir carteira", error);
      });
  };

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month:"2-digit",
    year: "numeric",
  });

  return formatter.format(date);
}

  return (
    <main>
      <section className="book-info-container">
        <div className="book-info-img">
          <img src="" alt="" srcSet="" />
        </div>

        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>CPF</th>
              <th>DATA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.nome}</td>
              <td>{user.cpf}</td>
              <td>{formatDate(user.data_upload)}</td>
            </tr>
          </tbody>
        </table>

        <div className="book-info-title">
          <h2>Documentos Arquivados</h2>
        </div>

        <div className="book-info-description">
          <ul>
            <li>
              <a
                href={`http://localhost:3000/arquivos/${user.arquivo}`}
                target="__blank"
                download
              >
                {user.arquivo}
              </a>
            </li>
          </ul>

          <div className="inline-group">
            <button onClick={handleDelete} className="delete-button">
              Excluir Carteira
            </button>

            <Link to={"/"} className="nav-link">
              Voltar a página inicial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Details;

import "./style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const List = () => {
  const [users, setUsers] = useState([]);
  const [legendText, setLegendText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/usuarios")
      .then((response) => {
        setUsers(response.data);
        if (!response.data || response.data.length === 0) {
          setLegendText("Adicione usuário para preencher a lista!");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
        setLegendText("Erro ao buscar usuários.");
      });
  }, []);

  return (
    <div className="book-list">
      <h3>Suas Carteiras </h3>
      <table>
        <small className="legend">{legendText}</small>
        <thead>
          <tr>
            <th>Id</th>
            <th>NOME</th>
            <th className="description">CPF</th>
            <th>DETALHE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td className="title">{user.nome}</td>
              <td className="description">{user.cpf}</td>
              <td>
                &nbsp;
                <Link to={`/user/${user.id}`} className="nav-link-item">
                  Ver mais
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import "./style.css";
import { useState } from "react";
import axios from "axios";

export const Form = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    data: "",
    arquivo: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("nome", formData.nome);
      data.append("cpf", formData.cpf);
      data.append("data", formData.data);
      data.append("arquivo", formData.arquivo);

      const response = await axios.post("http://localhost:3000/usuario", data);

      console.log("Usuário cadastrado com sucesso:", response.data);

      setFormData({
        nome: "",
        cpf: "",
        data: "",
        arquivo: null,
      });
      setErrorMessage("");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErrorMessage("Erro ao cadastrar usuário. Por favor, tente novamente.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "arquivo" ? files[0] : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <legend className="form-legend">Cadastre-se!</legend>
      <div className="form-group">
        <input
          value={formData.nome}
          onChange={handleChange}
          type="text"
          name="nome"
          placeholder="Nome Completo"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
        />
        <input
          type="date"
          name="data"
          placeholder="Data de nascimento"
          value={formData.data}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input type="file" name="arquivo" onChange={handleChange} />
        <input type="submit" value="Cadastrar" className="button-submit" />
      </div>
    </form>
  );
};

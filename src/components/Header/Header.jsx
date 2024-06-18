import "./style.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <img
        src="/logo.png"
        alt="Book Plus, marca da empresa"
        className="img_logo"
      />

      <Link to={"/"} className="nav-link">
        Voltar a página inicial
      </Link>
    </header>
  );
};
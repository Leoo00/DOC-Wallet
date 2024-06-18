import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="headerprincipal">
        <img src="/logo.png " alt="" />
        <p>Carteira para armazenar todos e pricipais documentos.</p>
      </header>
      <Outlet />
    </div>
  );
}

export default App;

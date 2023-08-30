import { useEffect, useState } from "react";
import Cadastro from "./screens/Cadastro";
import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import { check_auth } from "./util";

function App() {
  const [auth, set_auth] = useState(false);
  const [screen, set_screen] = useState(0);

  const logout = () => {
    localStorage.removeItem('id');
    set_auth(false);
    set_screen(0);
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <div>
        {screen === 0 && <Home logout={logout} set_screen={set_screen} />}
        {screen === 1 && <Login logout={logout} set_screen={set_screen} />}
        {screen === 2 && <Dashboard logout={logout} set_screen={set_screen} />}
        {screen === 3 && <Cadastro logout={logout} set_screen={set_screen} />}
        {screen === 4 && <Profile logout={logout} set_screen={set_screen} />}
      </div>
    </>
  );
}

export default App;

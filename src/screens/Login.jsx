import { useState } from "react";
import Logo from "../components/Logo";
import { api_url } from "../config";

const Login = ({set_screen}) => {
  const [loading, set_loading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const pass = formData.get("pass");
    const data = { email, pass };

    set_loading(true)
    const f = await fetch(api_url + "/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (f.status == 200) {
      const json = await f.json();
      localStorage.setItem("id", json.user);
      set_screen(2);
    } else {
      alert('Erro ao autenticar!');
    }

    set_loading(false);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 400,
            height: 500,
            padding: 15,
            marginTop: 20,
            border: window.innerWidth <= 460 ? "none" : "1px solid #ccc",
            borderRadius: 10,
          }}
          onSubmit={login}
        >
          <Logo set_screen={set_screen} />
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            name="email"
            autoFocus={true}
            style={{ padding: 10, borderRadius: 5 }}
            required={true}
          />
          <label htmlFor="pass">Senha</label>
          <input
            type={"password"}
            name="pass"
            style={{ padding: 10, borderRadius: 5 }}
            required={true}
          />
          <button style={{ padding: 10, borderRadius: 5 }} disabled={loading}>{!loading ? 'Entrar' : '...'}</button>
          <p style={{cursor: 'pointer'}} onClick={() => set_screen(3)}>Ainda não tenho uma conta!</p>
        </form>
      </div>
    </>
  );
};

export default Login;

import { useState } from "react";
import Logo from "../components/Logo";
import { api_url } from "../config";

const Cadastro = ({set_screen}) => {
  const [loading, set_loading] = useState(false);
  const create = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const pass = formData.get('pass');
    const c_pass = formData.get('c-pass');
    const data = {email, pass};

    if(pass !== c_pass) {
      alert('As senhas não coincidem!');
      return;
    }

    set_loading(true);
    const f = await fetch(api_url + "/user/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (f.status == 200) {
      set_screen(1);
    } else {
      alert('Erro ao criar conta!');
    }
    set_loading(false);
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={create}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 400,
            height: 480,
            padding: 15,
            marginTop: 20,
            border: window.innerWidth <= 460 ? "none" : "1px solid #ccc",
            borderRadius: 10,
          }}
        >
          <Logo set_screen={set_screen} />
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            name='email'
            autoFocus={true}
            style={{ padding: 10, borderRadius: 5 }}
            required={true}
          />
          <label htmlFor="pass">Senha</label>
          <input
            type={"password"}
            name='pass'
            style={{ padding: 10, borderRadius: 5 }}
            required={true}
          />
          <label htmlFor="c-pass">Confirmar senha</label>
          <input
            type={"password"}
            name='c-pass'
            style={{ padding: 10, borderRadius: 5 }}
            required={true}
          />
          <button style={{ padding: 10, borderRadius: 5 }} disabled={loading}>{!loading ? 'Cadastrar' : '...'}</button>
          <p style={{ cursor: "pointer" }} onClick={() => set_screen(1)}>
            Tenho uma conta!
          </p>
        </form>
      </div>
    </>
  );
};

export default Cadastro;

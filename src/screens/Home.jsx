import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Consultor from "../components/Consultor";
import ConsultorO from "../components/ConsultorO";
import { Footer } from "../components/Foter";
import Logo from "../components/Logo";
import { api_url, courses, quotes } from "../config";
import { check_auth } from "../util";

const Home = ({ logout, set_screen }) => {
  const [auth, set_auth] = useState(false);
  const [loading, set_loading] = useState(false);
  const [users, set_users] = useState([]);
  const [quote, set_quote] = useState(
    Math.round(Math.random() * (quotes.length - 1))
  );

  const get_selected_course = async (e) => {
    const selected = e.target.value;
    set_loading(true);
    if (selected) {
      const f = await fetch(api_url + "/user/" + selected);
      const json = await f.json();
      set_users(json.filter(({ _id }) => _id !== localStorage.getItem("id")));
    } else {
      get_users();
    }
    set_loading(false);
  };

  const get_users = async () => {
    const f = await fetch(api_url + "/user/all");
    const json = await f.json();
    set_users(json.filter(({ _id }) => _id !== localStorage.getItem("id")));
  };

  useEffect(() => {
    set_auth(check_auth());
    get_users();

    setInterval(() => {
      let index = Math.round(Math.random() * (quotes.length - 1));

      while (index == quote) {
        index = Math.round(Math.random() * (quotes.length - 1));
      }

      set_quote(index);
    }, 15000);
  }, [auth]);

  return (
    <>
      <header
        style={{
          height: 40,
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fffffff6",
          position: "sticky",
          borderBottom: "1px solid #eee",
          top: 0,
        }}
      >
        <Logo set_screen={set_screen} />
        <div style={{ flex: 0.5 }}>
          <select
            onChange={get_selected_course}
            name="s-field"
            id="s-field"
            style={{
              display: "flex",
              width: "100%",
              padding: 5,
              borderRadius: 5,
              fontSize: 13,
              outline: "none",
            }}
          >
            <option value="">Seleccione um curso</option>
            {courses.map(({ id, label }) => (
              <option key={String(id)} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          {auth && (
            <button
              style={{ padding: 7, borderRadius: 5 }}
              onClick={() => set_screen(2)}
            >
              Dashboard
            </button>
          )}
          <button
            style={{ padding: 7, borderRadius: 5, marginLeft: 10 }}
            onClick={() => {
              if (auth) {
                logout();
                set_auth(false);
              } else {
                set_screen(1);
              }
            }}
          >
            {auth ? "Sair" : "Entrar"}
          </button>
        </div>
      </header>
      <Banner />
      <main style={{ minHeight: "100vh", display: "flex" }}>
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "20px 60px",
            flex: 3,
          }}
        >
          {loading &&
            ["0", "1", "2"].map((num) => <ConsultorO key={num} />)}
          {users.length > 0 &&
            users.map((user) => (
              <Consultor
                set_screen={set_screen}
                key={String(user._id)}
                user={user}
              />
            ))}
        </section>
        <aside style={{ flex: 1 }}>
          <div>
            <p>"{quotes[quote].quote}"</p>
            <strong>-- {quotes[quote].owner}</strong>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
};

export default Home;

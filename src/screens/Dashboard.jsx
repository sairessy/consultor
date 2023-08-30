import { useEffect, useState } from "react";
import { Footer } from "../components/Foter";
import Logo from "../components/Logo";
import { api_url, courses } from "../config";
import user_logo from "../assets/react.svg";

const Dashboard = ({ set_screen, logout }) => {
  const [name, set_name] = useState("");
  const [course, set_course] = useState("0");
  const [price, set_price] = useState("");
  const [tel, set_tel] = useState("");
  const [desc, set_desc] = useState("");
  const [img, set_img] = useState("");
  const [loading, set_loading] = useState(false);

  const get_selected_course = (e) => {
    set_course(e.target.value);
  };

  const get_user = async () => {
    const f = await fetch(api_url + "/user/byid/" + localStorage.getItem("id"));
    const json = await f.json();
    set_name(json.name);
    set_course(json.course);
    set_tel(json.tel);
    set_price(json.price);
    set_desc(json.desc);
  };

  useEffect(() => {
    get_user();
  }, []);

  const update = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("full-name");
    const course = formData.get("course");
    const price = formData.get("price");
    const tel = formData.get("tel");
    const desc = formData.get("desc");
    const data = {
      name,
      course,
      price,
      tel,
      desc,
      id: localStorage.getItem("id"),
    };

    set_loading(true);
    const f = await fetch(api_url + "/user/update", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (f.status == 200) {
      alert("Actualizado!");
    }
    set_loading(false);
  };

  return (
    <>
      <header
        style={{
          height: 30,
          borderBottom: "1px solid #ccc",
          padding: 10,
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo set_screen={set_screen} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{ padding: 7, borderRadius: 5, marginLeft: 10 }}
            onClick={() => {
              logout();
            }}
          >
            Sair
          </button>
        </div>
      </header>
      {/* <hr /> */}
      <main style={{ minHeight: "100vh" }}>
        <section style={{ display: "flex", padding: 20 }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 0.5,
              margin: "auto",
            }}
            onSubmit={update}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `url(${img || user_logo}) no-repeat center center/${
                  img ? "cover" : "30px"
                }`,
                backgroundColor: "#eee",
                marginBottom: 20
              }}
            ></div>
            <label htmlFor="full-name">Nome completo</label>
            <input
              name="full-name"
              type="text"
              value={name}
              style={{ padding: 5, borderRadius: 5, marginBottom: 10 }}
              required={true}
              onChange={(e) => set_name(e.target.value)}
            />
            <label htmlFor="course">Curso</label>
            <select
              onChange={get_selected_course}
              name="course"
              id="course"
              value={course}
              style={{
                display: "flex",
                width: "100%",
                padding: 5,
                borderRadius: 5,
                marginBottom: 10,
                fontSize: 13,
              }}
            >
              {courses.map(({ id, label }) => (
                <option key={String(id)} value={id}>
                  {label}
                </option>
              ))}
            </select>
            <label htmlFor="price">Preço por hora</label>
            <input
              name="price"
              type="number"
              style={{ padding: 5, borderRadius: 5, marginBottom: 10 }}
              min={0}
              required={true}
              value={price}
              onChange={(e) => set_price(e.target.value)}
            />
            <label htmlFor="tel">Contacto</label>
            <input
              name="tel"
              type="text"
              style={{ padding: 5, borderRadius: 5, marginBottom: 10 }}
              min={0}
              required={true}
              value={tel}
              onChange={(e) => set_tel(e.target.value)}
            />
            <label htmlFor="desc">Fale do seu trabalho</label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              defaultValue={desc}
            ></textarea>
            <button
              disabled={loading}
              style={{
                width: 200,
                padding: 5,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              {!loading ? "Actualizar" : "..."}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;

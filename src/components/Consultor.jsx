import { useEffect, useState } from "react";
import user_logo from "../assets/react.svg";
import { courses } from "../config";
import "../../src/index.css";

const Consultor = ({ user, set_screen }) => {
  const [img, set_img] = useState("");

  useEffect(() => {
    // console.log(user)
  }, []);

  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 220,
        height: 320,
        borderRadius: 10,
        padding: 10,
        paddingTop: 30,
        margin: 10,
        background: "#fff",
      }}
      className="consultor-card"
      onClick={() => {
        localStorage.setItem("selected-profile", user._id);
        set_screen(4);
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `url(${img || user_logo}) no-repeat center center/${img ? 'cover' : '30px'}`,
          backgroundColor: "#eee",
        }}
      ></div>
      <h3 style={{textAlign: 'center'}}>{user.name}</h3>
      <h4>{courses.find(({ id }) => id == user.course).label}</h4>
      <strong>
        <b style={{ color: "#2bccb1" }}>{user.price} MT</b> / Hora
      </strong>
    </div>
  );
};

export default Consultor;

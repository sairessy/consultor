const Banner = () => {
  return (
    <>
      <div
        style={{
          height: 120,
          background: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: '1px solid #ddd'
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontFamily: "ink free",
            fontWeight: "100",
            color: "#333",
          }}
        >
          Encontre consultores para qualquer curso
        </h1>
      </div>
    </>
  );
};

export default Banner;

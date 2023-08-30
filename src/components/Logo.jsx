import logo from '../assets/r.svg';

const Logo = ({set_screen}) => {
  return (
    <h1
      style={{
        fontFamily: "roboto",
        fontWeight: "bolder",
        fontSize: window.innerWidth <=460 ? 24 : 42,
        color: "#777",
        cursor: 'pointer'
      }}
      onClick={()=> set_screen(0)}
    >
    <img className='logo' width={window.innerWidth <=460 ? 30 : 'normal'} src={logo} alt="logo" style={{marginRight: 10}} />
      <span>Consultor</span>
    </h1>
  );
};

export default Logo;

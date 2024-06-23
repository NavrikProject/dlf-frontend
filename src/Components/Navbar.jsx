import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <a href="#">Home</a>
        </div>
        <div className="center">
          <div className="logo">DLF</div>
        </div>
        <div className="navbar-right">
          <a href="#">About</a>
          <a href="#">Contact Us</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

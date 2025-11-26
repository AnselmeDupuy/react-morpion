import { Link } from "react-router";

export default function Navbar() {
  return (
    <>
    <nav className="navbar">
      <div className="nav-title">Morpion</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Ranking">Ranking</Link>
      </div>
    </nav>
    </>
  );
}

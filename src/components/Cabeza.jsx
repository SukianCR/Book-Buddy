import { Link } from "react-router-dom";
export default function Cabeza() {
  return (
    <Link to="/" className="logo">
      <div className="cabeza">
        <span className="material-symbols-outlined">menu_book</span>{" "}
        <h1 className="playwrite sides-space"> Book Buddy</h1>{" "}
        <span className="material-symbols-outlined">local_library</span>
      </div>
    </Link>
  );
}

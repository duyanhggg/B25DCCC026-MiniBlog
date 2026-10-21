import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <h2>Trang này đi lạc mất rồi.</h2>
      <p>Có lẽ nó đang nằm trong một cuốn sổ khác.</p>

      <Link to="/" className="button-link">
        Về bảng tin
      </Link>
    </section>
  );
}
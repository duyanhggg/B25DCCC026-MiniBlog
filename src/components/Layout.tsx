import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            Mực &amp; Gió
          </Link>

          <nav className="nav">
            <Link to="/">Bảng tin</Link>

            {isAuthenticated && <Link to="/create">Viết bài</Link>}

            {isAuthenticated ? (
              <button onClick={handleLogout} className="link-button">
                Rời phòng viết
              </button>
            ) : (
              <Link to="/login">Mở khóa góc viết</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <p>Mực &amp; Gió · một góc nhỏ cho những điều đáng nhớ</p>
      </footer>
    </>
  );
}
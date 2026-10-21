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
            MiniBlog
          </Link>

          <nav className="nav">
            <Link to="/">Trang chủ</Link>

            {isAuthenticated && <Link to="/create">Viết bài</Link>}

            {isAuthenticated ? (
              <button onClick={handleLogout} className="link-button">
                Đăng xuất
              </button>
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <p>MiniBlog - React + TypeScript</p>
      </footer>
    </>
  );
}
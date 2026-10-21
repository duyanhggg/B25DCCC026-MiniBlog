import { useState, type FormEvent } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
      return;
    }

    const success = login(username, password);

    if (!success) {
      setError("Tài khoản hoặc mật khẩu không chính xác");
      return;
    }

    const from = location.state?.from?.pathname || "/create";

    navigate(from, { replace: true });
  }

  return (
    <section className="form-page">
      <h1>Đăng nhập</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="username">Tài khoản</label>

        <input
          id="username"
          type="text"
          placeholder="admin"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Mật khẩu</label>

        <input
          id="password"
          type="password"
          placeholder="123456"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Đăng nhập</button>
      </form>

      <p className="login-hint">
        Tài khoản: <strong>admin</strong>
        <br />
        Mật khẩu: <strong>123456</strong>
      </p>
    </section>
  );
}
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <h2>Không tìm thấy trang</h2>
      <p>Đường dẫn bạn truy cập không tồn tại.</p>

      <Link to="/" className="button-link">
        Về trang chủ
      </Link>
    </section>
  );
}
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";
import type { Post } from "../types";

const LOCAL_POSTS_KEY = "miniblog_posts";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError("");

        const apiPosts = await getPosts();

        const savedPosts = localStorage.getItem(LOCAL_POSTS_KEY);
        const localPosts: Post[] = savedPosts ? (() => {
          try {
            return JSON.parse(savedPosts) as Post[];
          } catch {
            return [];
          }
        })() : [];

        setPosts([...localPosts, ...apiPosts]);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Đã xảy ra lỗi khi tải bài viết"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const search = keyword.toLowerCase().trim();

    if (!search) {
      return posts;
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(search)
    );
  }, [posts, keyword]);

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Danh sách bài viết</h1>
          <p>Khám phá các bài viết mới nhất</p>
        </div>

        <input
          type="search"
          className="search-input"
          placeholder="Tìm theo tiêu đề..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>

      {loading && <p className="loading">Đang tải bài viết...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && filteredPosts.length === 0 && (
        <p>Không tìm thấy bài viết phù hợp.</p>
      )}

      <div className="post-grid">
        {filteredPosts.map((post) => (
          <article className="post-card" key={post.id}>
            {post.isLocal && (
              <span className="badge">Bài viết mới</span>
            )}

            <h2>{post.title}</h2>

            <p>{post.body.slice(0, 150)}...</p>

            <Link to={`/posts/${post.id}`} className="read-more">
              Đọc tiếp →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
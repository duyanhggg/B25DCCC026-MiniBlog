import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types";

const LOCAL_POSTS_KEY = "miniblog_posts";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  function validateForm() {
    const newErrors: string[] = [];

    if (title.trim().length < 5) {
      newErrors.push("Tiêu đề phải có ít nhất 5 ký tự");
    }

    if (title.trim().length > 100) {
      newErrors.push("Tiêu đề không được vượt quá 100 ký tự");
    }

    if (body.trim().length < 20) {
      newErrors.push("Nội dung phải có ít nhất 20 ký tự");
    }

    return newErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const savedPosts = localStorage.getItem(LOCAL_POSTS_KEY);
    const currentPosts: Post[] = savedPosts
      ? JSON.parse(savedPosts)
      : [];

    const newPost: Post = {
      id: Date.now(),
      userId: 1,
      title: title.trim(),
      body: body.trim(),
      isLocal: true,
    };

    localStorage.setItem(
      LOCAL_POSTS_KEY,
      JSON.stringify([newPost, ...currentPosts])
    );

    navigate("/");
  }

  return (
    <section className="form-page">
      <h1>Viết bài mới</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Tiêu đề</label>

        <input
          id="title"
          type="text"
          placeholder="Nhập tiêu đề bài viết"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="body">Nội dung</label>

        <textarea
          id="body"
          rows={10}
          placeholder="Nhập nội dung bài viết"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />

        {errors.length > 0 && (
          <div className="error-list">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        <button type="submit">Đăng bài</button>
      </form>
    </section>
  );
}
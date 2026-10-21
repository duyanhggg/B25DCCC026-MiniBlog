import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getCommentsByPostId,
  getPostById,
} from "../services/api";
import type { Comment, Post } from "../types";

const LOCAL_POSTS_KEY = "miniblog_posts";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPostDetail() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const savedPosts = localStorage.getItem(LOCAL_POSTS_KEY);
        const localPosts: Post[] = savedPosts ? (() => {
          try {
            return JSON.parse(savedPosts) as Post[];
          } catch {
            return [];
          }
        })() : [];

        const localPost = localPosts.find(
          (item) => Number(item.id) === Number(id)
        );

        if (localPost) {
          setPost(localPost);
          setComments([]);
          return;
        }

        const [postData, commentsData] = await Promise.all([
          getPostById(id),
          getCommentsByPostId(id),
        ]);

        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Không thể tải nội dung bài viết"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPostDetail();
  }, [id]);

  if (loading) {
    return <p className="loading">Đang tải bài viết...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!post) {
    return <p className="error">Không tìm thấy bài viết.</p>;
  }

  return (
    <section className="detail-page">
      <Link to="/" className="back-link">
        ← Quay lại trang chủ
      </Link>

      <article className="post-detail">
        <h1>{post.title}</h1>

        <p className="post-meta">
          Tác giả: User {post.userId}
        </p>

        <p className="post-body">{post.body}</p>
      </article>

      <section className="comments">
        <h2>Bình luận ({comments.length})</h2>

        {post.isLocal ? (
          <p>Bài viết mới chưa có bình luận.</p>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <h3>{comment.name}</h3>
              <p className="comment-email">{comment.email}</p>
              <p>{comment.body}</p>
            </div>
          ))
        )}
      </section>
    </section>
  );
}
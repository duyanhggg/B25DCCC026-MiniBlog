import type { Post, Comment } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
        throw new Error('Không tải được danh sách bài viết');
    }
    const posts: Post[] = await response.json();
    return posts;
}

export async function fetchPosts(): Promise<Post[]> {
    return getPosts();
}

export async function getPostById(postId: string): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    if (!response.ok) {
        throw new Error(`Không tải được bài viết với id ${postId}`);
    }
    const post: Post = await response.json();
    return post;
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
        throw new Error(`Không tải được bình luận cho bài viết với id ${postId}`);
    }
    const comments: Comment[] = await response.json();
    return comments;
}

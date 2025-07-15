'use client';
import { useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'My Blog', content: 'Hello All' }
  ]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addPost = () => {
    if (!title || !content) return;
    setPosts([{ id: Date.now(), title, content }, ...posts]);
    setTitle('');
    setContent('');
  };

  const deletePost = (id) => setPosts(posts.filter(p => p.id !== id));
  const startEdit = (id) => setEditingId(id);
  const saveEdit = (id, newTitle, newContent) => {
    setPosts(posts.map(p => p.id === id ? { ...p, title: newTitle, content: newContent } : p));
    setEditingId(null);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 text-black">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-6">My Blog</h1>

      <div className="bg-yellow-100 p-4 rounded mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-2 border border-purple-300 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full p-2 mb-2 border border-purple-300 rounded"
        />
        <button onClick={addPost} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">Post</button>
      </div>

      {posts.map((post) =>
        editingId === post.id ? (
          <EditPost key={post.id} post={post} onSave={saveEdit} onCancel={() => setEditingId(null)} />
        ) : (
          <div key={post.id} className="bg-white p-4 rounded shadow mb-4 border-l-4 border-purple-500">
            <h2 className="text-2xl font-semibold text-purple-700">{post.title}</h2>
            <p className="text-gray-800 mb-2">{post.content}</p>
            <button onClick={() => startEdit(post.id)} className="text-blue-600 mr-3">Edit</button>
            <button onClick={() => deletePost(post.id)} className="text-red-600">Delete</button>
          </div>
        )
      )}
    </main>
  );
}

function EditPost({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  return (
    <div className="bg-white p-4 rounded shadow mb-4 border-l-4 border-blue-500">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border border-blue-300 rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-2 border border-blue-300 rounded"
      />
      <button onClick={() => onSave(post.id, title, content)} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Save</button>
      <button onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
    </div>
  );
}

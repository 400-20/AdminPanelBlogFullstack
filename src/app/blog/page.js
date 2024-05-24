"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../helpers/AuthContext'; 

export default function Home() {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from context
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    fetch('/api/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data.data))
      .catch(error => console.error('Fetch error:', error));
  };

  const deleteBlog = (id) => {
    fetch(`/api/blogs?id=${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => fetchBlogs())
      .catch(error => console.error('Delete error:', error));
  };

  const updateBlog = (id) => {
    fetch(`/api/blogs?id=${id}`, { 
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title: updatedTitle, content: updatedContent })
    })
      .then(response => response.json())
      .then(() => {
        fetchBlogs();
        setIsEditing(false);
        setCurrentBlog(null);
      })
      .catch(error => console.error('Update error:', error));
  };

  const startEditing = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="flex flex-wrap -m-4">
        {blogs.map(blog => (
          <div key={blog._id} className="p-4 md:w-1/3 w-full">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="leading-relaxed text-gray-700">{blog.content}</p>
                {isLoggedIn && (
                  <div className='flex gap-3'>
                    <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 text-white rounded p-2 border border-red-500  hover:border-white">Delete</button>
                    <button onClick={() => startEditing(blog)} className="bg-blue-500 text-white p-2 rounded border border-blue-500  hover:border-white">Update</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {isEditing && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center backdrop-blur border border-frost rounded-lg shadow-md transition">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl mb-4 text-black">Edit Blog</h2>
            <label className="block mb-2 text-black">Title</label>
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
              placeholder='title'
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <label className="block mb-2 text-black">Content</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
            <button onClick={() => updateBlog(currentBlog._id)} className="bg-blue-500 text-white p-2 rounded">Save</button>
            <button onClick={() => { setIsEditing(false); setCurrentBlog(null); }} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

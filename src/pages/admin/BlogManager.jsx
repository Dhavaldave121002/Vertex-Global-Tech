import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaNewspaper, FaTag, FaImage, FaCheck, FaTimes, FaCalendarAlt, FaQuoteLeft } from 'react-icons/fa';

const DEFAULT_POSTS = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    category: "Technology",
    date: "Dec 28, 2025",
    excerpt: "Exploring the latest trends in AI-driven development, serverless edge computing, and the next generation of web frameworks.",
    content: "As we move into 2025, web development is undergoing a paradigm shift. AI coding assistants, serverless edge computing, and WebAssembly are no longer just buzzwords but integral parts of the development workflow. Developers are now architects of complex systems rather than just code writers.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 2,
    title: "Optimizing React Performance",
    category: "Development",
    date: "Dec 15, 2025",
    excerpt: "Key strategies to ensure your React applications run smoothly on all devices, from mobile to desktop.",
    content: "React 19 and beyond have introduced powerful concurrent features. However, fundamental optimization techniques like memoization, effective code splitting, and virtualization remain crucial for delivering 60fps experiences on mobile devices.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 3,
    title: "UI/UX Best Practices for eCommerce",
    category: "Design",
    date: "Nov 30, 2025",
    excerpt: "How to design interfaces that maximize conversion rates and turn visitors into loyal customers.",
    content: "In the competitive world of eCommerce, friction is the enemy. We explore how simplified checkout flows, biometric authentication, and personalized product recommendations can significantly boost conversion rates.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d4f?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 4,
    title: "The Rise of No-Code Platforms",
    category: "Business",
    date: "Nov 12, 2025",
    excerpt: "Understanding how no-code tools are empowering businesses to launch products faster than ever.",
    content: "No-code platforms are democratizing software creation. While custom code remains essential for scalar, complex systems, no-code solutions are perfect for MVP validation and internal tools, allowing businesses to move at unprecedented speeds.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 5,
    title: "Cybersecurity Essentials for Startups",
    category: "Technology",
    date: "Oct 28, 2025",
    excerpt: "Protecting your digital assets is not optional. Here is a checklist for securing your startup's infrastructure.",
    content: "Security cannot be an afterthought. From implementing Zero Trust architectures to regular penetration testing, we outline the non-negotiable security practices that every modern startup must adopt to survive in a hostile digital landscape.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 6,
    title: "Mastering Tailwind CSS",
    category: "Development",
    date: "Oct 15, 2025",
    excerpt: "A deep dive into utility-first CSS and how to build complex, responsive layouts in record time.",
    content: "Tailwind CSS has revolutionized styling. We look at advanced configuration, creating custom plugins, and how to maintain strict design systems while enjoying the speed and flexibility of utility classes.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2070"
  }
];

const CATEGORIES = ["Technology", "Development", "Design", "Business"];

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: '',
    title: '',
    category: 'Technology',
    date: '',
    excerpt: '',
    content: '',
    image: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('vgtw_blog');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(DEFAULT_POSTS);
      localStorage.setItem('vgtw_blog', JSON.stringify(DEFAULT_POSTS));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem('vgtw_blog', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSave = (e) => {
    e.preventDefault();
    let newPosts;
    if (currentPost.id) {
      // Edit
      newPosts = posts.map(p =>
        p.id === currentPost.id ? currentPost : p
      );
    } else {
      // Add
      const newEntry = {
        ...currentPost,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      newPosts = [newEntry, ...posts];
    }
    setPosts(newPosts);
    saveToStorage(newPosts);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const filtered = posts.filter(p => p.id !== id);
      setPosts(filtered);
      saveToStorage(filtered);
    }
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentPost({ id: '', title: '', category: 'Technology', date: '', excerpt: '', content: '', image: '' });
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020617] font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Blog & Insights</h1>
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-[10px]">Content Management System</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
          >
            <FaPlus /> Publish New Article
          </button>
        </header>

        {/* Modal / Form */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={resetForm}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative w-full max-w-4xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-3xl p-8 overflow-y-auto max-h-[90vh]"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {currentPost.id ? 'Edit Blog Post' : 'New Blog Post'}
                </h2>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Article Title</label>
                      <div className="relative group">
                        <FaNewspaper className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          required
                          value={currentPost.title}
                          onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                          placeholder="e.g. The Future of AI"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Category</label>
                      <div className="relative group">
                        <FaTag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                        <select
                          required
                          value={currentPost.category}
                          onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Featured Image URL</label>
                    <div className="relative group">
                      <FaImage className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="url"
                        required
                        value={currentPost.image}
                        onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Excerpt / Summary</label>
                    <div className="relative group">
                      <FaQuoteLeft className="absolute left-5 top-6 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <textarea
                        required
                        rows="3"
                        value={currentPost.excerpt}
                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                        placeholder="Brief summary that appears on the blog listing..."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Article Content</label>
                    <div className="relative group">
                      <textarea
                        required
                        rows="8"
                        value={currentPost.content}
                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                        placeholder="Write the full article content here..."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <FaCheck /> {currentPost.id ? 'Update Article' : 'Publish Article'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500 shadow-xl"
            >
              {/* Image Section */}
              <div className="h-56 overflow-hidden relative bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                {post.image ? (
                  <>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaNewspaper className="text-6xl text-white/20" />
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2">
                    <FaTag className="text-blue-400" /> {post.category}
                  </span>
                </div>

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-3 bg-black/60 backdrop-blur-md hover:bg-blue-600 rounded-xl text-white transition-all shadow-xl"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-3 bg-black/60 backdrop-blur-md hover:bg-red-600 rounded-xl text-white transition-all shadow-xl"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FaCalendarAlt /> {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Live_Node</span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tighter line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                  {post.content}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Add New Ghost Card */}
          <button
            onClick={() => setIsEditing(true)}
            className="group h-[480px] flex flex-col items-center justify-center gap-4 bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <FaPlus size={20} />
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Publish New Article</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;

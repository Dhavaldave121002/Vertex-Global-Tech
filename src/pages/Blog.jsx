import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { FaCalendarAlt, FaTag, FaArrowRight, FaTimes, FaSearch } from 'react-icons/fa'
import PageHero from '../components/UI/PageHero'
import SEO from '../components/SEO'

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState([])

  const categories = ["All", "Technology", "Development", "Design", "Business"]

  React.useEffect(() => {
    const loadPosts = () => {
      const saved = localStorage.getItem('vgtw_blog');
      if (saved) {
        setPosts(JSON.parse(saved));
      } else {
        // Default posts
        const defaultPosts = [
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
        setPosts(defaultPosts);
      }
    };

    loadPosts();
    window.addEventListener('storage', loadPosts);
    return () => window.removeEventListener('storage', loadPosts);
  }, []);

  // Filtering Logic
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#030712] min-h-screen relative overflow-x-hidden font-sans">
      <SEO
        title="Blog & Insights"
        description="Read the latest insights on web development, technology trends, and digital innovation from Vertex Global Tech."
        keywords="tech blog, web development blog, digital insights, software trends"
      />
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <PageHero
          title="Latest Insights"
          highlight="Insights"
          subtitle="Thoughts, tutorials, and trends from the Vertex Global Tech team."
          badge="Our Blog"
        />

        <div className="container mx-auto px-6 pb-32">
          {/* Filter & Search Bar */}
          <div className="mb-16 relative z-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-3 md:p-4 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl max-w-5xl mx-auto shadow-xl shadow-black/20">
              {/* Categories */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
                <LayoutGroup>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`relative px-5 py-2.5 rounded-xl text-sm font-black transition-colors duration-300 border border-transparent overflow-hidden ${selectedCategory === cat
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <span className="relative z-10 uppercase tracking-widest">{cat}</span>
                      {selectedCategory === cat && (
                        <motion.div
                          layoutId="activeCategory"
                          className="absolute inset-0 bg-blue-600"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </LayoutGroup>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1e293b]/50 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:bg-[#1e293b] focus:shadow-lg focus:shadow-blue-500/10 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="overflow-hidden">
            <AnimatePresence mode='popLayout'>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.article
                    layout
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer flex flex-col h-full"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2">
                          <FaTag className="text-blue-400" /> {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">{post.date}</div>
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 uppercase tracking-tighter">{post.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">{post.excerpt}</p>
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center text-blue-500 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Read Full Insight <FaArrowRight className="ml-2" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} className="mt-4 text-blue-400 hover:text-blue-300 underline font-bold">Clear filters</button>
            </div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedPost && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]" onClick={() => setSelectedPost(null)} />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 40 }} className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setSelectedPost(null)} className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors border border-white/10 flex items-center justify-center">
                    <FaTimes />
                  </button>
                  <div className="h-64 md:h-[400px] w-full shrink-0">
                    <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:p-16 flex flex-col">
                    <div className="flex items-center gap-4 text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">{selectedPost.date}</div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight uppercase tracking-tighter">{selectedPost.title}</h2>
                    <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed text-lg">
                      <p className="font-bold text-gray-200 mb-8">{selectedPost.excerpt}</p>
                      <p>{selectedPost.content}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

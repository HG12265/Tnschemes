import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Hero from './sections/Hero';
import Features from './sections/Features';
import AuthModal from './components/AuthModal';
import CategorySelection from './sections/CategorySelection';
import DetailsForm from './sections/DetailsForm';
import ResultsPage from './sections/ResultsPage'; // Intha file-ah kela kuduthuruken
import { Loader2, Sparkles } from 'lucide-react';

function App() {
  // --- States ---
  const [status, setStatus] = useState("Offline");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home'); // home, categories, form, results
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Logic Functions ---

  const checkUser = () => {
    const savedUser = localStorage.getItem('user');
    setUser(savedUser ? JSON.parse(savedUser) : null);
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('storage', checkUser);
    
    fetch('http://localhost:5000/api/status')
      .then(res => res.json())
      .then(data => { if(data.message === "Backend Connected!") setStatus("Online"); })
      .catch(() => setStatus("Offline"));

    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setView('home');
  };

  const handleGetStarted = () => {
    if (!user) {
      setIsAuthOpen(true);
    } else {
      setView('categories');
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setView('form');
  };

  // --- AI API CALL LOGIC ---
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/match-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          details: formData
        })
      });

      if (!response.ok) throw new Error("AI connection failed");

      const data = await response.json();
      setResults(data);
      setView('results'); // AI results vanthathum page mathrum
    } catch (err) {
      console.error(err);
      alert("Oops! AI server is busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] selection:bg-indigo-500/30 overflow-x-hidden text-white font-sans">
      <Background />
      
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} user={user} onLogout={handleLogout} />
      
      <main className="relative z-10">
        
        {/* VIEW 1: HOME */}
        {view === 'home' && (
          <>
            <Hero backendStatus={status} user={user} onStart={handleGetStarted} />
            <Features />
          </>
        )}

        {/* VIEW 2: CATEGORY SELECTION */}
        {view === 'categories' && (
          <CategorySelection 
            onBack={() => setView('home')} 
            onSelect={handleCategorySelect} 
          />
        )}

        {/* VIEW 3: DYNAMIC FORM */}
        {view === 'form' && (
          <DetailsForm 
            categoryId={selectedCategory}
            onBack={() => setView('categories')}
            onSubmit={handleFormSubmit}
          />
        )}

        {/* VIEW 4: AI RESULTS PAGE */}
        {view === 'results' && (
          <ResultsPage 
            results={results} 
            onBack={() => setView('form')} 
          />
        )}

        {/* AI LOADING OVERLAY */}
        {loading && (
          <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
              <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight">AI is Analyzing...</h2>
            <p className="text-gray-400 mt-2">Finding eligible Tamil Nadu schemes for you.</p>
          </div>
        )}

      </main>
      
      <AuthModal isOpen={isAuthOpen} onClose={() => { setIsAuthOpen(false); checkUser(); }} />

      <footer className="py-12 text-center border-t border-white/5 mt-10">
        <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase">
          TNSCHEMES • Powered by Gemini Pro AI
        </p>
      </footer>
    </div>
  );
}

export default App;
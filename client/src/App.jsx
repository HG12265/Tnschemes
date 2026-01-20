import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Hero from './sections/Hero';
import Features from './sections/Features';
import AuthModal from './components/AuthModal';
import CategorySelection from './sections/CategorySelection';
import DetailsForm from './sections/DetailsForm'; // Dynamic Form Import

function App() {
  // --- States ---
  const [status, setStatus] = useState("Offline");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // Navigation State: 'home', 'categories', or 'form'
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- Logic Functions ---

  // User state-ah check panna
  const checkUser = () => {
    const savedUser = localStorage.getItem('user');
    setUser(savedUser ? JSON.parse(savedUser) : null);
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('storage', checkUser);
    
    // Backend Connection Check
    fetch('http://localhost:5000/api/status')
      .then(res => res.json())
      .then(data => { if(data.message === "Backend Connected!") setStatus("Online"); })
      .catch(() => setStatus("Offline"));

    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setView('home'); // Logout panna automatically home-ku vanthidum
  };

  // Get Started Button Click Logic
  const handleGetStarted = () => {
    if (!user) {
      setIsAuthOpen(true); // Login pannalana login panna sollum
    } else {
      setView('categories'); // Login panni iruntha categories kaatum
    }
  };

  // Category select panna call aagura function
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setView('form'); // Form view-ku mathidum
  };

  // Final Form Submit Logic (Next step result page-kku)
  const handleFormSubmit = (formData) => {
    console.log("Category:", selectedCategory);
    console.log("User Data:", formData);
    alert("Data Captured! Finding your schemes...");
    // Adutha step-la backend matching logic inge varum
  };

  // --- Rendering UI ---
  return (
    <div className="relative min-h-screen bg-[#030712] selection:bg-indigo-500/30 overflow-x-hidden text-white font-sans">
      
      {/* 1. Global Background Logic */}
      <Background />

      {/* 2. Floating Navbar */}
      <Navbar 
        onOpenAuth={() => setIsAuthOpen(true)} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      {/* 3. Main Content Area */}
      <main className="relative z-10">
        
        {/* VIEW 1: HOME PAGE */}
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

        {/* VIEW 3: DYNAMIC DETAILS FORM */}
        {view === 'form' && (
          <DetailsForm 
            categoryId={selectedCategory}
            onBack={() => setView('categories')}
            onSubmit={handleFormSubmit}
          />
        )}

      </main>
      
      {/* 4. Login/Register Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => { setIsAuthOpen(false); checkUser(); }} 
      />

      {/* 5. Modern Footer */}
      <footer className="py-12 text-center border-t border-white/5 mt-10">
        <p className="text-gray-500 text-xs tracking-widest uppercase">
          © 2026 TNSCHEMES Portal • Powered by AI Intelligence
        </p>
      </footer>

    </div>
  );
}

export default App;
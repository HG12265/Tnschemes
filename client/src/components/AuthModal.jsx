import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const endpoint = isLogin ? '/api/login' : '/api/register';
  
  try {
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setMsg(data.message);

    if (res.ok) {
      if (!isLogin) {
        // Registration success aanathum automatic-ah login form-ku mathurom
        setTimeout(() => {
          setIsLogin(true);
          setMsg("Account created! Please login now.");
        }, 1500);
      } else {
        // Login success aanathum localStorage-la data store panrom
        localStorage.setItem('user', JSON.stringify({ name: data.username }));
        // App-ku signal anupuroam (Ithu next step-la handle pannuvom)
        window.dispatchEvent(new Event("storage")); 
        setTimeout(() => onClose(), 1000);
      }
    }
  } catch (err) {
    setMsg("Server Error!");
  }
  setLoading(false);
};  

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#0f172a] border border-white/10 p-8 rounded-[2rem] shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-400 text-sm mb-8">{isLogin ? 'Enter your details to access your dashboard.' : 'Join us to find your eligible schemes.'}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" placeholder="Username" required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input 
                  type="email" placeholder="Email Address" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input 
                  type="password" placeholder="Password" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              {msg && <p className={`text-sm text-center ${msg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>}

              <button 
                type="submit" disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Register Now')}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"} 
              <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-400 font-bold ml-1 hover:underline transition">
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
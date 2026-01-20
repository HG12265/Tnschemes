import React from 'react';
import { LayoutGrid, LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ onOpenAuth, user, onLogout }) => {
  return (
    <div className="fixed top-6 w-full z-50 px-6">
      <motion.nav className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-6 h-16 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
            <LayoutGrid className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black text-white">TN<span className="text-indigo-400">SCHEMES</span></span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            // Logged In UI
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <UserIcon className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-gray-200">{user.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            // Logged Out UI
            <>
              <button className="hidden sm:block px-4 py-2 text-sm font-bold text-gray-300 hover:text-white transition">Sign In</button>
              <button 
                onClick={onOpenAuth}
                className="px-5 py-2.5 text-sm font-bold bg-white text-black rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-lg"
              >
                Join Now
              </button>
            </>
          )}
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
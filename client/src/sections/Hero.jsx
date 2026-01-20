import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = ({ backendStatus, user, onStart }) => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.section 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="pt-40 pb-20 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div variants={itemVars} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-medium text-gray-600">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Empowering Citizens of Tamil Nadu
            <span className={`w-2 h-2 rounded-full ml-2 ${backendStatus === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          </span>
        </motion.div>

        <motion.h1 variants={itemVars} className="text-5xl md:text-8xl font-black text-white tracking-tight mb-8">
          Your Future, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Fully Eligible.
          </span>
        </motion.h1>

        <motion.p variants={itemVars} className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          The smart way to find government welfare. We analyze thousands of data points to find schemes you didn't even know existed.
        </motion.p>

        <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-5">
          <motion.button 
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/20 flex items-center gap-3 transition-all"
            >
              {user ? 'Go to Dashboard' : 'Get Started Now'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          
          <motion.button 
            whileHover={{ backgroundColor: '#f3f4f6', color: '#000' }}
            className="px-10 py-5 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold text-lg transition-all"
          >
            Explore Schemes
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero; // <--- Ithu miss aagi irukalam
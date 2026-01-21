import React, { useState } from 'react'; // useState add panniyachu
import InstructionsModal from '../components/InstructionsModal';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle2, Award, Sparkles } from 'lucide-react';

const ResultsPage = ({ results, onBack }) => {
  // Modal control pannuvatharkkana States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeScheme, setActiveScheme] = useState(null);

  // Button click panna intha function call aagum
  const handleOpenInstructions = (schemeName) => {
    setActiveScheme(schemeName);
    setIsModalOpen(true);
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Modify Details
          </button>
          <h2 className="text-3xl md:text-5xl font-black text-white">Eligible <span className="text-indigo-400">Schemes</span></h2>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 flex items-center gap-3">
          <Sparkles className="text-indigo-400 w-6 h-6" />
          <span className="text-sm font-semibold text-indigo-100">AI found {results.length} schemes for your profile</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {results.map((scheme, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-indigo-500/40 transition-all shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Award size={120} />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-1 rounded-full text-green-400">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-xs font-black text-green-400 tracking-widest uppercase">Eligible</span>
              </div>
              <div className="px-4 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-[10px] font-bold text-indigo-300 uppercase">
                {scheme.match || "High"} Match
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight">
              {scheme.name}
            </h3>
            
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-2xl">
              {scheme.benefit}
            </p>

            {/* Intha button ippo Modal-ah open pannum */}
            <button 
              onClick={() => handleOpenInstructions(scheme.name)}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-colors active:scale-95"
            >
              How to Apply <ExternalLink size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Instructions Modal Component */}
      <InstructionsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        schemeName={activeScheme}
      />

    </motion.section>
  );
};

export default ResultsPage;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ClipboardList, MousePointer2, Globe, AlertCircle, Loader2, Sparkles, ChevronRight } from 'lucide-react';

const InstructionsModal = ({ isOpen, onClose, schemeName }) => {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && schemeName) fetchDetails();
  }, [isOpen, schemeName]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/scheme-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheme_name: schemeName })
      });
      const data = await res.json();
      setDetails(data.details);
    } catch (err) {
      setDetails("Error: Unable to fetch guidance at this moment.");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 md:px-6">
          {/* Backdrop with Heavy Blur */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          {/* Main Content Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f172a] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(79,70,229,0.2)] overflow-hidden flex flex-col"
          >
            {/* Header Area */}
            <div className="p-8 border-b border-white/5 bg-gradient-to-r from-indigo-500/10 to-transparent flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
                  <ClipboardList size={28} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">{schemeName}</h2>
                  <div className="flex items-center gap-2 mt-1 text-indigo-400 text-sm font-bold uppercase tracking-wider">
                    <Sparkles size={14} /> AI Application Guide
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 transition-all active:scale-90">
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <Loader2 className="animate-spin text-indigo-500" size={48} />
                    <div className="absolute inset-0 blur-xl bg-indigo-500/20 animate-pulse"></div>
                  </div>
                  <p className="text-gray-400 mt-6 font-medium animate-pulse">Analyzing application steps...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Left Column: Tips & Important Info */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-3xl">
                      <h4 className="text-indigo-400 font-bold mb-3 flex items-center gap-2 italic">
                        <AlertCircle size={16} /> Quick Tips
                      </h4>
                      <ul className="text-xs text-indigo-100/60 space-y-3 leading-relaxed">
                        <li>• Ensure your Ration Card is updated.</li>
                        <li>• Keep Aadhar linked with Phone No.</li>
                        <li>• Visit E-Sevai for offline help.</li>
                      </ul>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl">
                      <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 italic">
                        <Globe size={16} /> Support
                      </h4>
                      <p className="text-xs text-emerald-100/60">Official Govt Portals are the only valid way to apply. Do not pay middlemen.</p>
                    </div>
                  </div>

                  {/* Right Column: AI Generated Steps */}
                  <div className="md:col-span-2">
                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem]">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <MousePointer2 className="text-indigo-400" size={20} /> Application Steps
                      </h3>
                      
                      {/* Formatted Text Content */}
                      <div className="text-gray-300 text-sm leading-8 whitespace-pre-wrap selection:bg-indigo-500/30">
                        {details.split('\n').map((line, i) => (
                           <motion.p 
                             key={i} 
                             initial={{ opacity: 0, x: 10 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.05 }}
                             className="mb-4 flex items-start gap-3"
                           >
                              {line.trim().length > 0 && <ChevronRight className="w-4 h-4 mt-2 text-indigo-500 flex-shrink-0" />}
                              {line}
                           </motion.p>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5 flex justify-center">
               <button 
                 onClick={onClose}
                 className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-xl shadow-black/20"
               >
                 I Understand, Let's Proceed
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InstructionsModal;
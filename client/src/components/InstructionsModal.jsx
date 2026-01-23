import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ClipboardList, MousePointer2, Globe, AlertCircle, 
  Loader2, Sparkles, ChevronRight, ExternalLink, Search 
} from 'lucide-react';

const InstructionsModal = ({ isOpen, onClose, schemeName }) => {
  const [guide, setGuide] = useState("");
  const [officialUrl, setOfficialUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && schemeName) fetchDetails();
  }, [isOpen, schemeName]);

  const fetchDetails = async () => {
    setLoading(true);
    setGuide("");
    setOfficialUrl("");
    try {
      const res = await fetch('http://localhost:5000/api/scheme-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheme_name: schemeName })
      });
      
      const data = await res.json();
      setGuide(data.guide || "Guide not available.");
      setOfficialUrl(data.url || "");
    } catch (err) {
      setGuide("Error: Unable to fetch guidance at this moment. Please check your connection.");
    }
    setLoading(false);
  };

  // Google Search URL generate panna
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(schemeName + " official website tamil nadu government")}`;

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
                  <h2 className="text-xl md:text-3xl font-black text-white pr-6 leading-tight">{schemeName}</h2>
                  <div className="flex items-center gap-2 mt-1 text-indigo-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    <Sparkles size={14} /> AI Application Guide
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 transition-all active:scale-90 flex-shrink-0">
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <Loader2 className="animate-spin text-indigo-500" size={48} />
                    <div className="absolute inset-0 blur-xl bg-indigo-500/20 animate-pulse"></div>
                  </div>
                  <p className="text-gray-400 mt-6 font-medium animate-pulse tracking-wide">Analyzing application process...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Official Links & Fallbacks */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl">
                      <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 italic">
                        <Globe size={18} /> Official Portal
                      </h4>
                      <p className="text-[11px] text-emerald-100/60 mb-5 leading-relaxed">
                        If the link below fails (404 Error), use the Google Search option to find the updated portal.
                      </p>
                      
                      <div className="flex flex-col gap-3">
                        {officialUrl && (
                          <a 
                            href={officialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-emerald-600 py-3 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                          >
                            Open Portal <ExternalLink size={14} />
                          </a>
                        )}
                        
                        {/* Fallback Google Search */}
                        <a 
                          href={googleSearchUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 py-2.5 rounded-xl hover:bg-emerald-500/10 transition-all active:scale-95"
                        >
                          Search on Google <Search size={12} />
                        </a>
                      </div>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-3xl">
                      <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2 italic">
                        <AlertCircle size={18} /> Important Note
                      </h4>
                      <p className="text-[11px] text-amber-100/60 leading-relaxed font-medium">
                        TN Govt links update frequently. For 100% accuracy, visit your nearest <span className="text-amber-300">CSC / E-Sevai center</span> with your documents.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: AI Generated Steps */}
                  <div className="lg:col-span-2">
                    <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem]">
                      <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 underline underline-offset-8 decoration-indigo-500/30">
                        <MousePointer2 className="text-indigo-400" size={24} /> 
                        How to Apply
                      </h3>
                      
                      <div className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                        {guide.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                           <motion.div 
                             key={i} 
                             initial={{ opacity: 0, x: 10 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.04 }}
                             className="mb-4 flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.01] hover:bg-white/[0.04] transition-colors group"
                           >
                              <div className="mt-1 bg-indigo-500/20 p-1.5 rounded-lg group-hover:bg-indigo-500/40 transition-colors">
                                <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
                              </div>
                              <span className="flex-1 leading-relaxed">{line}</span>
                           </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-8 bg-white/[0.01] border-t border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
               <button 
                 onClick={onClose}
                 className="w-full md:w-auto px-10 py-4 text-gray-500 font-bold hover:text-white transition-colors"
               >
                 Go Back
               </button>

               {officialUrl && (
                 <a 
                   href={officialUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full md:w-auto px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all active:scale-95 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3"
                 >
                   Apply via Official Portal <Globe size={20} />
                 </a>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InstructionsModal;
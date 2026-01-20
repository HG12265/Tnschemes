import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Tractor, 
  User as WomanIcon, // Gender icon fix
  HeartPulse, 
  Briefcase, 
  Users, 
  Construction, 
  Lightbulb, 
  ArrowLeft 
} from 'lucide-react';

const categories = [
  { id: 'student', title: 'Student', icon: <GraduationCap />, color: 'from-blue-500 to-cyan-400', desc: 'Scholarships, Laptops, and Education loans.' },
  { id: 'farmer', title: 'Farmer', icon: <Tractor />, color: 'from-emerald-500 to-teal-400', desc: 'Agricultural subsidies and crop insurance.' },
  { id: 'women', title: 'Women', icon: <WomanIcon />, color: 'from-pink-500 to-rose-400', desc: 'Urimai Thogai and marriage assistance.' },
  { id: 'senior', title: 'Senior Citizen', icon: <HeartPulse />, color: 'from-orange-500 to-amber-400', desc: 'Old age pension and health benefits.' },
  { id: 'youth', title: 'Unemployed Youth', icon: <Briefcase />, color: 'from-indigo-500 to-purple-400', desc: 'Skill training and monthly stipends.' },
  { id: 'disabled', title: 'Differently Abled', icon: <Users />, color: 'from-violet-500 to-purple-400', desc: 'Special equipment and monthly welfare.' },
  { id: 'worker', title: 'Daily Wage Worker', icon: <Construction />, color: 'from-yellow-500 to-orange-400', desc: 'Unorganized sector labor welfare funds.' },
  { id: 'entrepreneur', title: 'Entrepreneur', icon: <Lightbulb />, color: 'from-red-500 to-orange-400', desc: 'Business MSME loans and startup grants.' },
];

const CategorySelection = ({ onSelect, onBack }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col items-center text-center mb-16">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight text-center">
          Choose Your <span className="text-indigo-400">Category</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Select the category that best describes you to find tailored government schemes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(cat.id)}
            className="relative group cursor-pointer"
          >
            <div className="p-8 h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col items-start transition-all group-hover:border-white/20 group-hover:bg-white/[0.06]">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/20`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{cat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{cat.desc}</p>
              
              <div className="mt-8 flex items-center text-xs font-bold text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Select Category →
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default CategorySelection;
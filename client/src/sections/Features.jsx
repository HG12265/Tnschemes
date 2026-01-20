import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Search, Bell } from 'lucide-react';

const features = [
  { title: 'Instant Check', desc: 'Get results in milliseconds based on your profile.', icon: <Zap />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { title: 'Secure Data', desc: 'Your personal information is encrypted and safe.', icon: <ShieldCheck />, color: 'text-green-500', bg: 'bg-green-50' },
  { title: 'Latest Schemes', desc: 'Always updated with latest TN Govt announcements.', icon: <Search />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { title: 'Smart Alerts', desc: 'Coming soon: Get notified when you qualify for new schemes.', icon: <Bell />, color: 'text-purple-500', bg: 'bg-purple-50' },
];

const Features = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900">Why choose TN<span className="text-indigo-600">Schemes</span>?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="p-8 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl transition-all"
          >
            <div className={`w-12 h-12 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/10`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
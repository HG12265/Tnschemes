import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, User, Calendar, MapPin, Landmark, GraduationCap, Briefcase } from 'lucide-react';

const DetailsForm = ({ categoryId, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({});

  // Dynamic Fields based on Category
  const getFields = () => {
    const commonFields = [
      { id: 'age', label: 'Age', type: 'number', icon: <Calendar />, placeholder: 'e.g. 21' },
      { id: 'income', label: 'Annual Family Income (₹)', type: 'number', icon: <Landmark />, placeholder: 'e.g. 150000' },
      { id: 'caste', label: 'Community', type: 'select', icon: <User />, options: ['OC', 'BC', 'MBC/DNC', 'SC', 'ST'] },
    ];

    const specificFields = {
      student: [
        { id: 'edu_level', label: 'Current Education', type: 'select', options: ['School', 'Diploma', 'UG', 'PG'] },
        { id: 'inst_type', label: 'Institution Type', type: 'select', options: ['Government', 'Aided', 'Private'] },
        { id: 'marks', label: 'Previous Year Marks (%)', type: 'number', placeholder: 'e.g. 85' }
      ],
      farmer: [
        { id: 'land_size', label: 'Land Size (Acres)', type: 'number', placeholder: 'e.g. 2.5' },
        { id: 'crop_type', label: 'Primary Crop', type: 'text', placeholder: 'e.g. Paddy' }
      ],
      women: [
        { id: 'marital_status', label: 'Marital Status', type: 'select', options: ['Unmarried', 'Married', 'Widow', 'Deserted'] },
        { id: 'is_head', label: 'Head of Family in Ration Card?', type: 'select', options: ['Yes', 'No'] }
      ]
    };

    return [...commonFields, ...(specificFields[categoryId] || [])];
  };

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pt-32 pb-20 px-6 max-w-3xl mx-auto"
    >
      <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition">
            <ArrowLeft size={24} />
          </button>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-white capitalize">{categoryId} Details</h2>
            <p className="text-gray-400 text-sm">Fill in the accurate info</p>
          </div>
        </div>

        {/* Dynamic Form */}
        <div className="space-y-6">
          {getFields().map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                {field.icon} {field.label}
              </label>
              
              {field.type === 'select' ? (
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                  onChange={(e) => handleChange(field.id, e.target.value)}
                >
                  <option value="">Select Option</option>
                  {field.options.map(opt => <option key={opt} value={opt} className="bg-slate-900">{opt}</option>)}
                </select>
              ) : (
                <input 
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSubmit(formData)}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 mt-10"
          >
            Find Eligible Schemes <Send size={20} />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default DetailsForm;
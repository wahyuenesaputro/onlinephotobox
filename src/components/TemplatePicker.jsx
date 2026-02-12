import React from 'react';

export const templates = [
  { id: 'vertical', name: '4-Cut Vertical', type: 'flex-col' },
  { id: 'grid', name: '2x2 Grid', type: 'grid-cols-2' },
  { id: 'retro', name: 'Retro Purple', type: 'flex-col' },
];

const TemplatePicker = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="w-full">
      <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest ml-1">2. Choose Layout</h3>
      <div className="flex gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`
              group relative p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2
              ${selectedTemplate.id === template.id 
                ? 'border-pink-500 bg-pink-50/50 shadow-md scale-105' 
                : 'border-gray-200 bg-white hover:border-pink-200'}
            `}
          >
            {/* Mini Preview Visual */}
            <div className={`w-12 h-16 bg-gray-100 rounded overflow-hidden p-1 gap-0.5 ${template.id === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'}`}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`bg-gray-300 rounded-[1px] w-full h-full ${selectedTemplate.id === template.id ? 'bg-pink-300' : ''}`} />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-gray-500">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplatePicker;
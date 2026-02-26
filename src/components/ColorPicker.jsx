import React from 'react';
import { Check } from 'lucide-react';

export const backgroundColors = [
{ name: 'White', value: '#ffffff' },
  { name: 'Soft Pink', value: '#fdf2f8' }, // pink-50
  { name: 'Soft Blue', value: '#eff6ff' }, // blue-50
  { name: 'Soft Green', value: '#f0fdf4' }, // green-50
  { name: 'Soft Yellow', value: '#fefce8' }, // yellow-50
  { name: 'Soft Purple', value: '#faf5ff' }, // purple-50
  { name: 'Elegant Gray', value: '#f3f4f6' }, // gray-100
  { name: 'Midnight', value: '#1f2937' }, // gray-800
];

const ColorPicker = ({ selectedColor, onSelectColor }) => {
return (
    <div className="w-full">
    <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest ml-1">3. Background Color</h3>
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {backgroundColors.map((color) => (
        <button
            key={color.name}
            onClick={() => onSelectColor(color.value)}
            className={`
            relative w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center flex-shrink-0
            ${selectedColor === color.value
                ? 'border-pink-500 scale-110 shadow-md ring-2 ring-pink-200'
                : 'border-gray-200 hover:border-pink-300'}
            `}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Select ${color.name} background`}
        >
            {selectedColor === color.value && (
            <Check size={14} className={color.value === '#1f2937' ? 'text-white' : 'text-gray-600'} />
            )}
        </button>
        ))}
    </div>
    </div>
);
};

export default ColorPicker;
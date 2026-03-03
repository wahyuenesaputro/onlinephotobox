import React from 'react';

export const filters = [
  { name: 'Normal', style: 'none' },
  { name: 'Soft', style: 'brightness(1.1) contrast(0.95) saturate(0.9)' },
  { name: 'Warm', style: 'sepia(0.2) contrast(1.05) brightness(1.05)' },
  { name: 'Cool', style: 'saturate(0.8) contrast(1.1) hue-rotate(10deg)' },
  { name: 'B&W', style: 'grayscale(1) contrast(1.1)' },
  { name: 'Vintage', style: 'sepia(0.6) contrast(1.2) brightness(0.9)' },
  { name: 'Blue', style: 'sepia(0.3) hue-rotate(190deg) contrast(1.1) brightness(1.1)' },
  { name: 'Seoul', style: 'brightness(1.15) contrast(0.9) saturate(1.1)' },
];

const FilterBar = ({ selectedFilter, onSelectFilter }) => {
  return (
    <div className="w-full">
      <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest ml-1">1. Choose Filter</h3>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x mask-linear-fade">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => onSelectFilter(filter)}
            className={`
              flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 snap-center border
              ${selectedFilter.name === filter.name 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30 scale-105' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
            `}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;

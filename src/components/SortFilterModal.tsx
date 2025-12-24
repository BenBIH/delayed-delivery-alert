import React from 'react';
import { X, ArrowDown, ArrowUp, Check } from 'lucide-react';

type SortOption = {
  id: string;
  label: string;
  direction: 'asc' | 'desc';
};

type SortGroup = {
  name: string;
  options: SortOption[];
};

interface SortFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: string;
  onSortChange: (sortId: string) => void;
}

const sortGroups: SortGroup[] = [
  {
    name: 'Cijena',
    options: [
      { id: 'price_asc', label: 'Najniža', direction: 'asc' },
      { id: 'price_desc', label: 'Najviša', direction: 'desc' },
    ],
  },
  {
    name: 'Datum objave',
    options: [
      { id: 'date_asc', label: 'Najstariji', direction: 'asc' },
      { id: 'date_desc', label: 'Najnoviji', direction: 'desc' },
    ],
  },
  {
    name: 'Kilometraža',
    options: [
      { id: 'mileage_asc', label: 'Manja', direction: 'asc' },
      { id: 'mileage_desc', label: 'Veća', direction: 'desc' },
    ],
  },
  {
    name: 'Godište',
    options: [
      { id: 'year_asc', label: 'Starije', direction: 'asc' },
      { id: 'year_desc', label: 'Novije', direction: 'desc' },
    ],
  },
];

const SortFilterModal: React.FC<SortFilterModalProps> = ({
  isOpen,
  onClose,
  selectedSort,
  onSortChange,
}) => {
  if (!isOpen) return null;

  const handleOptionClick = (optionId: string) => {
    onSortChange(optionId);
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden min-w-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ArrowDown className="w-4 h-4 text-[#002f34]" />
          <span className="text-sm font-semibold text-[#002f34]">Sortiraj</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Zatvori"
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Sort Groups */}
      <div className="py-2">
        {sortGroups.map((group, groupIndex) => (
          <div key={group.name}>
            {/* Group Label */}
            <div className="px-4 py-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {group.name}
              </span>
            </div>

            {/* Options */}
            {group.options.map((option) => {
              const isSelected = selectedSort === option.id;
              const ArrowIcon = option.direction === 'asc' ? ArrowDown : ArrowUp;

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                    isSelected
                      ? 'bg-[#002f34]/5'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ArrowIcon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-[#002f34]' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isSelected
                          ? 'font-medium text-[#002f34]'
                          : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#002f34]" />
                  )}
                </button>
              );
            })}

            {/* Separator between groups */}
            {groupIndex < sortGroups.length - 1 && (
              <div className="mx-4 my-2 border-b border-gray-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortFilterModal;

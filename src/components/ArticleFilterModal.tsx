import React, { useState } from 'react';
import { X } from 'lucide-react';

type ToggleOption = {
  id: string;
  label: string;
};

type ToggleGroup = {
  name: string;
  options: ToggleOption[];
  multiSelect?: boolean;
};

type CheckboxFilter = {
  id: string;
  label: string;
};

interface ArticleFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: FilterState) => void;
}

interface FilterState {
  condition: string[];
  datePosted: string;
  checkboxFilters: string[];
}

const toggleGroups: ToggleGroup[] = [
  {
    name: 'Stanje oglasa',
    options: [
      { id: 'novo', label: 'Novo' },
      { id: 'koristeno', label: 'Korišteno' },
    ],
    multiSelect: true,
  },
  {
    name: 'Datum objave',
    options: [
      { id: 'sve', label: 'Sve' },
      { id: '24h', label: 'Zadnja 24h' },
      { id: '7dana', label: 'Zadnjih 7 dana' },
      { id: 'mjesec', label: 'Zadnji mjesec' },
    ],
    multiSelect: false,
  },
];

const checkboxFilters: CheckboxFilter[] = [
  { id: 'available', label: 'Oglas je dostupan odmah' },
  { id: 'withPrice', label: 'Sa unesenom cijenom' },
  { id: 'olxShop', label: 'Samo iz OLX shop-a' },
  { id: 'akcije', label: 'Akcijske Ponude' },
  { id: 'izdvojeni', label: 'Samo izdvojeni' },
  { id: 'brzaDostava', label: 'OLX brza dostava' },
];

const ArticleFilterModal: React.FC<ArticleFilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('sve');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggleClick = (groupIndex: number, optionId: string) => {
    if (groupIndex === 0) {
      // Stanje oglasa - multi-select
      setSelectedConditions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      // Datum objave - single select
      setSelectedDate(optionId);
    }
  };

  const handleCheckboxChange = (filterId: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const isToggleSelected = (groupIndex: number, optionId: string) => {
    if (groupIndex === 0) {
      return selectedConditions.includes(optionId);
    }
    return selectedDate === optionId;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden min-w-[320px] max-w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-semibold text-[#002f34]">Filteri oglasa</span>
        <button
          onClick={onClose}
          aria-label="Zatvori"
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-5">
        {/* Toggle Groups */}
        {toggleGroups.map((group, groupIndex) => (
          <div key={group.name}>
            <label className="block text-sm font-medium text-[#002f34] mb-2">
              {group.name}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {group.options.map((option) => {
                const isSelected = isToggleSelected(groupIndex, option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleToggleClick(groupIndex, option.id)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-[#002f34]/10 border-[#002f34]/20 text-[#002f34]'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Checkbox Filters */}
        <div className="space-y-3">
          {checkboxFilters.map((filter) => (
            <label
              key={filter.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(filter.id)}
                  onChange={() => handleCheckboxChange(filter.id)}
                  className="peer sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                    selectedCheckboxes.includes(filter.id)
                      ? 'bg-[#002f34] border-[#002f34]'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}
                >
                  {selectedCheckboxes.includes(filter.id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">{filter.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 flex gap-3">
        <button
          onClick={() => {
            setSelectedConditions([]);
            setSelectedDate('sve');
            setSelectedCheckboxes([]);
          }}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Resetuj
        </button>
        <button
          onClick={() => {
            onApply?.({
              condition: selectedConditions,
              datePosted: selectedDate,
              checkboxFilters: selectedCheckboxes,
            });
            onClose();
          }}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#002f34] rounded-lg hover:bg-[#002f34]/90 transition-colors"
        >
          Primijeni
        </button>
      </div>
    </div>
  );
};

export default ArticleFilterModal;

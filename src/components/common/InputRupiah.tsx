import React from 'react';

interface InputRupiahProps {
  value: number | '';
  onChange: (val: number | '') => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export const InputRupiah: React.FC<InputRupiahProps> = ({
  value,
  onChange,
  placeholder = '0',
  className = '',
  required = false,
}) => {
  // Format angka ke string berpemisah titik (misal: 199000 -> "199.000")
  const formatDisplay = (num: number | ''): string => {
    if (num === '' || isNaN(num as number)) return '';
    return (num as number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/[^0-9]/g, '');

    if (!digitsOnly) {
      onChange('');
      return;
    }

    // Hilangkan awalan nol yang tidak diinginkan (misal: "0199" -> 199)
    const parsed = parseInt(digitsOnly, 10);
    onChange(isNaN(parsed) ? '' : parsed);
  };

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3.5 text-sm font-semibold text-[#6b7280] pointer-events-none select-none">
        Rp
      </span>
      <input
        type="text"
        inputMode="numeric"
        required={required}
        value={formatDisplay(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-[#e7e1d5] pl-10 pr-4 py-2.5 text-base text-[#1b2433] focus:border-[#c9a35a] focus:outline-none bg-white font-medium ${className}`}
      />
    </div>
  );
};

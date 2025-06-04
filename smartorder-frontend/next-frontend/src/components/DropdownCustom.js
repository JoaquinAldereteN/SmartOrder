'use client';
import { useState, useRef, useEffect } from 'react';

export default function DropdownCustom({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Cerrar dropdown si clickean afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Obtener label de la opción seleccionada
  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left border px-3 py-2 rounded  hover:bg-gray-700 focus:outline-none flex justify-between items-center"
      >
        <span className={value ? 'text-white' : 'text-gray-200'}>
          {selectedLabel}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-gray-700 border border-gray-700 shadow-lg">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer px-3 py-2 hover:bg-gray-700 ${
                value === opt.value ? 'font-semibold bg-gray-700' : ''
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

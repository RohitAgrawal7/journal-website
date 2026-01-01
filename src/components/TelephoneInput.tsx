'use client';


import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  type ForwardedRef,
} from 'react';


// -------------------------------------------------
// Types
// -------------------------------------------------
interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}
export interface TelephoneInputProps {
  /** Current value (full international number, e.g. "+919876543210") */
  value?: string;
  /** Called with the full number and the selected country */
  onChange?: (value: string, country: Country) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Optional error message */
  error?: string;
  /** Extra class name for the outer wrapper */
  className?: string;
  id?: string;
  name?: string;
}
// -------------------------------------------------
// Country data (you can extend this list)
// -------------------------------------------------
const COUNTRIES: Country[] = [
    { code: 'US', name: 'United States', dialCode: '+1', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: 'https://flagcdn.com/w40/ca.png' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: 'https://flagcdn.com/w40/au.png' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: 'https://flagcdn.com/w40/de.png' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: 'https://flagcdn.com/w40/jp.png' },
    { code: 'IN', name: 'India', dialCode: '+91', flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'BR', name: 'Brazil', dialCode: '+55', flag: 'https://flagcdn.com/w40/br.png' },
    { code: 'CN', name: 'China', dialCode: '+86', flag: 'https://flagcdn.com/w40/cn.png' },

    // Additional countries
    { code: 'ES', name: 'Spain', dialCode: '+34', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'IT', name: 'Italy', dialCode: '+39', flag: 'https://flagcdn.com/w40/it.png' },
    { code: 'RU', name: 'Russia', dialCode: '+7', flag: 'https://flagcdn.com/w40/ru.png' },
    { code: 'MX', name: 'Mexico', dialCode: '+52', flag: 'https://flagcdn.com/w40/mx.png' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: 'https://flagcdn.com/w40/nl.png' },
    { code: 'SE', name: 'Sweden', dialCode: '+46', flag: 'https://flagcdn.com/w40/se.png' },
    { code: 'NO', name: 'Norway', dialCode: '+47', flag: 'https://flagcdn.com/w40/no.png' },
    { code: 'DK', name: 'Denmark', dialCode: '+45', flag: 'https://flagcdn.com/w40/dk.png' },
    { code: 'BE', name: 'Belgium', dialCode: '+32', flag: 'https://flagcdn.com/w40/be.png' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: 'https://flagcdn.com/w40/ch.png' },
    { code: 'AT', name: 'Austria', dialCode: '+43', flag: 'https://flagcdn.com/w40/at.png' },
    { code: 'IE', name: 'Ireland', dialCode: '+353', flag: 'https://flagcdn.com/w40/ie.png' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: 'https://flagcdn.com/w40/za.png' },
    { code: 'KR', name: 'South Korea', dialCode: '+82', flag: 'https://flagcdn.com/w40/kr.png' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: 'https://flagcdn.com/w40/sg.png' },
    { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: 'https://flagcdn.com/w40/nz.png' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: 'https://flagcdn.com/w40/ae.png' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: 'https://flagcdn.com/w40/sa.png' },
    { code: 'TR', name: 'Turkey', dialCode: '+90', flag: 'https://flagcdn.com/w40/tr.png' },
    { code: 'PL', name: 'Poland', dialCode: '+48', flag: 'https://flagcdn.com/w40/pl.png' },
    { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: 'https://flagcdn.com/w40/cz.png' },
    { code: 'HU', name: 'Hungary', dialCode: '+36', flag: 'https://flagcdn.com/w40/hu.png' },
    { code: 'PT', name: 'Portugal', dialCode: '+351', flag: 'https://flagcdn.com/w40/pt.png' },
    { code: 'GR', name: 'Greece', dialCode: '+30', flag: 'https://flagcdn.com/w40/gr.png' },
    { code: 'IL', name: 'Israel', dialCode: '+972', flag: 'https://flagcdn.com/w40/il.png' },
    { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: 'https://flagcdn.com/w40/id.png' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: 'https://flagcdn.com/w40/my.png' },
    { code: 'PH', name: 'Philippines', dialCode: '+63', flag: 'https://flagcdn.com/w40/ph.png' },
    { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: 'https://flagcdn.com/w40/vn.png' },
    { code: 'AR', name: 'Argentina', dialCode: '+54', flag: 'https://flagcdn.com/w40/ar.png' },
    { code: 'CO', name: 'Colombia', dialCode: '+57', flag: 'https://flagcdn.com/w40/co.png' },
    { code: 'PE', name: 'Peru', dialCode: '+51', flag: 'https://flagcdn.com/w40/pe.png' },
    { code: 'CL', name: 'Chile', dialCode: '+56', flag: 'https://flagcdn.com/w40/cl.png' },
    { code: 'EG', name: 'Egypt', dialCode: '+20', flag: 'https://flagcdn.com/w40/eg.png' },
    { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: 'https://flagcdn.com/w40/ng.png' },
    { code: 'KE', name: 'Kenya', dialCode: '+254', flag: 'https://flagcdn.com/w40/ke.png' },
    { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: 'https://flagcdn.com/w40/ua.png' },
    { code: 'RO', name: 'Romania', dialCode: '+40', flag: 'https://flagcdn.com/w40/ro.png' },
    { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: 'https://flagcdn.com/w40/bg.png' },
    { code: 'HR', name: 'Croatia', dialCode: '+385', flag: 'https://flagcdn.com/w40/hr.png' },
    { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: 'https://flagcdn.com/w40/si.png' },
    { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: 'https://flagcdn.com/w40/sk.png' },
];


const WarningIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
  </svg>
);


const DropdownIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z" />
  </svg>
);


const TelephoneInput = forwardRef<HTMLInputElement, TelephoneInputProps>(
  (
    {
      value = '',
      onChange,
      placeholder = 'Enter phone number',
      required = false,
      disabled = false,
      error,
      className = '',
      id = 'telephone-input',
      name = 'telephone',
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Country>(COUNTRIES[7]); // default India
    const [localNumber, setLocalNumber] = useState('');
    const [touched, setTouched] = useState(false);


    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    // Close dropdown on outside click
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);


    // Sync external value
    useEffect(() => {
      if (!value) {
        setLocalNumber('');
        return;
      }
      const matched = COUNTRIES.find((c) => value.startsWith(c.dialCode));
      if (matched) {
        setSelected(matched);
        setLocalNumber(value.slice(matched.dialCode.length).trim());
      } else {
        setLocalNumber(value);
      }
    }, [value]);


    const selectCountry = useCallback(
      (country: Country) => {
        setSelected(country);
        setIsOpen(false);
        inputRef.current?.focus();
        const full = `${country.dialCode}${localNumber}`.replace(/\s+/g, '');
        onChange?.(full, country);
      },
      [localNumber, onChange]
    );


    const handleNumberChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^\d]/g, '');
        setLocalNumber(val);
        setTouched(true);
        const full = `${selected.dialCode}${val}`.replace(/\s+/g, '');
        onChange?.(full, selected);
      },
      [selected, onChange]
    );


    const showError = !!error && touched;
    const inputId = id;
    const errorId = `${inputId}-error`;


    return (
      <div className={className}>
        {/* Input Row: Flag + Number */}
        <div className="flex rounded-lg ">
          {/* Country Button */}
          <div ref={dropdownRef} className="relative border border-white">
            <button
              type="button"
              disabled={disabled}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              aria-label="Select country"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className={`
                flex items-center justify-between gap-2 px-3 py-2
                border rounded-l-lg font-montserrat text-sm
                bg-white transition-colors
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
                ${showError ? 'border-red-600' : 'border-teal-300 hover:border-teal-800'}
              `}
            >
              <img
                src={selected.flag}
                alt=""
                className="w-5 h-5 object-cover rounded-sm"
              />
              <DropdownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>


            {/* Dropdown */}
            {isOpen && (
              <div
                className="absolute top-full left-0 z-5 mt-1 w-64 max-h-60 overflow-y-auto rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                role="listbox"
              >
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => selectCountry(c)}
                    className={`
                      flex w-full items-center gap-3 px-3 py-2 text-left text-sm font-montserrat
                      hover:bg-teal-50 hover:text-teal-900 transition-colors
                      ${selected.code === c.code ? 'bg-teal-50 text-teal-900' : ''}
                    `}
                  >
                    <img src={c.flag} alt="" className="w-5 h-5 object-cover rounded-sm " />
                    <span className="flex-1">{c.name}</span>
                    <span className="text-gray-500">{c.dialCode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>


          {/* Phone Input */}
          <div className="relative flex-1">
            <input
              ref={mergeRefs(inputRef, ref)}
              type="text"
              inputMode="tel"
              value={localNumber}
              onChange={handleNumberChange}
              onFocus={() => setTouched(true)}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              name={name}
              id={inputId}
              aria-invalid={showError}
              aria-describedby={showError ? errorId : undefined}
              className={`
                block w-full px-4 py-2 border rounded-r-lg
                bg-white placeholder-gray-400 font-montserrat text-base
                focus:outline-none focus:ring-2 transition-colors
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${showError
                  ? 'border-red-600 focus:ring-red-600/30'
                  : 'border-teal-300 focus:ring-green-500 hover:border-teal-800'
                }
              `}
            />
            {showError && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <WarningIcon className="w-5 h-5 text-red-600" />
              </div>
            )}
          </div>
        </div>


        {/* Error Message */}
        {showError && (
          <p id={errorId} className="mt-1 text-sm text-red-600 font-montserrat">
            {error}
          </p>
        )}


        {/* Helper Text */}
        <p className="mt-1 text-xs text-gray-500 font-montserrat">
          {selected.dialCode} {selected.name}
        </p>
      </div>
    );
  }
);


TelephoneInput.displayName = 'TelephoneInput';


function mergeRefs<T>(...refs: (React.Ref<T> | null)[]) {
  return (node: T | null) => {
    refs.forEach((r) => {
      if (typeof r === 'function') r(node);
      else if (r) (r as React.MutableRefObject<T | null>).current = node;
    });
  };
}


export default TelephoneInput;  
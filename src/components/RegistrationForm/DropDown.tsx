import { useState, useRef, useEffect } from "react";
import { CheckIcon } from "./FormField";

interface DropdownProps {
  options?: string[];
  defaultValue?: string | null;
  placeholder?: string;
  onChange?: (option: string) => void;
  value?: string;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  inFocus?: boolean
}

export default function Dropdown(props: DropdownProps) {
  const {
    options = [],
    placeholder = "",
    onChange = () => {},
    value = '',
    className = "",
    onFocus,
    onBlur,
    inFocus
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(isOpen) {
        onFocus?.();
    } else {
        if(inFocus) {
            onBlur?.();
        }
    }
  },[isOpen, inFocus])

  return (
    <div ref={dropdownRef} className={`relative inline-block w-full ${className}`}>
      {/* Trigger button */}
      <button
        type="button"
        className="flex justify-between items-center w-full text-left cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <div
          className={`px-2 transition-transform
            ${isOpen ? "transform rotate-180" : ""}`}
        >
          ▼
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-11 left-[0] mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200">
          <ul
            className="py-1 overflow-auto text-base rounded-md max-h-60 focus:outline-none"
          >
            {options.map((option) => (
              <li
                key={option}
                className={`flex justify-between items-center cursor-pointer select-none relative py-2 px-3 hover:bg-gray-100 ${
                  value === option
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-900"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
                {value === option && <CheckIcon />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

'use client';

import { ChangeEvent, useState } from 'react';

interface InputFieldProps {
  id?: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="relative w-full mb-4">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-dark bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer peer-placeholder-shown:border-primary"
        aria-label={label}
      />
      <label
        htmlFor={inputId}
        className="absolute text-sm text-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-4 peer-placeholder-shown:top-2"
      >
        {label}
      </label>
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500"
          aria-label="Toggle password visibility"
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      )}
    </div>
  );
};

export default InputField;

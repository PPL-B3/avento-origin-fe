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

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id ?? label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="relative w-full mb-4">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-dark bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-500 peer peer-placeholder-shown:border-primary-500"
        aria-label={label}
      />
      <label
        htmlFor={inputId}
        className="absolute text-sm text-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-500 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-4 peer-placeholder-shown:top-2"
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
          {showPassword ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                fill="#2C4B5C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.32341 11.4467C2.81066 6.97571 7.02791 3.75 12.0005 3.75C16.9708 3.75 21.1864 6.97271 22.6755 11.4405C22.7959 11.8015 22.796 12.1922 22.6759 12.5533C21.1886 17.0243 16.9714 20.25 11.9988 20.25C7.02847 20.25 2.81284 17.0273 1.32374 12.5595C1.2034 12.1985 1.20328 11.8078 1.32341 11.4467ZM17.25 12C17.25 14.8995 14.8995 17.25 12 17.25C9.1005 17.25 6.75 14.8995 6.75 12C6.75 9.1005 9.1005 6.75 12 6.75C14.8995 6.75 17.25 9.1005 17.25 12Z"
                fill="#2C4B5C"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3.53033 2.46967C3.23744 2.17678 2.76256 2.17678 2.46967 2.46967C2.17678 2.76256 2.17678 3.23744 2.46967 3.53033L20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7626 21.5303 20.4697L3.53033 2.46967Z"
                fill="#2C4B5C"
              />
              <path
                d="M22.6759 12.5533C22.1319 14.1887 21.2226 15.6575 20.0447 16.8627L16.9462 13.7642C17.1429 13.2129 17.25 12.6189 17.25 12C17.25 9.1005 14.8995 6.75 12 6.75C11.3811 6.75 10.7871 6.8571 10.2358 7.05379L7.75898 4.577C9.06783 4.04381 10.4998 3.75 12.0005 3.75C16.9708 3.75 21.1864 6.97271 22.6755 11.4405C22.7959 11.8015 22.796 12.1922 22.6759 12.5533Z"
                fill="#2C4B5C"
              />
              <path
                d="M15.75 12C15.75 12.1802 15.7373 12.3574 15.7127 12.5308L11.4692 8.28727C11.6426 8.2627 11.8198 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12Z"
                fill="#2C4B5C"
              />
              <path
                d="M12.5308 15.7127L8.28727 11.4692C8.2627 11.6426 8.25 11.8198 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C12.1802 15.75 12.3574 15.7373 12.5308 15.7127Z"
                fill="#2C4B5C"
              />
              <path
                d="M6.75 12C6.75 11.3811 6.8571 10.7871 7.05379 10.2358L3.95492 7.1369C2.77687 8.34222 1.86747 9.81114 1.32341 11.4467C1.20328 11.8078 1.2034 12.1985 1.32374 12.5595C2.81284 17.0273 7.02847 20.25 11.9988 20.25C13.4997 20.25 14.9318 19.9561 16.2408 19.4228L13.7642 16.9462C13.2129 17.1429 12.6189 17.25 12 17.25C9.1005 17.25 6.75 14.8995 6.75 12Z"
                fill="#2C4B5C"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

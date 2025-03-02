'use client';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#FF5D00] text-neutral-50 font-bold w-full rounded-2xl h-12 mt-4"
  >
    {text}
  </button>
);

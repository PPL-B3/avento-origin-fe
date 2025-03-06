'use client';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="btn-primary w-full rounded-2xl h-12 mt-4"
  >
    {text}
  </button>
);

export default Button;

'use client';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = () => (
  <button className="btn-primary w-full rounded-2xl h-12 mt-4"></button>
);

export default Button;

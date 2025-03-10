'use client';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn-primary w-full rounded-2xl h-12 mt-4"
      type="submit"
    >
      {text}
    </button>
  );
};

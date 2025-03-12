'use client';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn-primary w-full rounded-2xl h-12 mt-4 ${disabled && 'opacity-50 pointer-events-none'}`}
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

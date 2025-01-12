import React from 'react';

interface ButtonProps {
  icon: React.ReactNode; // Icon component
  label: string;
  onClick?: () => void;
  primary?: boolean; // If true, use the primary button styling
}

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  onClick,
  primary = false,
}) => {
  const buttonStyles = primary
    ? 'bg-[#030A70] text-white'
    : 'border-2 border-[#030A70] text-[#030A70]';

  return (
    <button
      className={`flex items-center justify-center rounded-md py-3 ${buttonStyles}`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
};

export default Button;

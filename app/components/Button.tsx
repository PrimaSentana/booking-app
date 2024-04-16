'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean; // '?' untuk opsional props
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({label, onClick, disabled, outline, small, icon:Icon}) => {
  return (
    <button className={`
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-90
      transition
      w-full
      ${outline ? 'bg-white' : 'bg-slate-900'}
      ${outline ? 'border-black' : 'border-white'}
      ${outline ? 'text-slate-900' : 'text-white'}
      ${small ? 'text-sm' : 'text-md'}
      ${small ? 'font-light' : 'font-semibold'}
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'border-[1px]' : 'border-2'}
    `}
    
    onClick={onClick}
    disabled={disabled}

    >

      {Icon && (
        <Icon
          size={24}
          className="absolute left-4 top-3"
        />
      )}
      {label}
    </button>
  )
}

export default Button;
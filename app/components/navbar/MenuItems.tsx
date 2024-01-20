'use client';

interface MenuItemProps {
   onClick: () => void;
   label: string;
}

const MenuItems: React.FC<MenuItemProps> = ({onClick, label}) => {
  return (
    <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={onClick}>
      {label}
    </div>
  )
}

export default MenuItems;
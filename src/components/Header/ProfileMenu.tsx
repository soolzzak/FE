import { useEffect, useRef, useState } from 'react';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        role="none"
        onClick={handleDropdownToggle}
        className="cursor-pointer w-12 h-12 rounded-full bg-primary-100 mr-3 ml-5"
      />
      {isOpen && (
        <div className="absolute w-[261px] top-full right-0 z-10 mt-2 p-4 bg-white rounded-lg shadow-lg">
          Hi
        </div>
      )}
    </div>
  );
};

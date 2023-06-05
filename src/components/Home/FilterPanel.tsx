import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { categoryAtom } from '../../store/addRoomStore';
import { tabList } from './CategoryTab';
import { ArrowDown } from '../../assets/svgs/ArrowDown';

export const FilterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = () => {
    setIsOpen(false);
  };

  useEffect(() => {}, []);

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
    <section className="f-col">
      <div className="relative" ref={dropdownRef}>
        <div
          role="none"
          onClick={handleDropdownToggle}
          className="cursor-pointer f-ic gap-2 rounded-full bg-white px-4 py-1 text-secondary-200 font-semibold
              hover:bg-[#f0f0f0] transition-colors duration-300 ease-in-out"
        >
          방 설정
          <ArrowDown />
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div>content</div>
          </div>
        )}
      </div>
    </section>
  );
};

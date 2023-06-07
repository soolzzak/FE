import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '../../assets/svgs/ArrowDown';
import { HorizontalSelector } from './HorizontalSelector';

export const FilterPanel = () => {
  const [genderOption, setGenderOption] = useState('ANY');
  const [allOrEmpty, setAllOrEmpty] = useState('ALL');

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
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -100, x: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0, y: -100, x: 100 }}
            transition={{ duration: 0.2 }}
            className="absolute w-[261px] top-full right-0 z-10 mt-2 p-4 pt-0 bg-white rounded-lg shadow-lg"
          >
            <HorizontalSelector
              title="성별"
              selections={['ANY', 'FEMALE', 'MALE']}
              displayedSelections={['누구나', '여자만', '남자만']}
              selectedOption={genderOption}
              handleOptionClick={setGenderOption}
            />
            <HorizontalSelector
              title="방 정렬"
              selections={['ALL', 'EMPTY']}
              displayedSelections={['전체', '빈방']}
              selectedOption={allOrEmpty}
              handleOptionClick={setAllOrEmpty}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { ArrowDown } from '../../assets/svgs/ArrowDown';

import { HorizontalSelector } from './HorizontalSelector';
import {
  genderFilterAtom,
  isEmptyFilterAtom,
} from '../../store/filterPanelStore';

export const FilterPanel = () => {
  const [genderOption, setGenderOption] = useAtom(genderFilterAtom);
  const [allOrEmpty, setAllOrEmpty] = useAtom(isEmptyFilterAtom);

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
          className="cursor-pointer f-ic gap-2 rounded-full bg-white px-5 py-2 text-primary-200 text-lg font-semibold
              hover:bg-[#fdfdfd] transition-colors duration-200 ease-in-out"
        >
          방 설정
          <ArrowDown />
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -100, x: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0, y: -100, x: 100 }}
            transition={{ duration: 0.1 }}
            className="absolute w-[381px] top-full right-0 z-10 mt-2 p-4 pt-3 pb-6 bg-white rounded-xl shadow"
          >
            <HorizontalSelector
              title="성별"
              selections={['ALL', 'ANY', 'FEMALE', 'MALE']}
              displayedSelections={['전체', '누구나', '여자만', '남자만']}
              selectedOption={genderOption}
              handleOptionClick={
                setGenderOption as Dispatch<SetStateAction<string | boolean>>
              }
            />
            <HorizontalSelector
              title="방 정렬"
              selections={[false, true]}
              displayedSelections={['전체', '빈방']}
              selectedOption={allOrEmpty}
              handleOptionClick={
                setAllOrEmpty as Dispatch<SetStateAction<string | boolean>>
              }
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

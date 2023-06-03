import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { categoryAtom } from '../../store/addRoomStore';
import { tabList } from '../Home/CategoryTab';

export const DropdownSelector = () => {
  const selections = [
    'ALL',
    'MOVIE_DRAMA',
    'FOOD_TRAVEL',
    'SPORTS_GAME',
    'ABOUT_TODAY',
    'COUNSELING',
    'GENERAL',
  ];

  const [selectedOption, handleOptionClick] = useAtom(categoryAtom);
  const [currentSelectionView, setCurrentSelectionView] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string, displayedOption: string) => {
    handleOptionClick(option);
    setCurrentSelectionView(displayedOption);
    setIsOpen(false);
  };

  useEffect(() => {
    handleOptionClick(selections[0]);
    setCurrentSelectionView(tabList[0]);
  }, []);

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
      <p className="text-base font-bold mb-2 text-[#454545]">카테고리</p>
      <div className="relative" ref={dropdownRef}>
        <div
          role="none"
          className={`border-2 px-7 py-2 border-[#929292] rounded-lg cursor-pointer ${
            isOpen ? 'bg-primary-50 text-primary-200 border-primary-200' : ''
          }`}
          onClick={handleDropdownToggle}
        >
          {currentSelectionView}
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            {selections.map((option, index) => (
              <div
                role="none"
                key={option}
                className={`px-7 py-2 cursor-pointer hover:bg-primary-50 hover:text-primary-200 
                ${selectedOption === option ? 'text-primary-200' : ''}
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === 6 ? 'rounded-b-lg' : ''}
                `}
                onClick={() => handleOptionSelect(option, tabList[index])}
              >
                {tabList[index]}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

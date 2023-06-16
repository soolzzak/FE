import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { categoryAtom } from '../../store/addRoomStore';
import {
  selections,
  tabList,
  categorySelection,
} from '../../utils/switchSelections';

export const DropdownSelector = ({ category }: { category?: string }) => {
  const dropdownSelection = selections.slice(1);
  const dropdownDisplayedSelection = tabList.slice(1);
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

  // console.log(selectedOption);
  useEffect(() => {
    handleOptionClick(category || dropdownSelection[0]);
    setCurrentSelectionView(
      categorySelection(category as string) || dropdownDisplayedSelection[0]
    );
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
          className={`f-ic border-2 px-3 h-9 border-[#929292] rounded-lg cursor-pointer ${
            isOpen ? 'bg-primary-50 text-primary-200 border-primary-200' : ''
          }`}
          onClick={handleDropdownToggle}
        >
          <span>{currentSelectionView}</span>
        </div>
        {isOpen && (
          <div className="absolute top-full w-full left-0 z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            {dropdownSelection.map((option, index) => (
              <div
                role="none"
                key={option}
                className={`px-3 py-2 cursor-pointer hover:bg-primary-50 hover:text-primary-200 
                ${selectedOption === option ? 'text-primary-200' : ''}
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === 6 ? 'rounded-b-lg' : ''}
                `}
                onClick={() => handleOptionSelect(option, tabList[index + 1])}
              >
                {dropdownDisplayedSelection[index]}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

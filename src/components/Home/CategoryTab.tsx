import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useState } from 'react';
import {
  handleDisplayedTabChangeAtom,
  tabAtom,
} from '../../store/mainpageStore';
import { selections, tabList } from '../../utils/switchSelections';

export const CategoryTab = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [currentTab, setCurrentTab] = useAtom(tabAtom);

  const [, setDisplayedTabAtom] = useAtom(handleDisplayedTabChangeAtom);

  const handleTabChange = (tab: string, index: number) => {
    setCurrentTab(selections[index]);
    setDisplayedTabAtom(tab);
    setActiveTab(tab);
    window.scrollTo({
      top: 410,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="w-full border-t">
      <div
        className={`f-jic bg-white grid grid-cols-4 lg:grid-cols-7 min-w-[660px] gap-4 xl:px-32 
        ${currentTab === 'SEARCH' ? 'hidden' : ''}`}
      >
        {tabList.map((tab, index) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.1 }}
            role="none"
            className={`
            f-jic cursor-pointer py-4 text-lg min-w-[120px] font-semibold text-[#454545] 
            ${
              activeTab === tab
                ? 'border-b-[3px] border-primary-300 text-primary-200'
                : ''
            }
            transition-colors duration-200 ease-in-out hover:text-primary-200 
          `}
            key={tab}
            onClick={() => handleTabChange(tab, index)}
          >
            {tab}
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

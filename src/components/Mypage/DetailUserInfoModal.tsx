import { useState } from 'react';
import { Menu } from '../../assets/svgs/Menu';
import { Thumbdown } from '../../assets/svgs/Thumbdown';
import { Thumbup } from '../../assets/svgs/Thumbup';
import { Water } from '../../assets/svgs/Water';

export const DetailUserInfoModal = ({ onClose }: { onClose: () => void }) => {
  const [isThumbupActive, setThumbupActive] = useState(() => false);
  const [isThumbdownActive, setThumbdownActive] = useState(false);

  const handleThumbupClick = () => {
    setThumbupActive(!isThumbupActive);
    setThumbdownActive(false);
  };

  const handleThumbdownClick = () => {
    setThumbdownActive(!isThumbdownActive);
    setThumbupActive(false);
  };
  return (
    <div className="justify-center items-center">
      <div className="w-[542px] h-[230px] rounded-2xl bg-white flex flex-row p-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <img
            alt=""
            className="min-w-[97px] h-[97px] rounded-full bg-[#9A9A9A]"
          />
          <button
            type="button"
            className="w-[68px] h-[33px] border-2 rounded-2xl bg-primary-50 text-primary-200 border-primary-200"
          >
            팔로우
          </button>
        </div>

        <div className="flex flex-col w-full ml-6">
          <div className="flex flex-row justify-between mt-4 mb-2">
            <div className="text-2xl">카리나</div>
            <Menu />
          </div>

          <div>삼겹살 유저</div>

          <div className="flex justify-between mt-10 mb-2 ">
            <div className="flex flex-row justify-center items-center gap-2">
              <Water />
              <div>18</div>
            </div>
            <div className="flex flex-row justify-center items-center w-[95px] h-[33px]  gap-3 border-2 rounded-2xl bg-primary-50 text-primary-200 border-primary-200">
              <div>
                <Thumbup
                  onClick={handleThumbupClick}
                  isActive={isThumbupActive}
                />
              </div>
              <div>
                <Thumbdown
                  onClick={handleThumbdownClick}
                  isActive={isThumbdownActive}
                />
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
            <div
              className="bg-[#9A9A9A] h-2.5 rounded-full"
              //   className={stylestring}
              style={{ width: '77%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

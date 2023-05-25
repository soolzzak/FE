import React from 'react';
import { ModalInput } from '../common/ModalInput';
import { TwoOptionSelector } from '../common/TwoOptionSelector';
import { CustomSelector } from '../common/CustomSelector';
import { useCustomSelector } from '../../hooks/useCustomSelector';

export const AddRoom = () => {
  const selections = ['누구나', '여성', '남성'];
  const [selectedOption, handleOptionClick] = useCustomSelector(selections[0]);

  return (
    <div className="flex flex-col bg-white py-8 px-12 rounded-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-[356px] h-[236px] mt-5 rounded-2xl bg-[#D9D9D9]"></div>
        <div className="flex flex-col gap-5">
          <ModalInput
            title="방 제목"
            placeholderText="예시 : 분노의 질주 얘기하면서 같이 소주마셔요"
            inputType="text"
            autofocus={true}
          />
          <ModalInput
            title="카테고리"
            inputType="text"
            placeholderText="카테고리를 설정해주세요"
          />
          <CustomSelector
            selections={selections}
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
          />
          <div className="flexVerticalCenter ">
            <TwoOptionSelector
              title="방 공개설정"
              leftText="공개"
              rightText="비공개"
            />
            <ModalInput
              inputType="password"
              title="방 비밀번호"
              placeholderText="비밀번호를 입력해주세요"
            />
          </div>
        </div>
      </div>
      <button className="rounded-[18px] h-16 mt-12 bg-[#9A9A9A] text-white text-[20px] font-bold">
        혼술짝 방만들기
      </button>
    </div>
  );
};

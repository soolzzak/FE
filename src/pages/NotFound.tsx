import React from 'react';
import { NotFoundIcon } from '../assets/svgs/NotFound';

export const NotFound = () => (
  <div className="f-jic-col h-screen gap-4">
    <div className="f-jic text-8xl font-extrabold text-secondary-300 gap-2">
      404
      <NotFoundIcon />
    </div>

    <div className="text-2xl font-bold">존재하지 않는 페이지 입니다.</div>

    <button
      type="button"
      className="w-56 h-11 bg-primary-300 text-white text-xl rounded-lg"
    >
      홈 화면으로 돌아가기
    </button>
  </div>
);

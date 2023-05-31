import React from 'react';
import { HistoryCard } from './HistoryCard';

export const BadgeSection = () => (
  <div className="basis-2/5 bg-[#D9D9D9] rounded-3xl p-8">
    <p className="font-semibold">혼술짝 배지</p>
    <div className="grid grid-cols-2  gap-4 gap-y-6 p-4">
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </div>
  </div>
);

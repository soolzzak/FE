import { HistoryCard } from './HistoryCard';

export const HistorySection = () => (
  <div className="basis-1/2 bg-[#D9D9D9] rounded-3xl p-8">
    <p className="font-semibold">방문기록</p>
    <div className="grid grid-cols-2  gap-4 gap-y-6 p-4">
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </div>
  </div>
);

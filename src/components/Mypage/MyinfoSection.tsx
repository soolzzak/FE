import { Modify } from '../../assets/svgs/Modify';
export const MyinfoSection = () => {
  return (
    <div className="bg-[#D9D9D9] basis-2/5 rounded-3xl flex flex-col gap-y-6">
      <div className="flex flex-col mt-20 justify-center items-center gap-y-6">
        <div className="relative">
          <div className="w-52 h-52 rounded-full bg-[#9A9A9A]  "></div>
          <div className="absolute top-2 right-3 w-full h-full flex justify-end items-start">
            <Modify />
          </div>
        </div>
        <p>곽준희</p>
      </div>
      <div className="ml-20 mt-5">
        <p className="font-bold text-lg">이메일</p>
        <p>example.naver.com</p>
      </div>
      <div className="ml-20">
        <p className="font-bold text-lg">연결된 소설계정</p>
        <p>카카오톡 계정으로 연결되었습니다</p>
      </div>
    </div>
  );
};

export const HeroSection = () => (
  <div className="w-full">
    <section
      className="relative w-full h-[480px] min-w-[660px] 
      bg-[url('https://images.unsplash.com/photo-1590189182193-1fd44f2b4048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')] 
      bg-cover"
    >
      <div className="absolute bg-black w-full h-full opacity-30 z-10" />
      <div className="f-jic-col text-[#494949] min-w-[660px]">
        <h1 className="font-bold text-3xl  mt-48 text-white z-20">
          심심한 혼술 이제 그만,
        </h1>
        <h1 className="font-bold text-3xl text-white mt-2 z-20">
          함께 편하게 술 한잔!
        </h1>
      </div>
      <div className="f-jic-col mt-9  text-[#5F5F5F] min-w-[660px]">
        <span className="text-xl text-white z-20">
          술이 술술풀리는 우리의 공간,
        </span>
        <span className="text-xl text-white z-20">
          혼술짝으로 가볍고 편하게 술 한잔해요
        </span>
      </div>
    </section>
  </div>
);

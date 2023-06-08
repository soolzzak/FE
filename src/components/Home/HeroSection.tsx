import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'http://soolzzak.com.s3-website.ap-northeast-2.amazonaws.com/images/bg1.png',
    'http://soolzzak.com.s3-website.ap-northeast-2.amazonaws.com/images/bg2.png',
    'http://soolzzak.com.s3-website.ap-northeast-2.amazonaws.com/images/bg3.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const swipeVariants = {
    enter: {
      opacity: 1,
      x: '100%',
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 1,
      x: '-100%',
    },
  };

  return (
    <div className="w-full">
      <section className="relative w-full h-[480px] min-w-[660px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            className="absolute w-full h-full bg-cover"
            style={{
              backgroundImage: `url('${images[currentImageIndex]}')`,
            }}
            initial="enter"
            animate="center"
            exit="exit"
            variants={swipeVariants}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30, duration: 3 },
            }}
          />
        </AnimatePresence>
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
};

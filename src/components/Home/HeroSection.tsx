import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://mynice.s3.ap-northeast-2.amazonaws.com/mainImage/8d7de50650a64f02bb1982f0cee16638.png',
    'https://mynice.s3.ap-northeast-2.amazonaws.com/mainImage/d6bb14e0ddda460a94a5bea4eba60437.png',
    'https://mynice.s3.ap-northeast-2.amazonaws.com/mainImage/e572c23979e2444faf0542c4c0b33695.png',
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
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  const staggerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div className="w-full">
      <section className="relative w-full h-[580px] min-w-[660px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            className="absolute w-full h-full bg-cover max-w-[100]"
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
        <div className="absolute bg-black w-full h-full opacity-[0.4] z-10" />
        <div className="f-jic-col text-[#494949] min-w-[660px]">
          <motion.h1
            className="font-bold text-5xl  mt-52 text-white z-20"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 1 }}
          >
            심심한 혼술 이제 그만,
          </motion.h1>
          <motion.h1
            className="font-bold text-5xl text-white mt-4 z-20"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 1, delay: 0.2 }}
          >
            함께 편하게 술 한잔!
          </motion.h1>
        </div>
        <div className="f-jic-col mt-12  text-[#5F5F5F] min-w-[660px]">
          <motion.span
            className="text-[28px] text-white z-20"
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            술이 <motion.span variants={letterVariants}>술</motion.span>
            <motion.span variants={letterVariants}>술풀</motion.span>
            <motion.span variants={letterVariants}>리</motion.span>
            <motion.span variants={letterVariants}>는</motion.span>{' '}
            <motion.span variants={letterVariants}>우</motion.span>
            <motion.span variants={letterVariants}>리</motion.span>
            <motion.span variants={letterVariants}>의</motion.span>{' '}
            <motion.span variants={letterVariants}>공</motion.span>
            <motion.span variants={letterVariants}>간</motion.span>,
          </motion.span>
          <motion.span
            className="text-[28px] text-white z-20"
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            혼술짝으로 <motion.span variants={letterVariants}>가</motion.span>
            <motion.span variants={letterVariants}>볍</motion.span>
            <motion.span variants={letterVariants}>고</motion.span>{' '}
            <motion.span variants={letterVariants}>편</motion.span>
            <motion.span variants={letterVariants}>하</motion.span>
            <motion.span variants={letterVariants}>게</motion.span>{' '}
            <motion.span variants={letterVariants}>술</motion.span>{' '}
            <motion.span variants={letterVariants}>한</motion.span>
            <motion.span variants={letterVariants}>잔</motion.span>
            <motion.span variants={letterVariants}>해요</motion.span>
          </motion.span>
        </div>
      </section>
    </div>
  );
};

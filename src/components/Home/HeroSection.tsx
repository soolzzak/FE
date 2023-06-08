import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://lh3.googleusercontent.com/1Af1qA_MN-oKZ0C2zWR_yw9v1UVIlRVhmJe-HHQouNo7gshZVw9mF5SNDfrFDgNv7hrY2j_d2DR14-pJmoG9O7hpXsKTg8_EavPFUd8HxLGKRER_QRyka5fsboh9hpGFBvJdzAlco3EBN9BKYsjfAxvhOIPyIhBY-Xqqtcr2SiOcMzuagBgSEg4AzIsIvVsx_1XIRnVAIp7c3cZIbaLpsz_b54E1hgL8J58xGDW4AoAh_vpSEBqEaG1beoFI02CnAsKn6NWLIZvUvEJQZXdiccgGfQWvaPVU138WLC91Xkoj5j1bMugHnwP3oGSJPmztNlW45rB58qRB9Yf95_l1VGHIIfQ3nIGidCcSqhxdUTYMiTPfE1BQVqpDwIAhUvR1hh_OZnVffGfWH_w0P2jawGB4GukkQjyWn1QVjUn5fs0m_BtdKBS4mINDa1HPrSAa3EimTp1EqdmNOnFTgzDC5RKkyHLg61iGInQgaZz_niZ_aAn7VtQX__UuhDbczkcqIgeOkV37x-Cd1BdkO0k7dvy7e0CuqEorAbAI3QyTsTsfwbSQFy7rAB5BXicuCOa71eh5r9tZoXgq_xUfsqLdu7u4drMW4Yysm8mM9iRhsgOc790TblM6LiJBNA_ByZkfFgjtjKnvehPTlob3dW-jXIeVEUtKlEzbo2_ojw6r5zSfettSZ0-OIo9S8MhzPP7iVryuFECDKNmPDx-giWYPrtJ04YSIoiLMZleTFZl9dhdEhPESugerDdvkASEXlF1vqy5ZTKAkdDB-1xUzK3DchanKxdtZ--2D5sfAjLqZJ2PwTfEcsD9Kv_CfBopZVrfjgpdE6WvUFH18OhdZ0Ns8SR0GLSwRmu7Cowb4YvLA5gO4wVZ016qoFYEEfPBPENjTvHFmkB_pnaOw1cSttO3hPAPMncKhVF96YfcPEVsf7-s4Dt3K5ePoxUhhAQWUXZcAH45Dz9VfAWE5hVzFZqd472vV23rfOd7EN-i6hiuWrmmQCAUZAj3wtikambls16ScoMQpMoboZNL4uwGPJ7P_p4R2soRgrrpyjZZS4uMAh2IU9GZd7uSfy5i-KJTORok=w1441-h545-s-no?authuser=0',
    'https://lh3.googleusercontent.com/Yci5BeUBvXsV0g5oJdgh4MuvG-25MgIsATr0uot4W8BH3roIUC-pOS9LYT5SGrXaRdNrib1Ybk5L4hKZ82MKv0JKYkH-98kgjIRjQFsa5k82yhyTrXjgRtexLv4vmC225HiRquP_NyrahOulCbu437sN8PD2XkQdjcclhA8VCW55NaYrqxKUppFv_H7-ohxm_GD911WIdUIVL_OulXQGsXK0clNJmhQTxQkyOwwTxfqUEpkpMx1VjkyOE_lI-vTSjXI_GHOTaa21yS7X3PsktvHjOXVWLW3OtMbaEIMCSUpugxd39uPIVpunq4fNzdqbJLEkzgUECTvPHOJtTHfIRE972Vv-DJd35eXtENUfF1nWYY9sapvoNkcNKYCFW5_ShAZnA7HNsc7_ow0JFPTNWhetg8ZCeJwCcgzWsMIdDkFWMv70xSNAhpvpFWOn3AdTvwxPGrGgRBDLXdLWZOslX0RLNGef9zz7uzf13amtN6mX_0du2rmEs9CE00rAGbVjJ-8X7XMf09KoHHdHxEcyR4Nfa6XPlVxunhZvFVaTvmMxzs2PHLuQKUqQ82p78fd6oXR_mEcKmCRXK4fFVcvsPbVN5P2gUlLp_7zk_T3gzBMZYXZpb5qkEV-HMJkZC7XGNUbFz1SucRZYD4RiBqGqLa7pcDJU68PzlEAjU9bFhGR6FNXEwZmXVo1rMweg50uwy-Ik73dNQhsm5xS_CyaixMsBscMpSeGt3ajFLPI_vcCJoY01QCKTgjMd8lCQBXgHkgfPEccrhuKgV_yO-sm2nz-YYl3xUjklmNXJIcoLqyzv4mYY56VggBfWzj6f3Sj2oWwqk_xWZuP0rzYNVbbYWIDniV1Kdtq_7ueSrvUj0h7m6zlsm3gCLE3Mklxwx7IXXAYmUuedNEjfuWeQ4qNuDOuqnKEuxUnOi6lH68tJngE4Ggj_N-ZBH15wIHZjCD0UTTMWj-UtJgxfNQk71vqd9DOjcSZ2lkyhxytEXWau_2ZkRazPt-0CLG7eYWIGZin_4rGdwcE-3h2EbSCl2c-unqk1NA9OayOuV3rzjRD6pPM7o6-8tkde4PtIbWwwBRg=w1441-h545-s-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/AJFCJaXvx5wc6qqAhM0fv6Ij5JGib1twppxLcRONHQpfUY--grTtxOGoJ4uYyojlIrikvkbPQvKvvZsIS5SSCZorAKJU5T9UG0OZMZq7sKb1Y404TcEt9clgdAbCJcxK0KGrLYvg-Mw8rd5Ej0r5igadLZVr=w1440-h529-s-no?authuser=0',
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

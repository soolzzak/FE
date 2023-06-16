import { Github } from '../assets/svgs/Github';
import { Line } from '../assets/svgs/Line';

import { Logo } from '../assets/svgs/Logo';

export const Footer = () => (
  <div className="f-jic w-full bg-white z-50 shadow-sm min-w-[660px]">
    <div className="relative max-w-[1600px] w-full h-[90px] flex justify-center items-center">
      <div className="flex flex-row gap-x-4 items-center">
        <Logo logoSize="50" />
        <Line />
        <p>Copyright ©2023 HONSOOLZZAK. All rights reserved.</p>
        <a
          href="https://github.com/orgs/soolzzak/repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
      </div>
    </div>
  </div>
);

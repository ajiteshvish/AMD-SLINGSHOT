"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[200vh] flex flex-col items-center py-0 md:py-40 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.35] sm:scale-50"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="dark:text-white text-neutral-800 text-3xl font-bold mb-20 text-center"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      {/* Base area */}
      <div className="h-[22rem] w-[32rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
        {/* Above keyboard bar */}
        <div className="h-10 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-[#050505] rounded-b-xl" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full">
            <Keypad />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t dark:from-black from-white via-white dark:via-black to-transparent z-50"></div>
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: any;
  scaleY: any;
  rotate: any;
  translate: any;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
        >
          <span className="text-white">
            <AcesLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        <div className="absolute inset-0 bg-[#272729] rounded-lg" />
        <img
          src={src as string}
          alt="Aceternity Logo"
          className="object-cover object-left-top absolute rounded-lg inset-0 h-full w-full"
        />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="w-[40%] mx-auto h-32 rounded-xl my-1"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
      {/* Row 1 - Function keys */}
      <Row>
        <KBtn className="w-10 items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">esc</KBtn>
        {Array.from({ length: 12 }, (_, i) => (
          <KBtn key={i}>
            <span className="block text-[5px]">F{i + 1}</span>
          </KBtn>
        ))}
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-20% from-neutral-900 via-black via-50% to-neutral-900 to-95% p-px">
            <div className="bg-black h-full w-full rounded-full" />
          </div>
        </KBtn>
      </Row>

      {/* Row 2 - Number Row */}
      <Row>
        <KBtn><span className="block">~</span><span className="block mt-1">`</span></KBtn>
        <KBtn><span className="block">!</span><span className="block">1</span></KBtn>
        <KBtn><span className="block">@</span><span className="block">2</span></KBtn>
        <KBtn><span className="block">#</span><span className="block">3</span></KBtn>
        <KBtn><span className="block">$</span><span className="block">4</span></KBtn>
        <KBtn><span className="block">%</span><span className="block">5</span></KBtn>
        <KBtn><span className="block">^</span><span className="block">6</span></KBtn>
        <KBtn><span className="block">&</span><span className="block">7</span></KBtn>
        <KBtn><span className="block">*</span><span className="block">8</span></KBtn>
        <KBtn><span className="block">(</span><span className="block">9</span></KBtn>
        <KBtn><span className="block">)</span><span className="block">0</span></KBtn>
        <KBtn><span className="block">&mdash;</span><span className="block">-</span></KBtn>
        <KBtn><span className="block">+</span><span className="block">=</span></KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">delete</KBtn>
      </Row>

      {/* Row 3 - QWERTY */}
      <Row>
        <KBtn className="w-10 items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">tab</KBtn>
        <KBtn>Q</KBtn><KBtn>W</KBtn><KBtn>E</KBtn><KBtn>R</KBtn><KBtn>T</KBtn>
        <KBtn>Y</KBtn><KBtn>U</KBtn><KBtn>I</KBtn><KBtn>O</KBtn><KBtn>P</KBtn>
        <KBtn><span className="block">{"{"}</span><span className="block">[</span></KBtn>
        <KBtn><span className="block">{"}"}</span><span className="block">]</span></KBtn>
        <KBtn><span className="block">|</span><span className="block">\</span></KBtn>
      </Row>

      {/* Row 4 */}
      <Row>
        <KBtn className="w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">caps lock</KBtn>
        <KBtn>A</KBtn><KBtn>S</KBtn><KBtn>D</KBtn><KBtn>F</KBtn><KBtn>G</KBtn>
        <KBtn>H</KBtn><KBtn>J</KBtn><KBtn>K</KBtn><KBtn>L</KBtn>
        <KBtn><span className="block">:</span><span className="block">;</span></KBtn>
        <KBtn><span className="block">"</span><span className="block">'</span></KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">return</KBtn>
      </Row>

      {/* Row 5 */}
      <Row>
        <KBtn className="w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">shift</KBtn>
        <KBtn>Z</KBtn><KBtn>X</KBtn><KBtn>C</KBtn><KBtn>V</KBtn><KBtn>B</KBtn>
        <KBtn>N</KBtn><KBtn>M</KBtn>
        <KBtn><span className="block">&lt;</span><span className="block">,</span></KBtn>
        <KBtn><span className="block">&gt;</span><span className="block">.</span></KBtn>
        <KBtn><span className="block">?</span><span className="block">/</span></KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">shift</KBtn>
      </Row>

      {/* Row 6 - Bottom */}
      <Row>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><span className="block text-[6px]">fn</span></div>
          <div className="flex justify-start w-full pl-1"><svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/></svg></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><span className="block text-[6px]">⌃</span></div>
          <div className="flex justify-start w-full pl-1"><span className="block text-[6px]">control</span></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><span className="block text-[6px]">⌥</span></div>
          <div className="flex justify-start w-full pl-1"><span className="block text-[6px]">option</span></div>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><span className="block text-[6px]">⌘</span></div>
          <div className="flex justify-start w-full pl-1"><span className="block text-[6px]">command</span></div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><span className="block text-[6px]">⌘</span></div>
          <div className="flex justify-start w-full pl-1"><span className="block text-[6px]">command</span></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><span className="block text-[6px]">⌥</span></div>
          <div className="flex justify-start w-full pl-1"><span className="block text-[6px]">option</span></div>
        </KBtn>
        <KBtn>
          <div className="h-[6px] w-[6px] ml-[0.5px]">
            <TriangleIcon className="-rotate-90" />
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[2px]">
          <TriangleIcon className="" />
          <TriangleIcon className="rotate-180" />
        </KBtn>
        <KBtn>
          <div className="h-[6px] w-[6px] ml-[0.5px]">
            <TriangleIcon className="rotate-90" />
          </div>
        </KBtn>
      </Row>
    </div>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">{children}</div>
);

const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => (
  <div
    className={cn(
      "rounded-[4px] p-[0.5px] flex-shrink-0",
      "h-6 w-6 bg-[#0A090D] text-[5px] text-neutral-200",
      className
    )}
  >
    <div
      className={cn(
        "h-full w-full rounded-[3.5px] flex items-center justify-center",
        "bg-[#0A090D] shadow-[0_-0.5px_2px_0_#0D0D0F_inset,_0_1px_0_0_#3B3A3F_inset]",
        childrenClassName
      )}
    >
      {backlit && (
        <div className="absolute w-[90%] h-3 rounded-full bg-white/5 blur-[4px] -bottom-px" />
      )}
      {children}
    </div>
  </div>
);

const SpeakerGrid = () => (
  <div className="flex px-[0.5px] gap-[2px] mt-2 h-40">
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} className="flex flex-col gap-[2px] flex-1">
        {Array.from({ length: 20 }, (_, j) => (
          <div key={j} className="w-full h-[3px] rounded-full bg-[#0D0D0F]" />
        ))}
      </div>
    ))}
  </div>
);

const TriangleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("h-full w-full text-white", className)}
  >
    <path d="M12 5l8 14H4z" />
  </svg>
);


const AcesLogo = () => (
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 opacity-30">
    <path d="M25 5L40 15V35L25 45L10 35V15L25 5Z" stroke="white" strokeWidth="1.5" fill="none" />
    <text x="25" y="30" fontSize="10" fill="white" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">T</text>
  </svg>
);

"use client";

import { motion } from "framer-motion";

interface Props {
  isFront: boolean;
  onFlip: () => void;
}

export default function CameraToggle({ isFront, onFlip }: Props) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="text-[11px] font-bold uppercase tracking-widest text-black/40 font-dm-sans">
        Rear
      </span>
      <button
        onClick={onFlip}
        className={`relative w-12 h-6 rounded-full border transition-colors duration-300 ${
          isFront
            ? "bg-[#E83C28]/80 border-[#E83C28]/40"
            : "bg-black/15 border-black/10"
        }`}
      >
        <motion.span
          className="absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow"
          animate={{ x: isFront ? 22 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </button>
      <span className="text-[11px] font-bold uppercase tracking-widest text-black/40 font-dm-sans">
        Front
      </span>
      <span className="text-[11px] font-bold text-white bg-black/30 px-2.5 py-0.5 rounded-full font-dm-sans">
        {isFront ? "FRONT" : "REAR"}
      </span>
    </div>
  );
}

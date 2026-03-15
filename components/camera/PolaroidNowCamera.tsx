"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  snapped: boolean;
  imageData: string | null;
  tag: string;
  comment: string;
  isFront: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  activeFilter?: string;
  cameraReady?: boolean;
}

export default function PolaroidNowCamera({
  snapped,
  imageData,
  tag,
  comment,
  isFront,
  videoRef,
  activeFilter = "none",
  cameraReady = false,
}: Props) {
  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: 300 }}
      animate={
        snapped
          ? {
            y: [0, -8, 3, -3, 1, 0],
            rotate: [0, -1.5, 1, -0.6, 0.3, 0],
          }
          : {}
      }
      transition={{ duration: 0.38, ease: "easeInOut" }}
    >
      {/* Flash burst overlay */}
      <motion.div
        className="absolute top-[54px] left-[56px] w-9 h-9 rounded bg-white pointer-events-none z-10"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={
          snapped
            ? { opacity: [0, 1, 0], scale: [0.2, 1.6, 3] }
            : { opacity: 0, scale: 0.2 }
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
      />

      {/* SVG Camera Body */}
      <svg
        viewBox="0 0 300 260"
        width={300}
        height={260}
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Main Body */}
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0EDE8" />
          </linearGradient>
          <radialGradient id="lensGrad" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#7CB8E8" />
            <stop offset="60%" stopColor="#3A7CC0" />
            <stop offset="100%" stopColor="#1A3A5C" />
          </radialGradient>
          <linearGradient id="flashGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C0C0C0" />
            <stop offset="100%" stopColor="#888" />
          </linearGradient>
          <clipPath id="lensClip">
            <circle cx={168} cy={90} r={34} />
          </clipPath>
        </defs>

        {/* Camera main body */}
        <rect
          x={20}
          y={18}
          width={260}
          height={200}
          rx={22}
          fill="url(#bodyGrad)"
          stroke="#C8C0B8"
          strokeWidth={1.5}
        />

        {/* Flash unit frame */}
        <rect
          x={36}
          y={28}
          width={68}
          height={52}
          rx={8}
          fill="#2A2A2A"
          stroke="#1A1A1A"
          strokeWidth={1}
        />
        {/* Flash grid reflector */}
        <rect
          x={42}
          y={34}
          width={56}
          height={40}
          rx={4}
          fill="url(#flashGrad)"
        />
        {/* Flash grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={`flash-${i}`}>
            <line
              x1={42 + i * 14}
              y1={34}
              x2={42 + i * 14}
              y2={74}
              stroke="#999"
              strokeWidth={0.5}
            />
            <line
              x1={42}
              y1={34 + i * 10}
              x2={98}
              y2={34 + i * 10}
              stroke="#999"
              strokeWidth={0.5}
            />
          </React.Fragment>
        ))}

        {/* Modern Accent Design below shutter */}
        <g transform="translate(42, 145)">
          <rect
            x={-12}
            y={0}
            width={24}
            height={50}
            rx={12}
            fill="#EFEBE4"
            stroke="#D8D2C7"
            strokeWidth={1.5}
          />
          <line
            x1={0}
            y1={10}
            x2={0}
            y2={40}
            stroke="#1A1A1A"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.15}
          />
        </g>

        {/* Lens barrel outer */}
        <circle cx={168} cy={90} r={68} fill="#1A1A1A" />
        <circle
          cx={168}
          cy={90}
          r={62}
          fill="#2A2A2A"
          stroke="#333"
          strokeWidth={1}
        />
        <circle
          cx={168}
          cy={90}
          r={52}
          fill="#1A1A1A"
          stroke="#222"
          strokeWidth={0.5}
        />
        <circle
          cx={168}
          cy={90}
          r={44}
          fill="#252525"
          stroke="#333"
          strokeWidth={0.5}
        />

        {/* Lens glass / Live Preview */}
        {videoRef ? (
          <foreignObject x={134} y={56} width={68} height={68} clipPath="url(#lensClip)">
            <div className="w-full h-full relative bg-[#1A3A5C]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{
                  opacity: cameraReady ? 1 : 0,
                  transform: isFront ? "scaleX(-1)" : "none",
                  filter: activeFilter !== "none" ? activeFilter : "none",
                }}
              />
              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/50 text-[6px] font-dm-sans animate-pulse">
                    Loading...
                  </span>
                </div>
              )}
            </div>
          </foreignObject>
        ) : (
          <circle cx={168} cy={90} r={34} fill="url(#lensGrad)" />
        )}

        {/* Lens glare */}
        <ellipse
          cx={155}
          cy={78}
          rx={10}
          ry={6}
          fill="white"
          opacity={0.25}
          className="pointer-events-none"
        />

        {/* Red shutter button */}
        <circle cx={42} cy={108} r={16} fill="#E83C28" />
        <circle
          cx={42}
          cy={108}
          r={14}
          fill="none"
          stroke="#D03020"
          strokeWidth={1}
        />
        {/* Shutter glare */}
        <circle cx={37} cy={103} r={3.5} fill="white" opacity={0.35} />

        {/* Viewfinder */}
        <rect x={242} y={28} width={26} height={22} rx={4} fill="#2A2A2A" />
        <rect
          x={245}
          y={31}
          width={20}
          height={16}
          rx={2}
          fill="#3A3A3A"
          stroke="#555"
          strokeWidth={0.5}
        />

        {/* + button */}
        <rect
          x={244}
          y={80}
          width={26}
          height={22}
          rx={4}
          fill="none"
          stroke="#999"
          strokeWidth={1.2}
        />
        <text
          x={257}
          y={95}
          textAnchor="middle"
          fill="#999"
          fontSize={14}
          fontWeight="bold"
        >
          +
        </text>

        {/* 3 sensor dots */}
        {[244, 253, 262].map((cx) => (
          <circle key={cx} cx={cx} cy={113} r={2.5} fill="#555" />
        ))}

        {/* Eject slot */}
        <rect x={76} y={194} width={148} height={8} rx={2} fill="#2A2A2A" />
        <rect
          x={78}
          y={196}
          width={144}
          height={4}
          rx={1}
          fill="#1A1A1A"
        />
      </svg>

      {/* Polaroid paper — grows from eject slot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bg-[#FFFEF9] overflow-hidden rounded-b-sm z-20"
        style={{ top: 228, width: 128 }}
        initial={{ height: 0, y: 0, rotate: 0 }}
        animate={
          snapped
            ? { height: 156, y: 17, rotate: 1.1 }
            : { height: 0, y: 0, rotate: 0 }
        }
        transition={{
          height: {
            type: "spring",
            stiffness: 140,
            damping: 13,
            delay: 0.15,
          },
          y: { type: "spring", stiffness: 120, damping: 10, delay: 0.7 },
          rotate: { type: "spring", stiffness: 100, damping: 8, delay: 0.75 },
        }}
      >
        {imageData && (
          <div className="p-2 pb-7">
            <img
              src={imageData}
              alt="snap"
              className="w-full aspect-square object-cover rounded-[1px]"
            />
            <p className="text-[9px] font-bold text-[#E8622A] mt-1">{tag}</p>
            <p className="text-[10px] text-[#3B1F0A] mt-0.5 truncate">
              {comment}
            </p>
            <p className="text-[8px] text-[#3B1F0A]/40 mt-0.5">
              {new Date().toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

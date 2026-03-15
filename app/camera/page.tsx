"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PolaroidNowCamera from "@/components/camera/PolaroidNowCamera";
import CameraToggle from "@/components/camera/CameraToggle";
import FilterBar from "@/components/camera/FilterBar";
import CameraControls from "@/components/camera/CameraControls";

export default function CameraPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment"
  );
  const [activeFilter, setActiveFilter] = useState("none");
  const [snapped, setSnapped] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(
    async (facing: "environment" | "user") => {
      try {
        stopStream();
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facing,
            width: { ideal: 1280 },
            height: { ideal: 1280 },
          },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      } catch (err) {
        console.error("Camera error:", err);
        setCameraError(
          "Camera access denied. Please allow camera permissions."
        );
        setCameraReady(false);
      }
    },
    [stopStream]
  );

  useEffect(() => {
    startCamera(facingMode);
    return () => stopStream();
  }, []);

  const flipCamera = async () => {
    const newMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newMode);
    await startCamera(newMode);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    const size = Math.min(video.videoWidth, video.videoHeight);
    if (size === 0) {
      console.error("Video dimensions are 0");
      alert("Camera not fully ready, please try again.");
      return;
    }
    
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Centre-crop to square
    const offsetX = (video.videoWidth - size) / 2;
    const offsetY = (video.videoHeight - size) / 2;

    // Handle front camera mirroring
    if (facingMode === "user") {
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }

    // Apply selected CSS filter
    ctx.filter = activeFilter;
    ctx.drawImage(video, offsetX, offsetY, size, size, 0, 0, size, size);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    sessionStorage.setItem("cuinsnap_pending", dataUrl);
    setImageData(dataUrl);
    setSnapped(true);

    setTimeout(() => {
      router.push("/editor");
    }, 1400);
  };

  const handleFilePick = (dataUrl: string) => {
    // Apply filter to picked image
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      const offsetX = (img.width - size) / 2;
      const offsetY = (img.height - size) / 2;

      ctx.filter = activeFilter;
      ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

      const filtered = canvas.toDataURL("image/jpeg", 0.88);
      sessionStorage.setItem("cuinsnap_pending", filtered);
      router.push("/editor");
    };
    img.src = dataUrl;
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 w-full py-4">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[#3B1F0A]/60 text-[13px] font-dm-sans mb-4 hover:text-[#3B1F0A] transition-colors"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      {/* Hidden container if needed, but video is now in PolaroidNowCamera */}
      {/* We pass videoRef down instead */}

      {/* Camera Toggle */}
      <div className="mb-4">
        <CameraToggle
          isFront={facingMode === "user"}
          onFlip={flipCamera}
        />
      </div>

      {/* Camera error */}
      {cameraError && (
        <div className="text-center py-4 mb-4">
          <p className="text-[#E8622A] text-[13px] font-dm-sans">
            {cameraError}
          </p>
          <p className="text-[#3B1F0A]/50 text-[12px] font-dm-sans mt-1">
            You can still pick a photo from your gallery below.
          </p>
        </div>
      )}

      {/* Polaroid Now Camera SVG */}
      <div className="flex justify-center mb-4">
        <PolaroidNowCamera
          snapped={snapped}
          imageData={imageData}
          tag=""
          comment=""
          isFront={facingMode === "user"}
          videoRef={videoRef}
          activeFilter={activeFilter}
          cameraReady={cameraReady}
        />
      </div>

      {/* Filter Bar */}
      <div className="mb-2">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Camera Controls */}
      <CameraControls
        onCapture={capturePhoto}
        onFlip={flipCamera}
        onFilePick={handleFilePick}
      />
    </div>
  );
}

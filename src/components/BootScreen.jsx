import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useDeviceType from "#hooks/useDeviceType.js";
import AppleLogo from "./boot/AppleLogo.jsx";

const MIN_DURATION = 2200; // ms floor so it reads like a real boot
const ASSETS = [
  "/images/wallpaper.png",
  "/images/logo.svg",
  "/images/folder.png",
  "/images/finder.png",
  "/images/safari.png",
  "/images/photos.png",
  "/images/contact.png",
  "/images/terminal.png",
  "/images/trash.png",
  "/icons/wifi.svg",
  "/icons/search.svg",
  "/icons/user.svg",
  "/icons/mode.svg",
]; // above-the-fold critical assets

const preload = (src) =>
  new Promise((res) => {
    const img = new Image();
    img.onload = img.onerror = () => res();
    img.src = src;
  });

const BootScreen = ({ onDone }) => {
  const device = useDeviceType();
  const rootRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let finished = false;
    let cancelled = false;
    let rafId = 0;
    let tween = null;
    const start = performance.now();

    // Smooth determinate progress for the macOS bar (creeps to 95%)
    const tick = () => {
      if (finished || cancelled) return;
      const pct = Math.min(95, ((performance.now() - start) / MIN_DURATION) * 100);
      setProgress(pct);
      if (pct < 95) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const ready = Promise.all([
      ...ASSETS.map(preload),
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((r) => setTimeout(r, MIN_DURATION)),
    ]);

    ready.then(() => {
      if (cancelled) return;
      finished = true;
      setProgress(100);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      tween = gsap.to(rootRef.current, {
        opacity: 0,
        duration: reduce ? 0.01 : 0.6,
        delay: reduce ? 0 : 0.25,
        ease: "power2.out",
        onComplete: onDone,
      });
    });

    return () => {
      cancelled = true;
      finished = true;
      cancelAnimationFrame(rafId);
      tween?.kill();
    };
  }, [onDone]);

  return (
    <div ref={rootRef} className="boot-screen">
      <AppleLogo className="boot-logo" />

      {device === "desktop" ? (
        <div className="boot-bar">
          <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      ) : (
        <div className={`boot-spinner boot-spinner--${device}`} aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} style={{ "--i": i, transform: `rotate(${i * 30}deg)` }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BootScreen;
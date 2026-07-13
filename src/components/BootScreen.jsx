import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useDeviceType from "#hooks/useDeviceType.js";
import AppleLogo from "./boot/AppleLogo.jsx";

const MIN_DURATION = 2200; // ms floor so it reads like a real boot
const ASSETS = ["/images/wallpaper.png"]; // above-the-fold critical assets

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
    const start = performance.now();

    // Smooth determinate progress for the macOS bar (creeps to 95%)
    const tick = () => {
      if (finished) return;
      const pct = Math.min(95, ((performance.now() - start) / MIN_DURATION) * 100);
      setProgress(pct);
      if (pct < 95) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const ready = Promise.all([
      ...ASSETS.map(preload),
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((r) => setTimeout(r, MIN_DURATION)),
    ]);

    ready.then(() => {
      finished = true;
      setProgress(100);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: reduce ? 0.01 : 0.6,
        delay: reduce ? 0 : 0.25,
        ease: "power2.out",
        onComplete: onDone,
      });
    });
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
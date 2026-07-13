import { useSyncExternalStore } from "react";

// Thresholds kept in sync with Tailwind breakpoints (see index.css note)
const MOBILE_MAX = 767;   // <= 767  -> mobile
const TABLET_MAX = 1024;  // 768..1024 -> tablet

const compute = () => {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const touch = navigator.maxTouchPoints || 0;

  if (w <= MOBILE_MAX) return "mobile";
  if (w <= TABLET_MAX) return "tablet";
  // Wide viewport but a touch-primary device (e.g. iPad landscape) -> tablet
  if ((coarse || touch > 1) && w <= 1366) return "tablet";
  return "desktop";
};

let current = compute();
const listeners = new Set();
let bound = false;
let raf = 0;

const notify = () => {
  const next = compute();
  if (next !== current) {
    current = next;
    listeners.forEach((l) => l());
  }
};

const onResize = () => {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(notify); // debounce to one paint
};

const subscribe = (listener) => {
  listeners.add(listener);
  if (!bound && typeof window !== "undefined") {
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    bound = true;
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && bound) {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      cancelAnimationFrame(raf);
      bound = false;
    }
  };
};

const getSnapshot = () => current;
const getServerSnapshot = () => "desktop";

export const useDeviceType = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useDeviceType;
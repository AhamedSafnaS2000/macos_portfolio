import useWindowStore from "#store/window.js";
import useDeviceType from "#hooks/useDeviceType.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const device = useDeviceType();
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    // open animation
    useGSAP(() => {
      const sectionEl = sectionRef.current;
      const target = device === "desktop" ? sectionEl : contentRef.current;
      if (!sectionEl || !isOpen || !target) return;
      sectionEl.style.display = "block";
      gsap.fromTo(
        target,
        { scale: device === "desktop" ? 0.8 : 1, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out", y: 0 }
      );
    }, [isOpen, device]);

    // draggable: desktop only — disabled on tablet/touch
    useGSAP(() => {
      const el = sectionRef.current;
      if (!el || device !== "desktop") return;
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      return () => instance.kill();
    }, [device]);

    useLayoutEffect(() => {
      const el = sectionRef.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={sectionRef}
        className="absolute"
        style={{ zIndex, touchAction: device === "desktop" ? "none" : "auto" }}
        onPointerDown={() => focusWindow(windowKey)}
      >
        <div ref={contentRef} className="h-full w-full">
          <Component {...props} />
        </div>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;

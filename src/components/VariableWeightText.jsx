import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const VariableWeightText = ({
  text,
  as: Tag = "p",
  className = "",
  min = 100,
  max = 400,
  base = 100,
  spread = 20000,
}) => {
  const ref = useRef(null);

  useGSAP(() => {
    const container = ref.current;
    if (!container) return;
    const letters = container.querySelectorAll("span");

    const animate = (letter, weight, duration = 0.25) =>
      gsap.to(letter, {
        duration,
        ease: "power2.out",
        css: { fontVariationSettings: `"wght" ${weight}` },
      });

    const applyAt = (clientX) => {
      const { left } = container.getBoundingClientRect();
      const x = clientX - left;
      letters.forEach((letter) => {
        const { left: l, width: w } = letter.getBoundingClientRect();
        const distance = Math.abs(x - (l - left + w / 2));
        const intensity = Math.exp(-(distance ** 2) / spread);
        animate(letter, min + (max - min) * intensity);
      });
    };

    const reset = () => letters.forEach((letter) => animate(letter, base, 0.3));

    const onPointerMove = (e) => applyAt(e.clientX);
    const onTouchMove = (e) => {
      if (e.touches[0]) applyAt(e.touches[0].clientX);
    };

    // Desktop hover
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", reset);
    // Touch drag
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", reset);
    container.addEventListener("touchcancel", reset);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", reset);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", reset);
      container.removeEventListener("touchcancel", reset);
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {[...text].map((char, i) => (
        <span
          key={i}
          style={{ fontVariationSettings: `"wght" ${base}`, display: "inline-block" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </Tag>
  );
};

export default VariableWeightText;
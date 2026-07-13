import dayjs from "dayjs";
import { Wifi, BatteryFull } from "lucide-react";
import MobileHomeBar from "../components/MobileHomeBar.jsx";
import VariableWeightText from "#components/VariableWeightText.jsx";

// Two apps shown top-left. Notes -> resume. `scale` compensates for PNG padding (1 = full-bleed).
const TOP_APPS = [
  { id: "note", name: "Notes", icon: "/images/Option.png", screen: "resume", scale: 0.9 },
  { id: "terminal", name: "Skills", icon: "/images/terminal.png", screen: "terminal", scale: 1.18 },
];

const DOCK_APPS = [
  { id: "finder", name: "Portfolio", icon: "/images/finder.png", screen: "work", scale: 1.12 },
  { id: "safari", name: "Articles", icon: "/images/safari.png", screen: "safari", scale: 1.1 },
  { id: "photos", name: "Gallery", icon: "/images/photos.png", screen: "photos", scale: 1 },
  { id: "contact", name: "Contact", icon: "/images/contact.png", screen: "contact", scale: 1.14 },
];

const AppIcon = ({ app, size = "size-16" }) => (
  <div className={`${size} overflow-hidden rounded-2xl shadow-lg`}>
    <img
      src={app.icon}
      alt={app.name}
      style={{ transform: `scale(${app.scale ?? 1})` }}
      className="size-full object-cover"
    />
  </div>
);

const MobileHome = ({ onNavigate }) => {
  return (
    <div className="relative flex h-dvh flex-col text-white select-none">
      {/* Status bar */}
      <div className="relative flex items-center justify-between px-6 pt-3">
        <span className="text-sm font-semibold">{dayjs().format("h:mm A")}</span>
        <div className="absolute left-1/2 top-2 h-7 w-32 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center gap-1.5">
          <Wifi size={16} strokeWidth={2} />
          <BatteryFull size={20} strokeWidth={2} />
        </div>
      </div>

      {/* Top-left app icons */}
      <div className="flex gap-5 px-6 pt-4">
        {TOP_APPS.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => onNavigate(app.screen)}
            className="transition-transform active:scale-95"
          >
            <AppIcon app={app} />
          </button>
        ))}
      </div>

      {/* Hero — animates on touch drag (and mouse hover) */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <VariableWeightText
          text="Hey, I'm Ahamed Safnas! Welcome to my"
          className="font-georama text-lg text-gray-200"
          min={100}
          max={400}
          base={100}
        />
        <VariableWeightText
          as="h1"
          text="Portfolio!"
          className="font-georama mt-2 text-6xl italic text-gray-100"
          min={400}
          max={900}
          base={400}
        />
      </div>

      {/* Dock */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-around gap-2 rounded-3xl bg-white/15 px-4 py-3 backdrop-blur-xl">
          {DOCK_APPS.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onNavigate(app.screen)}
              className="transition-transform active:scale-95"
            >
              <AppIcon app={app} size="size-14" />
            </button>
          ))}
        </div>
      </div>

      <MobileHomeBar />
    </div>
  );
};

export default MobileHome;
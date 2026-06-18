import dayjs from "dayjs";
import MobileHomeBar from "../components/MobileHomeBar.jsx";

const HOME_APPS = [
  { id: "finder",   name: "Portfolio", icon: "/images/finder.png",   screen: "work"     },
  { id: "safari",   name: "Articles",  icon: "/images/safari.png",   screen: "safari"   },
  { id: "photos",   name: "Gallery",   icon: "/images/photos.png",   screen: "photos"   },
  { id: "contact",  name: "Contact",   icon: "/images/contact.png",  screen: "contact"  },
  { id: "terminal", name: "Skills",    icon: "/images/terminal.png", screen: "terminal" },
  { id: "trash",    name: "Archive",   icon: "/images/trash.png",    screen: "work", screenData: { tab: "trash" } },
];

const MobileHome = ({ onNavigate }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <time className="text-base font-semibold text-white drop-shadow">
          {dayjs().format("h:mm")}
        </time>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-3.5 rounded-sm border border-white/80 bg-white/90" />
          <div className="text-white text-xs">●●</div>
        </div>
      </div>

      {/* Date */}
      <div className="px-6 pb-6">
        <p className="text-4xl font-light text-white drop-shadow">
          {dayjs().format("dddd")}
        </p>
        <p className="text-white/80 text-sm mt-1 drop-shadow">
          {dayjs().format("MMMM D")}
        </p>
      </div>

      {/* App grid */}
      <div className="flex-1 px-6">
        <div className="grid grid-cols-4 gap-x-4 gap-y-5">
          {HOME_APPS.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onNavigate(app.screen, app.screenData)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-[14px] overflow-hidden shadow-lg">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-white font-medium drop-shadow text-center leading-tight">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="px-6 pb-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-full bg-white/20 backdrop-blur-xl py-2.5 px-4"
        >
          <span className="text-white/80 text-sm">🔍 Search</span>
        </button>
      </div>

      {/* Dock */}
      <div className="px-4 pb-2">
        <div className="rounded-[26px] bg-white/20 backdrop-blur-xl p-3 flex items-center justify-around">
          <button
            type="button"
            onClick={() => onNavigate("work")}
            className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-[14px] overflow-hidden shadow-lg">
              <img
                src="/images/finder.png"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-14 h-14 rounded-[14px]" />
          ))}
        </div>
      </div>

      <MobileHomeBar />
    </div>
  );
};

export default MobileHome;

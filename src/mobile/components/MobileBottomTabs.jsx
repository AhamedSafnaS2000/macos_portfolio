import clsx from "clsx";
import MobileHomeBar from "./MobileHomeBar.jsx";

const MobileBottomTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                "flex flex-1 flex-col items-center gap-0.5 pt-2 pb-1",
                isActive ? "text-[#007aff]" : "text-[#8e8e93]"
              )}
            >
              <tab.Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <MobileHomeBar />
    </div>
  );
};

export default MobileBottomTabs;

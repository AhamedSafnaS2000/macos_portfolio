import MobileHeader from "../components/MobileHeader.jsx";
import MobileHomeBar from "../components/MobileHomeBar.jsx";
import { techStack } from "#constants";
import { Check, Flag } from "lucide-react";

const MobileTerminal = ({ onBack }) => {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="h-3 bg-white" />

      <MobileHeader title="Tech Stack" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-5">
        <div className="font-roboto text-sm space-y-4">
          <p className="text-gray-900 font-semibold">Techstack</p>

          {/* Table header */}
          <div className="flex items-center gap-4 ms-7 text-xs text-gray-500">
            <span className="w-24">Category</span>
            <span>Technologies</span>
          </div>

          <div className="border-y border-dashed border-gray-300 py-3 space-y-2">
            {techStack.map(({ category, items }) => (
              <div key={category} className="flex items-start gap-2">
                <Check size={16} className="text-[#00a154] mt-0.5 flex-none" />
                <span className="text-[#00a154] font-semibold w-20 flex-none text-xs">
                  {category}
                </span>
                <span className="text-gray-800 text-xs leading-relaxed">
                  {items.join(", ")}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <p className="flex items-center gap-2 text-[#00a154] text-xs">
              <Check size={14} />
              <span>5 of 5 stacks loaded successfully (100%)</span>
            </p>
            <p className="flex items-center gap-2 text-gray-800 text-xs">
              <Flag size={12} fill="currentColor" />
              <span>Render time: 6ms</span>
            </p>
          </div>
        </div>
      </div>

      <MobileHomeBar />
    </div>
  );
};

export default MobileTerminal;

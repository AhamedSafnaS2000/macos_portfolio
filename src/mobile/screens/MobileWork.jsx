import { useState } from "react";
import { ChevronLeft, Search, Briefcase, User } from "lucide-react";
import { locations } from "#constants";
import MobileHomeBar from "../components/MobileHomeBar.jsx";
import clsx from "clsx";

const WORK_TABS = [
  { id: "work",  label: "Work",     Icon: Briefcase },
  { id: "about", label: "About Me", Icon: User },
];

const MobileWork = ({ onNavigate, onBack, initialTab = "work" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [search, setSearch] = useState("");

  const projects = locations.work.children;
  const aboutFiles = locations.about.children;

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Status bar placeholder */}
      <div className="h-3 bg-white" />

      {/* Navigation header */}
      <div className="flex h-12 w-full items-center justify-between bg-white/90 px-4 backdrop-blur-xl">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 text-[#007aff] text-[15px]"
        >
          <ChevronLeft size={20} />
          <span>Go back</span>
        </button>
        <h1 className="text-[17px] font-semibold text-black">
          {activeTab === "work" ? "Work" : "About Me"}
        </h1>
        <button
          type="button"
          onClick={onBack}
          className="text-[#007aff] text-[15px]"
        >
          Cancel
        </button>
      </div>

      {/* Search bar (only on Work tab) */}
      {activeTab === "work" && (
        <div className="px-4 py-2 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2 rounded-[10px] bg-[#7878801f] px-3 py-2">
            <Search size={15} className="text-[#3c3c4399] flex-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-[#3c3c4399] outline-none"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "work" ? (
          <div className="p-4">
            {/* Project folders */}
            <div className="grid grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onNavigate("folder", { project })}
                  className="flex flex-col items-center gap-1.5 active:opacity-70 transition-opacity"
                >
                  <img
                    src={project.icon}
                    alt={project.name}
                    className="w-16 h-16 object-contain"
                  />
                  <span className="text-xs text-center text-gray-800 leading-tight line-clamp-2">
                    {project.name}
                  </span>
                </button>
              ))}

              {/* Resume.pdf */}
              <button
                type="button"
                onClick={() => onNavigate("resume")}
                className="flex flex-col items-center gap-1.5 active:opacity-70 transition-opacity"
              >
                <img
                  src="/images/pdf.png"
                  alt="Resume.pdf"
                  className="w-16 h-16 object-contain"
                />
                <span className="text-xs text-center text-gray-800 leading-tight">
                  Resume.pdf
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* About Me tab */
          <div className="p-6 space-y-5">
            <img
              src="/images/adrian.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-2">
                Meet the Developer Behind the Code
              </h2>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                {locations.about.children
                  .find((f) => f.fileType === "txt")
                  ?.description?.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </div>

            {/* Photo files */}
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase mb-3">
                Photos
              </p>
              <div className="grid grid-cols-3 gap-2">
                {aboutFiles
                  .filter((f) => f.fileType === "img")
                  .map((file) => (
                    <button
                      key={file.id}
                      type="button"
                      onClick={() => onNavigate("imgfile", { file })}
                      className="aspect-square rounded-lg overflow-hidden active:opacity-70"
                    >
                      <img
                        src={file.imageUrl}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom tabs */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center">
          {WORK_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex flex-1 flex-col items-center gap-0.5 pt-2 pb-1",
                  isActive ? "text-[#007aff]" : "text-[#8e8e93]"
                )}
              >
                <tab.Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <MobileHomeBar />
      </div>
    </div>
  );
};

export default MobileWork;

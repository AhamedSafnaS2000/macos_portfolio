import { ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import MobileHomeBar from "../components/MobileHomeBar.jsx";

const FILE_ICONS = {
  txt: "/images/txt.png",
  img: "/images/image.png",
  url: "/images/safari.png",
  fig: "/images/plain.png",
  pdf: "/images/pdf.png",
};

const MobileFolderContent = ({ project, onNavigate, onBack }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!project) return null;

  const handleFileOpen = (file) => {
    if (file.fileType === "txt") {
      setSelectedFile(file);
      return;
    }
    if (file.fileType === "img") {
      onNavigate("imgfile", { file });
      return;
    }
    if (file.fileType === "pdf") {
      onNavigate("resume");
      return;
    }
    if (["fig", "url"].includes(file.fileType) && file.href) {
      window.open(file.href, "_blank", "noopener,noreferrer");
    }
  };

  if (selectedFile) {
    return (
      <div className="flex h-full flex-col bg-white">
        <div className="h-3 bg-white" />
        <div className="flex h-12 items-center justify-between bg-white/90 px-4 backdrop-blur-xl border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            className="flex items-center gap-0.5 text-[#007aff] text-[15px]"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-[17px] font-semibold text-black truncate max-w-[180px]">
            {selectedFile.name}
          </h1>
          <div className="w-16" />
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {selectedFile.image && (
            <img
              src={selectedFile.image}
              alt={selectedFile.name}
              className="w-full rounded-xl object-cover shadow"
            />
          )}
          {selectedFile.subtitle && (
            <p className="text-lg font-semibold text-gray-800">
              {selectedFile.subtitle}
            </p>
          )}
          <div className="space-y-3">
            {selectedFile.description?.map((para, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        <MobileHomeBar />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="h-3 bg-white" />

      {/* Header */}
      <div className="flex h-12 items-center justify-between bg-white/90 px-4 backdrop-blur-xl">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 text-[#007aff] text-[15px]"
        >
          <ChevronLeft size={20} />
          <span>Go back</span>
        </button>
        <h1 className="text-[17px] font-semibold text-black truncate max-w-[160px]">
          {project.name}
        </h1>
        <button
          type="button"
          onClick={onBack}
          className="text-[#007aff] text-[15px]"
        >
          Cancel
        </button>
      </div>

      {/* Files grid */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-3 gap-5">
          {project.children?.map((file) => (
            <button
              key={file.id}
              type="button"
              onClick={() => handleFileOpen(file)}
              className="flex flex-col items-center gap-1.5 active:opacity-70 transition-opacity"
            >
              <img
                src={FILE_ICONS[file.fileType] || "/images/plain.png"}
                alt={file.name}
                className="w-16 h-16 object-contain"
              />
              <span className="text-xs text-center text-gray-800 leading-tight break-all line-clamp-2">
                {file.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <MobileHomeBar />
    </div>
  );
};

export default MobileFolderContent;

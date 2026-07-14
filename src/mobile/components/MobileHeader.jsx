import { ChevronLeft } from "lucide-react";

const MobileHeader = ({ title, onBack, rightAction, dark = false }) => {
  return (
    <header className={`relative flex h-12 w-full items-center justify-between border-b px-4 backdrop-blur-xl ${dark ? "bg-slate-950 border-slate-800" : "bg-white/80 border-gray-200"}`}>
      <button
        type="button"
        onClick={onBack}
        className={`flex items-center gap-1 text-sm font-normal ${dark ? "text-white" : "text-[#007aff]"}`}
      >
        <ChevronLeft size={18} />
        <span>Go back</span>
      </button>

      <h1 className={`absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold ${dark ? "text-white" : "text-black"}`}>
        {title}
      </h1>

      {rightAction ? (
        <div>{rightAction}</div>
      ) : (
        <div className="w-16" />
      )}
    </header>
  );
};

export default MobileHeader;

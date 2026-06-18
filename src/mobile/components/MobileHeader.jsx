import { ChevronLeft } from "lucide-react";

const MobileHeader = ({ title, onBack, rightAction }) => {
  return (
    <header className="relative flex h-12 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-xl">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[#007aff] text-sm font-normal"
      >
        <ChevronLeft size={18} />
        <span>Go back</span>
      </button>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-black">
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

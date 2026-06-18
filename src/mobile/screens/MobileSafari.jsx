import { ChevronLeft, ChevronRight, Share, BookOpen, Search, LayoutGrid, ArrowRight } from "lucide-react";
import { blogPosts } from "#constants";
import MobileHomeBar from "../components/MobileHomeBar.jsx";

const MobileSafari = ({ onBack }) => {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="h-3 bg-white" />

      {/* Header */}
      <div className="flex h-12 items-center justify-between bg-white px-4 border-b border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 text-[#007aff] text-[15px]"
        >
          <ChevronLeft size={20} />
          <span>Go back</span>
        </button>
        <h1 className="text-[17px] font-semibold text-black">Safari</h1>
        <div className="w-16" />
      </div>

      {/* Blog content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        <h2 className="text-base font-bold text-[#e0185e] mb-6">
          My Developer Blog
        </h2>

        <div className="space-y-7">
          {blogPosts.map(({ id, image, title, date, link }) => (
            <a
              key={id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 items-start active:opacity-70 transition-opacity"
            >
              <img
                src={image}
                alt={title}
                className="w-[77px] h-[77px] rounded-xl object-cover flex-none shadow-sm"
              />
              <div className="flex-1 space-y-1.5">
                <p className="text-[10px] text-gray-400">{date}</p>
                <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-3">
                  {title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#007aff]">
                  Check out the full post
                  <ArrowRight size={10} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Safari bottom bar */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xl px-3 pt-2 pb-0">
        {/* Address bar */}
        <div className="flex items-center justify-center mb-2">
          <div className="flex-1 flex items-center justify-center rounded-[12px] bg-white shadow-sm border border-gray-200 h-[42px] px-3 gap-2">
            <Search size={15} className="text-gray-400 flex-none" />
            <span className="text-gray-400 text-sm truncate flex-1 text-center">
              Search or enter website name
            </span>
          </div>
        </div>

        {/* Safari nav icons */}
        <div className="flex items-center justify-between px-2 pb-1">
          <button type="button" className="text-gray-400 p-1">
            <ChevronLeft size={22} />
          </button>
          <button type="button" className="text-gray-400 p-1">
            <ChevronRight size={22} />
          </button>
          <button type="button" className="text-[#007aff] p-1">
            <Share size={20} />
          </button>
          <button type="button" className="text-[#007aff] p-1">
            <BookOpen size={20} />
          </button>
          <button type="button" className="text-[#007aff] p-1">
            <LayoutGrid size={20} />
          </button>
        </div>

        <MobileHomeBar />
      </div>
    </div>
  );
};

export default MobileSafari;

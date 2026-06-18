import { useState } from "react";
import { Image, Grid2X2, Search } from "lucide-react";
import MobileHeader from "../components/MobileHeader.jsx";
import MobileHomeBar from "../components/MobileHomeBar.jsx";
import { photosLinks, gallery } from "#constants";
import clsx from "clsx";

const BOTTOM_TABS = [
  { id: "photos",  label: "All Photos", Icon: Image },
  { id: "albums",  label: "Albums",     Icon: Grid2X2 },
  { id: "search",  label: "Search",     Icon: Search },
];

const MobilePhotos = ({ onBack, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState(photosLinks[0]?.id ?? null);
  const [bottomTab, setBottomTab] = useState("photos");

  const selectedCategory = photosLinks.find((l) => l.id === activeCategory);
  const filteredGallery = gallery.filter((item) => {
    if (!selectedCategory) return true;
    if (selectedCategory.category === "favorites") return item.favorite;
    return item.category === selectedCategory.category;
  });

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="h-3 bg-white" />

      <MobileHeader title="All Photos" onBack={onBack} />

      {/* Category filter tabs (horizontal scroll) */}
      <div className="flex overflow-x-auto gap-2 px-4 py-3 border-b border-gray-100 scrollbar-none">
        {photosLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => setActiveCategory(link.id)}
            className={clsx(
              "flex-none flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              link.id === activeCategory
                ? "bg-[#007aff] text-white"
                : "bg-gray-100 text-gray-600"
            )}
          >
            <img src={link.icon} alt={link.title} className="w-3.5 h-3.5" />
            {link.title}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-3 gap-0.5">
            {filteredGallery.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onNavigate("imgfile", {
                    file: { ...item, name: item.title, imageUrl: item.img },
                  })
                }
                className="aspect-square overflow-hidden active:opacity-70 transition-opacity"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm">
            No photos in this collection.
          </div>
        )}
      </div>

      {/* Bottom tabs */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center">
          {BOTTOM_TABS.map((tab) => {
            const isActive = bottomTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setBottomTab(tab.id)}
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

export default MobilePhotos;

import MobileHeader from "../components/MobileHeader.jsx";
import MobileHomeBar from "../components/MobileHomeBar.jsx";

const MobileImageView = ({ file, onBack }) => {
  const src = file?.imageUrl || file?.image || file?.img || file?.src;

  return (
    <div className="flex h-full flex-col bg-black">
      <div className="h-3 bg-black" />
      <div className="bg-black">
        <MobileHeader
          title={file?.name ?? "Image"}
          onBack={onBack}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={file?.name}
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        ) : (
          <p className="text-white/60 text-sm">No image available.</p>
        )}
      </div>

      <div className="bg-black">
        <MobileHomeBar />
      </div>
    </div>
  );
};

export default MobileImageView;

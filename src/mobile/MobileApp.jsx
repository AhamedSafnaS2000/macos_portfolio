import { useState, useCallback } from "react";
import MobileHome from "./screens/MobileHome.jsx";
import MobileWork from "./screens/MobileWork.jsx";
import MobileFolderContent from "./screens/MobileFolderContent.jsx";
import MobilePhotos from "./screens/MobilePhotos.jsx";
import MobileSafari from "./screens/MobileSafari.jsx";
import MobileContact from "./screens/MobileContact.jsx";
import MobileTerminal from "./screens/MobileTerminal.jsx";
import MobileImageView from "./screens/MobileImageView.jsx";
import MobileResumeView from "./screens/MobileResumeView.jsx";

const MobileApp = () => {
  const [stack, setStack] = useState([{ name: "home" }]);

  const current = stack[stack.length - 1];

  const navigate = useCallback((name, data = {}) => {
    setStack((prev) => [...prev, { name, ...data }]);
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const renderScreen = () => {
    switch (current.name) {
      case "home":
        return <MobileHome onNavigate={navigate} />;

      case "work":
        return (
          <MobileWork
            onNavigate={navigate}
            onBack={goBack}
            initialTab={current.tab === "trash" ? "work" : "work"}
          />
        );

      case "folder":
        return (
          <MobileFolderContent
            project={current.project}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case "photos":
        return <MobilePhotos onBack={goBack} onNavigate={navigate} />;

      case "safari":
        return <MobileSafari onBack={goBack} />;

      case "contact":
        return <MobileContact onBack={goBack} />;

      case "terminal":
        return <MobileTerminal onBack={goBack} />;

      case "imgfile":
        return <MobileImageView file={current.file} onBack={goBack} />;

      case "resume":
        return <MobileResumeView onBack={goBack} />;

      default:
        return <MobileHome onNavigate={navigate} />;
    }
  };

  return (
    <div className="h-dvh w-dvw overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/wallpaper.png)" }}
    >
      <div className="h-full w-full">
        {renderScreen()}
      </div>
    </div>
  );
};

export default MobileApp;

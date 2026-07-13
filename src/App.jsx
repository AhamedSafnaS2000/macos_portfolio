import { useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock, Home } from "#components";
import { Safari, Terminal, Resume, Finder, Text, Image, Contact, Photos } from "#windows";
import { MobileApp } from "#mobile";
import BootScreen from "#components/BootScreen.jsx";
import useDeviceType from "#hooks/useDeviceType.js";

gsap.registerPlugin(Draggable);

const App = () => {
  const [booted, setBooted] = useState(false);
  const device = useDeviceType();

  return (
    <main data-device={device}>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {device === "mobile" ? (
        <MobileApp />
      ) : (
        <>
          <Navbar />
          <Welcome />
          <Home />
          <Safari />
          <Terminal />
          <Resume />
          <Finder />
          <Text />
          <Image />
          <Contact />
          <Photos />
          <Dock />
        </>
      )}
    </main>
  );
};

export default App;
import gsap from "gsap";
import {Draggable} from 'gsap/Draggable';

import { Navbar, Welcome , Dock, Home} from "#components";
import { Safari, Terminal, Resume, Finder, Text, Image, Contact, Photos } from "#windows";
import { MobileApp } from "#mobile";

gsap.registerPlugin(Draggable);


const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal/>
      <Safari/>
      <Resume/>
      <Finder/>
      <Text/>
      <Image/>
      <Contact/>
      <Home/>
      <Photos/>

      {/* Mobile view - overlays everything on screens smaller than sm (640px) */}
      <div className="sm:hidden absolute inset-0 z-[99999]">
        <MobileApp />
      </div>
    </main>
  )
}

export default App 
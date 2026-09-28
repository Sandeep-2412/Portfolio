import { Navbar, Welcome, Dock, Home, SiriAssistant } from "./components";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
import {Terminal} from "#windows";
import { Resume, Safari, Finder, Text, Image, Contact } from "./windows";
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Home />
      <Dock />
      <SiriAssistant />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
    </main>
  );
};

export default App;

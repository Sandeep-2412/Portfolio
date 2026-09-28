import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { openWindow, focusWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const handleOpen = (project) => {
    setActiveLocation(project);
    openWindow("finder");
    focusWindow("finder");
  };

  useGSAP(() => {
    const draggables = Draggable.create(".desktop-folder", {
      bounds: "main",
      inertia: true,
      type: "x,y",
    });
    return () => draggables.forEach((d) => d.kill());
  }, []);

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group desktop-folder", project.windowPosition)}
            onDoubleClick={() => handleOpen(project)}
          >
            <img
              src={project.icon || "/images/folder.png"}
              alt={project.name}
            />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;

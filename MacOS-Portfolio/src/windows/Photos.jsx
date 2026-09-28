import { useState } from "react";
import clsx from "clsx";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import { gallery, photosLinks } from "../constants";
import useWindowStore from "../store/window";

const Photos = () => {
  const [activeTab, setActiveTab] = useState(photosLinks[0]?.title ?? "Library");
  const { openWindow } = useWindowStore();

  const handleOpenImage = (item) => {
    openWindow("imgfile", {
      ...item,
      name: item.name || "Gallery image",
      imageUrl: item.img,
    });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Gallery</h2>
      </div>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          <h2>Media</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li
                key={id}
                onClick={() => setActiveTab(title)}
                className={clsx(activeTab === title ? "active" : "not-active")}
              >
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="gallery">
          <ul>
            {gallery.map((item) => (
              <li key={item.id} onClick={() => handleOpenImage(item)}>
                <img src={item.img} alt={`Gallery item ${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;

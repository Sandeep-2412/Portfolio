import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import { locations } from "../constants";
import useWindowStore from "../store/window";

const Archive = () => {
  const { openWindow } = useWindowStore();
  const items = locations.trash?.children ?? [];

  return (
    <>
      <div id="window-header">
        <WindowControls target="trash" />
        <h2>Archive</h2>
      </div>
      <div className="archive-content">
        <div className="archive-toolbar">
          <span>Recently Deleted</span>
          <button type="button" className="archive-clear">
            Empty
          </button>
        </div>

        <ul className="archive-grid">
          {items.map((item) => (
            <li key={item.id} onClick={() => openWindow("imgfile", item)}>
              <img src={item.imageUrl || item.icon} alt={item.name} />
              <p>{item.name.replace(/\.[^/.]+$/, "")}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ArchiveWindow = WindowWrapper(Archive, "trash");
export default ArchiveWindow;

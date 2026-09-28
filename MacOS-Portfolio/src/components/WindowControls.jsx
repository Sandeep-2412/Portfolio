import { Minus, Plus, X } from "lucide-react";
import useWindowStore from "../store/window";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  const handleMinimize = (event) => {
    event.stopPropagation();
    minimizeWindow(target);
  };

  const handleMaximize = (event) => {
    event.stopPropagation();
    maximizeWindow(target);
  };

  return (
    <div id="window-controls">
      <div className="close" onClick={(event) => {
        event.stopPropagation();
        closeWindow(target);
      }}>
        <X size={8} strokeWidth={3} />
      </div>
      <div className="minimize" onClick={handleMinimize}>
        <Minus size={8} strokeWidth={3} />
      </div>
      <div className="maximize" onClick={handleMaximize}>
        <Plus size={8} strokeWidth={3} />
      </div>
    </div>
  );
};
export default WindowControls;
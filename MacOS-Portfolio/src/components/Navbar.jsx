import dayjs from "dayjs";
import { locations, navIcons, navLinks } from "../constants";
import useLocationStore from "../store/location";
import useWindowStore from "../store/window";

const Navbar = () => {
  const { openWindow, focusWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const handleNavClick = (type) => {
    if (type === "finder") {
      setActiveLocation(locations.work);
      openWindow("finder");
      focusWindow("finder");
      return;
    }

    openWindow(type);
    focusWindow(type);
  };

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo"></img>
        <p className="font-bold">Sandeep's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => handleNavClick(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`}></img>
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;

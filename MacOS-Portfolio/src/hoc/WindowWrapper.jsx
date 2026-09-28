import useWindowStore from "../store/window.js";
import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);
const WindowWrapper = (Component, WindowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows?.[WindowKey];
    if (!windowState) return null;

    const { isOpen, zIndex, isMinimized, isMaximized } = windowState;
    const ref = useRef(null);
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;
      el.style.display = "";
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen, isMinimized]);
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;
      const [draggable] = Draggable.create(el, { onPress: () => focusWindow(WindowKey) });
      return () => draggable.kill();
    }, [isOpen, isMinimized]);
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      if (!isOpen || isMinimized) {
        el.style.display = "none";
        el.style.left = "";
        el.style.top = "";
        el.style.width = "";
        el.style.height = "";
        return;
      }

      el.style.display = "";

      if (isMaximized) {
        el.style.left = "12px";
        el.style.top = "56px";
        el.style.width = "calc(100vw - 24px)";
        el.style.height = "calc(100vh - 92px)";
        return;
      }

      el.style.left = "";
      el.style.top = "";
      el.style.width = "";
      el.style.height = "";
    }, [isOpen, isMinimized, isMaximized]);

    if (!isOpen || isMinimized) return null;

    return (
      <section id={WindowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };
  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;

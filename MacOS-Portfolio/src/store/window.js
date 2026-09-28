import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {WINDOW_CONFIG, INITIAL_Z_INDEX} from '../constants/index';
const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        openWindow: (windowKey, data=null) => set((state) => {
            const win = state.windows[windowKey];
            if(!win) return;
            win.isOpen = true;
            win.isMinimized = false;
            win.isMaximized = false;
            win.zIndex = state.nextZIndex;
            win.data = data ?? win.data;
            state.nextZIndex += 1;
        }),
        closeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];  
            if(!win) return;
            win.isOpen = false;
            win.isMinimized = false;
            win.isMaximized = false;
            win.zIndex = INITIAL_Z_INDEX;
            win.data = null;
        }),
        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if(!win) return;
            win.zIndex = state.nextZIndex++;
        }),
        minimizeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if(!win || !win.isOpen) return;
            win.isMinimized = true;
            win.isMaximized = false;
        }),
        maximizeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if(!win || !win.isOpen) return;
            win.isMinimized = false;
            win.isMaximized = !win.isMaximized;
        }),

    }))
)
export default useWindowStore;
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import useWindowStore from "../store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const { data } = windows.txtfile;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>
      <div className={data.image ? "about-me-content" : "p-5 space-y-4 flex-1 overflow-y-auto min-h-0"}>
        {data.image && (
          <div className="about-me-hero">
            <img src={data.image} alt={data.name} />
            {data.subtitle && <p>{data.subtitle}</p>}
          </div>
        )}
        {data.subtitle && !data.image && (
          <h3 className="font-semibold text-base text-gray-800 mb-1">{data.subtitle}</h3>
        )}
        {Array.isArray(data.description) &&
          data.description.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;

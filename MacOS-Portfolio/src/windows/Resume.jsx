import { Download } from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";

const PDF_PATH = "/files/Venkata_Sandeep_Macha_Portfolio_Resume.pdf";

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>
        <a
          href={PDF_PATH}
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <iframe
        src={PDF_PATH}
        title="Resume"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </>
  );
};
const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;

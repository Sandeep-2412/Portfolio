import { useState } from "react";
import { Copy, Check } from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import { socials } from "../constants";

const EMAIL = "sandeepmacha2412@gmail.com";

const Contact = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>
      <div className="p-5 space-y-5 flex-1 overflow-y-auto min-h-0">
        <img
          src="/images/pic_in_suit-removebg.png"
          alt="Sandeep"
          className="w-20 h-20 rounded-full object-cover object-top"
        />
        <h3>Let&apos;s Connect</h3>
        <p>
          Got an idea? A bug to squash? Or just wanna talk tech? I&apos;m in.
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
        >
          <span className="truncate text-sm font-medium text-gray-700">
            {EMAIL}
          </span>
          {hasCopied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4 text-gray-400" />
          )}
        </button>
        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;

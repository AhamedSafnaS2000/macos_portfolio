import MobileHeader from "../components/MobileHeader.jsx";
import MobileHomeBar from "../components/MobileHomeBar.jsx";
import { socials } from "#constants";

const CONTACT_ACTIONS = [
  {
    label: "Email me",
    gradient: "linear-gradient(180deg, #52cc69 0%, #37c654 100%)",
    href: "mailto:safnas2042ahamed@gmail.com",
  },
  {
    label: "GitHub",
    gradient: "linear-gradient(180deg, #f56e74 0%, #f2595e 100%)",
    href: socials.find((s) => s.text === "Github")?.link ?? "#",
  },
  {
    label: "Twitter / X",
    gradient: "linear-gradient(180deg, #ff8d72 0%, #ff7b5c 100%)",
    href: socials.find((s) => s.text === "Twitter/X")?.link ?? "#",
  },
  {
    label: "LinkedIn",
    gradient: "linear-gradient(180deg, #00b9f8 0%, #00aff2 100%)",
    href: socials.find((s) => s.text === "LinkedIn")?.link ?? "#",
  },
];

const MobileContact = ({ onBack }) => {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="h-3 bg-white" />

      <MobileHeader title="Contact Me" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-6 pt-6 space-y-5">
        {/* Profile */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/images/adrian.jpg"
            alt="Profile"
            className="w-[106px] h-[106px] rounded-full object-cover shadow"
          />
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Let&apos;s Connect
            </h2>
            <p className="text-base text-gray-600 leading-snug">
              Got an idea? A bug to squash?
              <br />
              Or just wanna talk tech? I&apos;m in.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 pb-4">
          {CONTACT_ACTIONS.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="flex rounded-xl h-[72px] px-5 items-center active:opacity-90 transition-opacity"
              style={{ background: action.gradient }}
            >
              <span className="text-white font-semibold text-sm">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <MobileHomeBar />
    </div>
  );
};

export default MobileContact;

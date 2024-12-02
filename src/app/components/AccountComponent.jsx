import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Share2,
  User,
  FileText,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function AccountComponent() {
  const [userName, setUserName] = useState("John Doe");
  const [copied, setCopied] = useState(false); // State to track copy status

  const router = useRouter(); // Use useRouter hook directly

  const shareContent = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this awesome web app!",
          text: "I found this really cool app. Have a look!",
          url: "https://yourhomepage.com",
        })
        .then(() => console.log("Content shared successfully!"))
        .catch((error) => console.log("Error sharing content:", error));
    } else {
      fallbackShare();
    }
  }, []);

  const fallbackShare = useCallback(() => {
    const shareUrl = "https://yourhomepage.com";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) =>
          console.log("Error copying link to clipboard:", error)
        );
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.opacity = 0;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Fallback: Unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  }, []);

  const menuItems = [
    { icon: Share2, label: "Share", action: shareContent },
    {
      icon: Info,
      label: "About",
      action: () => router.push("/account/about"),
    },
    {
      icon: User,
      label: "Profile Settings",
      action: () => console.log("Profile Settings tapped"),
    },
    {
      icon: FileText,
      label: "Policy/Terms of Condition",
      action: () => router.push("/account/policy"),
    },
    {
      icon: LogOut,
      label: "Log out",
      isLogout: true,
    },
  ];

  return (
    <div className="">
      <div className="max-w-md mx-auto overflow-hidden">
        <div className="">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">
            {userName}
          </h2>
          <ul className="divide-y divide-gray-200 mt-16">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.isLogout ? (
                  <LogoutLink className="w-full py-4 px-4 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-4 text-gray-400" />
                      <span className="text-sm sm:text-base">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </LogoutLink>
                ) : (
                  <button
                    onClick={item.action}
                    className="w-full py-4 px-4 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-4 text-gray-400" />
                      <span className="text-sm sm:text-base">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                )}
                {item.label === "Share" && copied && (
                  <span className="text-sm text-gray-500 ml-4">Copied!</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

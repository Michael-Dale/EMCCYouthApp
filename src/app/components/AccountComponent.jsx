import { useState } from "react";
import {
  Share2,
  User,
  FileText,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function AccountPage() {
  const [userName, setUserName] = useState("John Doe");

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this awesome web app!',
        text: 'I found this really cool app. Have a look!',
        url: window.location.href, // Share the current page URL
      })
      .then(() => console.log('Content shared successfully!'))
      .catch((error) => console.log('Error sharing content:', error));
    } else {
      console.log('Web Share API is not supported in your browser.');
    }
  };

  const menuItems = [
    { icon: Share2, label: "Share", action: shareContent },  // Share button with Web Share API
    { icon: Info, label: "About", action: () => console.log("About tapped") },
    {
      icon: User,
      label: "Profile Settings",
      action: () => console.log("Profile Settings tapped"),
    },
    {
      icon: FileText,
      label: "Policy/Terms of Condition",
      action: () => console.log("Policy/Terms tapped"),
    },
    {
      icon: LogOut,
      label: "Log out",
      action: () => console.log("Log out tapped"),
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

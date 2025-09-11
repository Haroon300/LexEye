import { Link, useLocation } from "react-router-dom";
import { Folder, Scale, User } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/categories", label: "Categories", icon: <Folder size={18} /> },
    { to: "/laws", label: "Laws", icon: <Scale size={18} /> },
    { to: "/user", label: "User View", icon: <User size={18} /> },
  ];

  return (
    <aside className="w-64 bg-black text-white h-screen flex flex-col shadow-lg">
      {/* Logo / Header */}
      <div className="p-6 text-2xl font-extrabold tracking-wide border-b border-gray-800">
        ⚖️ LexEye
        <p className="text-sm font-normal text-gray-400">Admin Panel</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} LexEye
      </div>
    </aside>
  );
}

export default Sidebar;

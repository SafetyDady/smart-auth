import React, { useState, useRef, useEffect } from 'react';

interface User {
  username: string;
  full_name: string;
  role: string;
  email: string;
}

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      alert('Logout clicked!');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Info Display */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium text-white">{user.full_name}</div>
          <div className="text-xs text-green-200">{user.role}</div>
        </div>
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 bg-white text-green-900 rounded-full flex items-center justify-center text-sm font-semibold">
            {user.full_name.charAt(0).toUpperCase()}
          </div>
          <span className="text-white text-sm">▼</span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">{user.full_name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
                <div className="text-xs text-green-600 font-medium">{user.role}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="w-4 text-center">👤</span>
              <span className="text-sm">โปรไฟล์</span>
            </a>
            
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="w-4 text-center">⚙️</span>
              <span className="text-sm">ตั้งค่า</span>
            </a>
            
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="w-4 text-center">🔔</span>
              <span className="text-sm">การแจ้งเตือน</span>
            </a>
            
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="w-4 text-center">❓</span>
              <span className="text-sm">ช่วยเหลือ</span>
            </a>
            
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <span className="w-4 text-center">🚪</span>
                <span className="text-sm">ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

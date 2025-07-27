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
    <div className="relative">
      <button
        className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-full"
        onClick={() => setOpen(!open)}
      >
        <span>SA</span>
        <span>Super Admin</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleProfile}>
            Information / Profile
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleChangePassword}>
            Change Password
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

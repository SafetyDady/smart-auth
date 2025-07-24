import React, { useState } from "react";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  // ฟังก์ชัน logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const handleProfile = () => {
    window.location.href = "/profile";
  };

  const handleChangePassword = () => {
    window.location.href = "/change-password";
  };

  const handleEditProfile = () => {
    window.location.href = "/edit-profile";
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

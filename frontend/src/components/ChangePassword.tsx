import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://localhost:8000/api/v1/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Password changed successfully");
    } else {
      setMessage(data.detail || "Error changing password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <div className="mb-4">
        <label>Old Password</label>
        <input type="password" className="w-full border p-2" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label>New Password</label>
        <input type="password" className="w-full border p-2" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
      </div>
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Change Password</button>
      {message && <div className="mt-4 text-red-600">{message}</div>}
    </form>
  );
};

export default ChangePassword;

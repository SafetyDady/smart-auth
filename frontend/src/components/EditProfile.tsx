import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    fetch("http://localhost:8000/api/v1/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFullName(data.full_name);
        setEmail(data.email);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: เชื่อมต่อ API สำหรับแก้ไขข้อมูลส่วนตัว (ยังไม่มี endpoint ใน backend)
    setMessage("(Demo) Profile updated: " + fullName + ", " + email);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <div className="mb-4">
        <label>Full Name</label>
        <input type="text" className="w-full border p-2" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label>Email</label>
        <input type="email" className="w-full border p-2" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Save</button>
      {message && <div className="mt-4 text-green-700">{message}</div>}
    </form>
  );
};

export default EditProfile;

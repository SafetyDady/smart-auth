import { useEffect, useState } from "react";
import { User, Edit, Save, X, Eye, EyeOff } from "lucide-react";

interface UserData {
  username: string;
  full_name: string;
  email: string;
  role: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: ""
  });
  
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [successMessage, setSuccessMessage] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("access_token");
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    
    fetch("http://localhost:8000/api/v1/auth/me", {
      headers: getAuthHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEditForm({
          full_name: data.full_name,
          email: data.email
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEditProfile = async () => {
    setErrors({});
    
    // Validation
    const newErrors: {[key: string]: string} = {};
    
    if (!editForm.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }
    
    if (!editForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(editForm.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrors({ general: data.detail || "Failed to update profile" });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    }
  };

  const handleChangePassword = async () => {
    setErrors({});
    
    // Validation
    const newErrors: {[key: string]: string} = {};
    
    if (!passwordForm.old_password) {
      newErrors.old_password = "Current password is required";
    }
    
    if (!passwordForm.new_password) {
      newErrors.new_password = "New password is required";
    } else if (!validatePassword(passwordForm.new_password)) {
      newErrors.new_password = "Password must be at least 6 characters";
    }
    
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({
          old_password: passwordForm.old_password,
          new_password: passwordForm.new_password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsChangingPassword(false);
        setPasswordForm({ old_password: "", new_password: "", confirm_password: "" });
        setSuccessMessage("Password changed successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrors({ general: data.detail || "Failed to change password" });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!user) return (
    <div className="text-center text-red-600 p-4">
      <p>No user data found</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.general}
        </div>
      )}

      {/* Profile Display/Edit */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="px-3 py-2 bg-gray-100 rounded border text-gray-600">
            {user.username}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editForm.full_name}
                onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.full_name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
            </div>
          ) : (
            <div className="px-3 py-2 bg-gray-50 rounded border">
              {user.full_name}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          {isEditing ? (
            <div>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          ) : (
            <div className="px-3 py-2 bg-gray-50 rounded border">
              {user.email}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="px-3 py-2 bg-gray-100 rounded border">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Buttons */}
      <div className="flex space-x-3 mb-6">
        {isEditing ? (
          <>
            <button
              onClick={handleEditProfile}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditForm({
                  full_name: user.full_name,
                  email: user.email
                });
                setErrors({});
              }}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Change Password Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
        
        {!isChangingPassword ? (
          <button
            onClick={() => setIsChangingPassword(true)}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
          >
            Change Password
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={passwordForm.old_password}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, old_password: e.target.value }))}
                  className={`w-full px-3 py-2 pr-10 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.old_password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.old_password && <p className="text-red-500 text-sm mt-1">{errors.old_password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, new_password: e.target.value }))}
                  className={`w-full px-3 py-2 pr-10 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.new_password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.new_password && <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirm_password}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                  className={`w-full px-3 py-2 pr-10 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.confirm_password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleChangePassword}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordForm({ old_password: "", new_password: "", confirm_password: "" });
                  setErrors({});
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

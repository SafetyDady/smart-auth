import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
        navigate('/');
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!resetEmail) {
      alert('กรุณากรอกอีเมล');
      return;
    }
    setShowForgotPassword(false);
    setShowResetSuccess(true);
    setResetEmail('');
  };

  const PopupOverlay = ({ show, onClose, children }: { show: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!show) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden transform transition-transform" 
          onClick={e => e.stopPropagation()}
          style={{ 
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            animation: 'fadeInScale 0.3s ease-out'
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .login-container {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #1A2B48 0%, #2E4A6B 25%, #3B5998 50%, #4A6FA5 75%, #5A7FB8 100%);
          display: flex;
          flex-direction: column;
          font-family: 'Prompt', sans-serif;
        }
        
        .login-header {
          flex: none;
          padding: 60px 20px 40px;
          text-align: center;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .logo-icon {
          background: #28A745;
          color: white;
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
        }
        
        .logo-text {
          color: white;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        
        .main-title {
          color: white;
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        
        .subtitle {
          color: rgba(255, 255, 255, 0.85);
          font-size: 18px;
          font-weight: 400;
        }
        
        .login-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px 60px;
        }
        
        .login-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 480px;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        
        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1A2B48 0%, #28A745 50%, #2E4A6B 100%);
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
          font-size: 16px;
        }
        
        .input-container {
          position: relative;
        }
        
        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          font-size: 18px;
          z-index: 1;
        }
        
        .form-input {
          width: 100%;
          padding: 16px 20px 16px 52px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          font-size: 16px;
          background: #F9FAFB;
          transition: all 0.3s ease;
          font-family: 'Prompt', sans-serif;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #1A2B48;
          background: white;
          box-shadow: 0 0 0 3px rgba(26, 43, 72, 0.1);
        }
        
        .form-input.error {
          border-color: #DC3545;
          background: #FFF5F5;
        }
        
        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          cursor: pointer;
          font-size: 18px;
          transition: color 0.2s ease;
          z-index: 1;
        }
        
        .password-toggle:hover {
          color: #1A2B48;
        }
        
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        
        .checkbox {
          width: 20px;
          height: 20px;
          accent-color: #1A2B48;
          cursor: pointer;
        }
        
        .checkbox-label {
          font-size: 16px;
          color: #6B7280;
          cursor: pointer;
          user-select: none;
        }
        
        .error-message {
          color: #DC3545;
          font-size: 16px;
          text-align: center;
          padding: 12px;
          background: #FFF5F5;
          border-radius: 8px;
          margin: 16px 0;
          border: 1px solid #FECACA;
        }
        
        .login-button {
          width: 100%;
          background: linear-gradient(135deg, #1A2B48 0%, #2E4A6B 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Prompt', sans-serif;
          letter-spacing: 0.5px;
        }
        
        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(26, 43, 72, 0.3);
        }
        
        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }
        
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .forgot-password {
          text-align: center;
          margin: 20px 0;
        }
        
        .forgot-link {
          color: #1A2B48;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .forgot-link:hover {
          color: #2E4A6B;
          text-decoration: underline;
        }
        
        .terms-section {
          text-align: center;
          font-size: 14px;
          color: #6B7280;
          line-height: 1.6;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #E5E7EB;
        }
        
        .terms-link {
          color: #1A2B48;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .terms-link:hover {
          color: #2E4A6B;
          text-decoration: underline;
        }
        
        .footer {
          margin-top: 32px;
          padding-top: 24px;
          text-align: center;
          font-size: 12px;
          color: #9CA3AF;
          border-top: 1px solid #F3F4F6;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .login-header {
            padding: 40px 20px 30px;
          }
          
          .logo-icon {
            width: 56px;
            height: 56px;
            font-size: 24px;
          }
          
          .logo-text {
            font-size: 28px;
          }
          
          .main-title {
            font-size: 36px;
          }
          
          .subtitle {
            font-size: 16px;
          }
          
          .login-card {
            padding: 32px 24px;
            margin: 0 16px;
          }
          
          .form-input {
            padding: 14px 18px 14px 48px;
            font-size: 16px;
          }
          
          .login-button {
            padding: 14px;
            font-size: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .login-header {
            padding: 30px 16px 20px;
          }
          
          .logo-container {
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .logo-icon {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
          
          .logo-text {
            font-size: 24px;
          }
          
          .main-title {
            font-size: 28px;
          }
          
          .subtitle {
            font-size: 14px;
          }
          
          .login-card {
            padding: 24px 20px;
            border-radius: 20px;
          }
          
          .form-input {
            padding: 12px 16px 12px 44px;
          }
          
          .input-icon {
            left: 14px;
            font-size: 16px;
          }
          
          .password-toggle {
            right: 14px;
            font-size: 16px;
          }
        }
      `}</style>

      {/* Main Container */}
      <div className="login-container">
        
        {/* Header Section */}
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">
              <i className="fas fa-home"></i>
            </div>
            <div className="logo-text">Smart Village</div>
          </div>
          <h1 className="main-title">Management Portal</h1>
          <p className="subtitle">สำหรับผู้ดูแลระบบและผู้จัดการหมู่บ้าน</p>
        </div>

        {/* Main Content */}
        <div className="login-content">
          <div className="login-card">
            
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              
              {/* Username Field */}
              <div className="form-group">
                <label className="form-label">ชื่อผู้ใช้งาน</label>
                <div className="input-container">
                  <i className="fas fa-user input-icon"></i>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`form-input ${error ? 'error' : ''}`}
                    placeholder="กรุณากรอกชื่อผู้ใช้งาน"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label className="form-label">รหัสผ่าน</label>
                <div className="input-container">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-input ${error ? 'error' : ''}`}
                    placeholder="กรุณากรอกรหัสผ่าน"
                    required
                  />
                  <i 
                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>

              {/* Remember Me */}
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox"
                />
                <label htmlFor="rememberMe" className="checkbox-label">จดจำการเข้าสู่ระบบ</label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="login-button"
              >
                {isLoading && <span className="loading-spinner"></span>}
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>

              {/* Forgot Password */}
              <div className="forgot-password">
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="forgot-link"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="terms-section">
                การเข้าสู่ระบบแสดงว่าคุณยอมรับ<br />
                <button 
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="terms-link"
                >
                  เงื่อนไขการใช้งาน
                </button> และ{' '}
                <button 
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="terms-link"
                >
                  นโยบายความเป็นส่วนตัว
                </button>
              </div>

            </form>

            {/* Footer */}
            <div className="footer">
              <p>© 2025 Smart Village Management System</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popups - Same as before but with updated styling */}
      <PopupOverlay show={showForgotPassword} onClose={() => setShowForgotPassword(false)}>
        <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-key"></i>
            ลืมรหัสผ่าน
          </h3>
          <button onClick={() => setShowForgotPassword(false)} style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          <p style={{ color: '#6B7280', marginBottom: '20px' }}>กรุณากรอกอีเมลของคุณ เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้</p>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151', fontSize: '14px' }}>อีเมล</label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-envelope" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}></i>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px 12px 48px', 
                  border: '2px solid #E5E7EB', 
                  borderRadius: '12px', 
                  background: '#F9FAFB',
                  fontSize: '16px',
                  fontFamily: 'Prompt, sans-serif'
                }}
                placeholder="กรุณากรอกอีเมลของคุณ"
              />
            </div>
          </div>
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => setShowForgotPassword(false)}
            style={{ 
              padding: '12px 24px', 
              background: '#F3F4F6', 
              color: '#6B7280', 
              borderRadius: '8px', 
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Prompt, sans-serif'
            }}
          >
            ยกเลิก
          </button>
          <button 
            onClick={handleForgotPassword}
            style={{ 
              padding: '12px 24px', 
              background: '#1A2B48', 
              color: 'white', 
              borderRadius: '8px', 
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Prompt, sans-serif'
            }}
          >
            ส่งลิงก์รีเซ็ต
          </button>
        </div>
      </PopupOverlay>

      {/* Other popups remain the same structure but with consistent styling */}
      <PopupOverlay show={showResetSuccess} onClose={() => setShowResetSuccess(false)}>
        <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-check-circle"></i>
            ส่งลิงก์รีเซ็ตเรียบร้อย
          </h3>
          <button onClick={() => setShowResetSuccess(false)} style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', color: '#28A745', marginBottom: '20px' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <p style={{ color: '#6B7280' }}>เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว กรุณาตรวจสอบอีเมลและทำตามขั้นตอนที่ระบุ</p>
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => setShowResetSuccess(false)}
            style={{ 
              padding: '12px 24px', 
              background: '#28A745', 
              color: 'white', 
              borderRadius: '8px', 
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Prompt, sans-serif'
            }}
          >
            ตกลง
          </button>
        </div>
      </PopupOverlay>

      {/* Terms and Privacy popups with similar styling updates */}
      <PopupOverlay show={showTerms} onClose={() => setShowTerms(false)}>
        <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-file-contract"></i>
            เงื่อนไขการใช้งาน
          </h3>
          <button onClick={() => setShowTerms(false)} style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div style={{ padding: '24px', maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ color: '#374151', lineHeight: '1.6' }}>
            <h4 style={{ fontWeight: '600', color: '#1A2B48', marginBottom: '8px' }}>1. การยอมรับเงื่อนไข</h4>
            <p style={{ marginBottom: '16px' }}>การใช้งานระบบ Smart Village Management System แสดงว่าคุณยอมรับและตกลงที่จะปฏิบัติตามเงื่อนไขการใช้งานทั้งหมด</p>
            
            <h4 style={{ fontWeight: '600', color: '#1A2B48', marginBottom: '8px' }}>2. การใช้งานระบบ</h4>
            <p style={{ marginBottom: '16px' }}>ผู้ใช้งานต้องใช้ระบบเพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมายเท่านั้น และไม่กระทำการใดๆ ที่อาจเป็นอันตรายต่อระบบ</p>
            
            <h4 style={{ fontWeight: '600', color: '#1A2B48', marginBottom: '8px' }}>3. ความรับผิดชอบของผู้ใช้</h4>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', marginBottom: '16px' }}>
              <li>รักษาความปลอดภัยของชื่อผู้ใช้และรหัสผ่าน</li>
              <li>ไม่เปิดเผยข้อมูลส่วนตัวของผู้อื่น</li>
              <li>ใช้งานระบบด้วยความระมัดระวัง</li>
              <li>แจ้งผู้ดูแลระบบเมื่อพบปัญหาหรือข้อผิดพลาด</li>
            </ul>
          </div>
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => setShowTerms(false)}
            style={{ 
              padding: '12px 24px', 
              background: '#F3F4F6', 
              color: '#6B7280', 
              borderRadius: '8px', 
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Prompt, sans-serif'
            }}
          >
            ปิด
          </button>
          <button 
            onClick={() => setShowTerms(false)}
            style={{ 
              padding: '12px 24px', 
              background: '#28A745', 
              color: 'white', 
              borderRadius: '8px', 
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Prompt, sans-serif'
            }}
          >
            ยอมรับ
          </button>
        </div>
      </PopupOverlay>

      <PopupOverlay show={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-shield-alt"></i>
            นโยบายความเป็นส่วนตัว
          </h3>
          <button onClick={() => setShowPrivacy(false)} style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div style={{ padding: '24px', maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ color: '#374151', lineHeight: '1.6' }}>
            <h4 style={{ fontWeight: '600', color: '#1A2B48', marginBottom: '8px' }}>1. การเก็บรวบรวมข้อมูล</h4>
            <p style={{ marginBottom: '16px' }}>เราเก็บรวบรวมข้อมูลส่วนบุคคลที่จำเป็นสำหรับการให้บริการระบบจัดการหมู่บ้านอัจฉริยะเท่านั้น</p>
            
            <h4 style={{ fontWeight: '600', color: '#1A2B48', marginBottom: '8px' }}>2. ประเภทข้อมูลที่เก็บรวบรวม</h4>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', marginBottom: '16px' }}>
              <li>ข้อมูลส่วนตัว (ชื่อ, นามสกุล, อีเมล, เบอร์โทรศัพท์)</li>
              <li>ข้อมูลการใช้งานระบบ</li>
              <li>ข้อมูลการเข้าสู่ระบบ</li>
              <li>ข้อมูลทรัพย์สินและการเงิน (เฉพาะที่เกี่ยวข้อง)</li>
            </ul>
            
            <h4 style={{ fontWeight: '600', color: '#1A2B48', marginBottom: '8px' }}>3. วัตถุประสงค์การใช้ข้อมูล</h4>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', marginBottom: '16px' }}>
              <li>การให้บริการระบบจัดการหมู่บ้าน</li>
              <li>การติดต่อสื่อสารกับผู้ใช้งาน</li>
              <li>การปรับปรุงและพัฒนาระบบ</li>
              <li>การรักษาความปลอดภัยของระบบ</li>
            </ul>
          </div>
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => setShowPrivacy(false)}
            style={{ 
              padding: '12px 24px', 
              background: '#F3F4F6', 
              color: '#6B7280', 
              borderRadius: '8px', 
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Prompt, sans-serif'
            }}
          >
            ปิด
          </button>
          <button 
            onClick={() => setShowPrivacy(false)}
            style={{ 
              padding: '12px 24px', 
              background: '#28A745', 
              color: 'white', 
              borderRadius: '8px', 
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Prompt, sans-serif'
            }}
          >
            เข้าใจแล้ว
          </button>
        </div>
      </PopupOverlay>

      {/* Loading Popup */}
      <PopupOverlay show={isLoading} onClose={() => {}}>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderRadius: '50%',
            borderTopColor: '#1A2B48',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }}></div>
          <div style={{ color: '#6B7280', fontSize: '18px', fontFamily: 'Prompt, sans-serif' }}>กำลังเข้าสู่ระบบ...</div>
        </div>
      </PopupOverlay>
    </>
  );
};

export default Login;


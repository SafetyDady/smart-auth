import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import Profile from './Profile';
import UserManagement from './UserManagement';

interface User {
  username: string;
  full_name: string;
  role: string;
  email: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const showPage = (pageId: string) => {
    setActivePage(pageId);
    setUserDropdownOpen(false); // ปิด dropdown เมื่อเปลี่ยนหน้า
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = () => {
    setUserDropdownOpen(false);
    onLogout();
  };

  return (
    <div style={{ fontFamily: "'Prompt', sans-serif", background: '#F8F9FA', color: '#333', overflowX: 'hidden' }}>
      {/* Header */}
      <div style={{
        background: '#1A2B48',
        color: 'white',
        height: '70px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={toggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            ☰
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: '#28A745',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🏠
            </div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>Smart Village</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <div 
              onClick={toggleUserDropdown}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#28A745',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 600
              }}>
                SA
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{user.full_name}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{user.role}</div>
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7, transform: userDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</div>
            </div>
            
            {/* User Dropdown Menu */}
            {userDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                minWidth: '200px',
                zIndex: 1001,
                overflow: 'hidden'
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E7EB', background: '#F8F9FA' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A2B48' }}>{user.full_name}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>{user.email}</div>
                </div>
                
                {[
                  { id: 'profile', icon: '👤', text: 'Profile', action: () => showPage('profile') },
                  { id: 'edit-profile', icon: '✏️', text: 'Edit Profile', action: () => showPage('edit-profile') },
                  { id: 'change-password', icon: '🔐', text: 'Change Password', action: () => showPage('change-password') },
                  { id: 'logout', icon: '🚪', text: 'Logout', action: handleLogout }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={item.action}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                      color: '#4B5563',
                      borderBottom: item.id === 'change-password' ? '1px solid #E5E7EB' : 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{
        background: 'white',
        width: '280px',
        height: 'calc(100vh - 70px)',
        position: 'fixed',
        top: '70px',
        left: 0,
        zIndex: 999,
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        overflowY: 'auto',
        transform: sidebarCollapsed ? 'translateX(-280px)' : 'translateX(0)'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1A2B48', marginBottom: '5px' }}>
            Super Admin Panel
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>ระบบจัดการหลัก</div>
        </div>
        <div style={{ padding: '20px 0' }}>
          {[
            { id: 'dashboard', icon: '📊', text: 'Dashboard' },
            { id: 'user-management', icon: '👥', text: 'User Management' },
            { id: 'village-management', icon: '🏢', text: 'Village Management' },
            { id: 'village-admin-dashboard', icon: '👔', text: 'VillageAdmin Dashboard' },
            { id: 'village-accounting-dashboard', icon: '🧮', text: 'VillageAccounting Dashboard' },
            { id: 'monitoring-analytics', icon: '📈', text: 'Monitoring & Analytics' },
            { id: 'system-configuration', icon: '⚙️', text: 'System Configuration' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => showPage(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '12px 20px',
                color: activePage === item.id ? '#1A2B48' : '#4B5563',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                borderLeft: `3px solid ${activePage === item.id ? '#1A2B48' : 'transparent'}`,
                cursor: 'pointer',
                background: activePage === item.id ? '#EBF4FF' : 'transparent',
                fontWeight: activePage === item.id ? 500 : 'normal'
              }}
              onMouseEnter={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.background = '#F3F4F6';
                  e.currentTarget.style.color = '#1A2B48';
                  e.currentTarget.style.borderLeftColor = '#1A2B48';
                }
              }}
              onMouseLeave={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#4B5563';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }
              }}
            >
              <div style={{ width: '20px', textAlign: 'center', fontSize: '16px' }}>{item.icon}</div>
              <span style={{ fontSize: '14px' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay สำหรับปิด dropdown เมื่อคลิกข้างนอก */}
      {userDropdownOpen && (
        <div 
          onClick={() => setUserDropdownOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: 'transparent'
          }}
        />
      )}

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarCollapsed ? '0' : '280px',
        marginTop: '70px',
        padding: '30px',
        minHeight: 'calc(100vh - 70px)',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Profile Page */}
        {activePage === 'profile' && (
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#1A2B48', marginBottom: '8px' }}>
                Profile
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                ข้อมูลส่วนตัวของคุณ
              </p>
            </div>
            <Profile />
          </div>
        )}

        {/* Edit Profile Page */}
        {activePage === 'edit-profile' && (
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#1A2B48', marginBottom: '8px' }}>
                Edit Profile
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                แก้ไขข้อมูลส่วนตัวของคุณ
              </p>
            </div>
            <EditProfile />
          </div>
        )}

        {/* Change Password Page */}
        {activePage === 'change-password' && (
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#1A2B48', marginBottom: '8px' }}>
                Change Password
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                เปลี่ยนรหัสผ่านของคุณ
              </p>
            </div>
            <ChangePassword />
          </div>
        )}

        {/* User Management Page */}
        {activePage === 'user-management' && (
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#1A2B48', marginBottom: '8px' }}>
                User Management
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                จัดการผู้ใช้งานระบบ
              </p>
            </div>
            <UserManagement />
          </div>
        )}

        {/* Dashboard Page */}
        {activePage === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#1A2B48', marginBottom: '8px' }}>
                Dashboard
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                ภาพรวมระบบ Smart Village Management System
              </p>
            </div>

            {/* Dashboard Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '25px',
              marginBottom: '30px'
            }}>
              {[
                {
                  title: 'ผู้ใช้งานทั้งหมด',
                  icon: '👥',
                  color: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                  stats: [
                    { label: 'Village Admin', value: '32 คน' },
                    { label: 'Village Accounting', value: '15 คน' },
                    { label: 'รวมทั้งหมด', value: '47 คน', badge: true }
                  ]
                },
                {
                  title: 'หมู่บ้านในระบบ',
                  icon: '🏢',
                  color: 'linear-gradient(135deg, #10B981, #059669)',
                  stats: [
                    { label: 'หมู่บ้านที่ใช้งาน', value: '24 แห่ง' },
                    { label: 'ทรัพย์สินทั้งหมด', value: '2,847 หน่วย' },
                    { label: 'อัตราการใช้งาน', value: '96.2%', badge: true }
                  ]
                },
                {
                  title: 'ระบบการเงิน',
                  icon: '📊',
                  color: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                  stats: [
                    { label: 'รายได้เดือนนี้', value: '฿2.4M' },
                    { label: 'ค้างชำระ', value: '฿180K' },
                    { label: 'อัตราการชำระ', value: '92.5%', badge: true }
                  ]
                },
                {
                  title: 'ระบบรักษาความปลอดภัย',
                  icon: '🛡️',
                  color: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  stats: [
                    { label: 'การเข้า-ออกวันนี้', value: '1,247 ครั้ง' },
                    { label: 'แขกผู้มาเยือน', value: '89 คน' },
                    { label: 'สถานะระบบ', value: 'ปกติ', badge: true }
                  ]
                }
              ].map((card, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '25px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1A2B48' }}>
                      {card.title}
                    </h3>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      {card.icon}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {card.stats.map((stat, statIndex) => (
                      <div key={statIndex} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ fontSize: '14px', color: '#6B7280' }}>{stat.label}</span>
                        {stat.badge ? (
                          <span style={{
                            background: '#ECFDF5',
                            color: '#059669',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 500
                          }}>
                            {stat.value}
                          </span>
                        ) : (
                          <span style={{ fontSize: '16px', fontWeight: 600, color: '#1A2B48' }}>
                            {stat.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              marginBottom: '30px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1A2B48', marginBottom: '20px' }}>
                การดำเนินการด่วน
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                {[
                  { icon: '👤➕', text: 'เพิ่มผู้ใช้งานใหม่', page: 'user-management' },
                  { icon: '🏢➕', text: 'เพิ่มหมู่บ้านใหม่', page: 'village-management' },
                  { icon: '📊', text: 'ดูรายงานระบบ', page: 'monitoring-analytics' },
                  { icon: '⚙️', text: 'ตั้งค่าระบบ', page: 'system-configuration' }
                ].map((action, index) => (
                  <div
                    key={index}
                    onClick={() => showPage(action.page)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '15px 20px',
                      background: '#F8F9FA',
                      border: '2px solid #E5E7EB',
                      borderRadius: '12px',
                      color: '#4B5563',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1A2B48';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = '#1A2B48';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F8F9FA';
                      e.currentTarget.style.color = '#4B5563';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{action.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{action.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1A2B48', marginBottom: '20px' }}>
                กิจกรรมล่าสุด
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  {
                    icon: '👤➕',
                    color: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    text: 'เพิ่มผู้ใช้งาน Village Admin ใหม่ที่หมู่บ้าน "บ้านสวนลิลลี่"',
                    time: '5 นาทีที่แล้ว'
                  },
                  {
                    icon: '🏢',
                    color: 'linear-gradient(135deg, #10B981, #059669)',
                    text: 'อัปเดตข้อมูลหมู่บ้าน "เดอะ พาร์ค วิลเลจ" เรียบร้อยแล้ว',
                    time: '15 นาทีที่แล้ว'
                  },
                  {
                    icon: '📈',
                    color: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                    text: 'สร้างรายงานการเงินประจำเดือนเสร็จสิ้น',
                    time: '1 ชั่วโมงที่แล้ว'
                  },
                  {
                    icon: '🛡️',
                    color: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    text: 'ระบบรักษาความปลอดภัยทำการอัปเดตอัตโนมัติ',
                    time: '2 ชั่วโมงที่แล้ว'
                  }
                ].map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '15px',
                      background: '#F8F9FA',
                      borderRadius: '12px',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#F8F9FA'}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: activity.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}>
                      {activity.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', color: '#1A2B48', marginBottom: '4px' }}>
                        {activity.text}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other Pages */}
        {!['dashboard', 'profile', 'edit-profile', 'change-password'].includes(activePage) && (
          <div>
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#1A2B48', marginBottom: '8px' }}>
                {activePage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                หน้านี้อยู่ระหว่างการพัฒนา
              </p>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#1A2B48', marginBottom: '10px' }}>
                อยู่ระหว่างการพัฒนา
              </h3>
              <p style={{ fontSize: '16px', color: '#6B7280' }}>
                หน้านี้จะเปิดใช้งานในเร็วๆ นี้
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


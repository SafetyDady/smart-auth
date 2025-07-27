import React, { useState } from 'react';
import UserMenu from './UserMenu';

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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarStyle: React.CSSProperties = {
    transform: sidebarCollapsed ? 'translateX(-100%)' : 'translateX(0)',
  };

  const mainContentStyle: React.CSSProperties = {
    marginLeft: sidebarCollapsed ? '0' : '280px',
  };

  return (
    <div style={{ fontFamily: "'Prompt', sans-serif", background: '#F8F9FA', color: '#333', overflowX: 'hidden' }}>
      {/* Header */}
      <header style={{
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
            <i className="fas fa-bars"></i>
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
              <i className="fas fa-home"></i>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 600 }}>Smart Village</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </header>

      {/* Sidebar */}
      <aside style={{
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
        ...sidebarStyle
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB' }}>
          <h3 style={{ color: '#1A2B48', fontSize: '18px', fontWeight: 600, marginBottom: '5px' }}>
            Super Admin Panel
          </h3>
          <p style={{ color: '#6B7280', fontSize: '12px' }}>ระบบจัดการหมู่บ้าน</p>
        </div>
        
        <nav style={{ padding: '20px 0' }}>
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '15px 20px',
            color: '#1A2B48',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            background: '#EBF4FF',
            borderLeft: '3px solid #1A2B48'
          }}>
            <i className="fas fa-chart-bar" style={{ width: '20px', textAlign: 'center' }}></i>
            <span>Dashboard</span>
          </a>
          
          {[
            { icon: 'fas fa-users', text: 'User Management' },
            { icon: 'fas fa-building', text: 'Village Management' },
            { icon: 'fas fa-user-shield', text: 'VillageAdmin Dashboard' },
            { icon: 'fas fa-calculator', text: 'VillageAccounting Dashboard' },
            { icon: 'fas fa-chart-line', text: 'Monitoring & Analytics' },
            { icon: 'fas fa-cogs', text: 'System Configuration' }
          ].map((item, index) => (
            <a key={index} href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px 20px',
              color: '#6B7280',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              borderLeft: '3px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1A2B48';
              e.currentTarget.style.background = '#F3F4F6';
              e.currentTarget.style.borderLeftColor = '#1A2B48';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6B7280';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderLeftColor = 'transparent';
            }}>
              <i className={item.icon} style={{ width: '20px', textAlign: 'center' }}></i>
              <span>{item.text}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        marginTop: '70px',
        padding: '30px',
        minHeight: 'calc(100vh - 70px)',
        transition: 'margin-left 0.3s ease',
        ...mainContentStyle
      }}>
        {/* Page Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 600, color: '#1A2B48', marginBottom: '8px' }}>
            Dashboard
          </h1>
          <p style={{ color: '#6B7280' }}>ภาพรวมระบบ Smart Village Management System</p>
        </div>

        {/* Dashboard Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '25px',
          marginBottom: '30px'
        }}>
          {/* Card 1: ผู้ใช้งานทั้งหมด */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1A2B48', margin: 0 }}>
                ผู้ใช้งานทั้งหมด
              </h3>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white'
              }}>
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Village Admin</span>
                <span style={{ fontWeight: 600, color: '#1A2B48' }}>32 คน</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Village Accounting</span>
                <span style={{ fontWeight: 600, color: '#1A2B48' }}>15 คน</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #E5E7EB'
              }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>รวมทั้งหมด</span>
                <span style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 500
                }}>47 คน</span>
              </div>
            </div>
          </div>

          {/* Card 2: หมู่บ้านในระบบ */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1A2B48', margin: 0 }}>
                หมู่บ้านในระบบ
              </h3>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #28A745, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white'
              }}>
                <i className="fas fa-building"></i>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>หมู่บ้านที่ลงทะเบียน</span>
                <span style={{ fontWeight: 600, color: '#1A2B48' }}>24 แห่ง</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>ทรัพย์สินทั้งหมด</span>
                <span style={{ fontWeight: 600, color: '#1A2B48' }}>2,847 หน่วย</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #E5E7EB'
              }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>อัตราการใช้งาน</span>
                <span style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 500
                }}>96.2%</span>
              </div>
            </div>
          </div>

          {/* Card 3: ระบบการเงิน */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1A2B48', margin: 0 }}>
                ระบบการเงิน
              </h3>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white'
              }}>
                <i className="fas fa-chart-pie"></i>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>รายได้เดือนนี้</span>
                <span style={{ fontWeight: 600, color: '#1A2B48' }}>฿2.4M</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>ค้างชำระ</span>
                <span style={{ fontWeight: 600, color: '#1A2B48' }}>฿180K</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #E5E7EB'
              }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>อัตราการชำระ</span>
                <span style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 500
                }}>92.5%</span>
              </div>
            </div>
          </div>

          {/* Card 4: ระบบรักษาความปลอดภัย */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1A2B48', margin: 0 }}>
                ระบบรักษาความปลอดภัย
              </h3>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white'
              }}>
                <i className="fas fa-shield-alt"></i>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>การเข้า-ออกวันนี้</span>
                <span style={{ fontWeight: 600, color: '#1A2B48' }}>1,247 ครั้ง</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>แขกผู้มาเยือน</span>
                <span style={{ fontWeight: 600, color: '#1A2B48' }}>89 คน</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #E5E7EB'
              }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>สถานะระบบ</span>
                <span style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 500
                }}>ปกติ</span>
              </div>
            </div>
          </div>
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
            gap: '16px' 
          }}>
            {[
              { icon: 'fas fa-user-plus', text: 'เพิ่มผู้ใช้งานใหม่' },
              { icon: 'fas fa-building', text: 'เพิ่มหมู่บ้านใหม่' },
              { icon: 'fas fa-chart-bar', text: 'ดูรายงานระบบ' },
              { icon: 'fas fa-cogs', text: 'ตั้งค่าระบบ' }
            ].map((action, index) => (
              <button key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#F8F9FA',
                color: '#4B5563',
                border: '2px solid #E5E7EB',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                transform: 'translateY(0)'
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
              }}>
                <i className={action.icon} style={{ fontSize: '18px' }}></i>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{action.text}</span>
              </button>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { 
                icon: 'fas fa-user', 
                iconColor: '#28A745',
                text: 'เพิ่มผู้ใช้งาน Village Admin ใหม่ที่หมู่บ้าน "บ้านสวนลิลลี่"',
                time: '5 นาทีที่แล้ว'
              },
              { 
                icon: 'fas fa-building', 
                iconColor: '#28A745',
                text: 'อัปเดตข้อมูลหมู่บ้าน "เดอะ พาร์ค วิลเลจ" เรียบร้อยแล้ว',
                time: '15 นาทีที่แล้ว'
              },
              { 
                icon: 'fas fa-chart-line', 
                iconColor: '#8B5CF6',
                text: 'สร้างรายงานการเงินประจำเดือนสำเร็จแล้ว',
                time: '1 ชั่วโมงที่แล้ว'
              }
            ].map((activity, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '12px',
                background: '#F8F9FA'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: activity.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  <i className={activity.icon}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1A2B48' }}>
                    {activity.text}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

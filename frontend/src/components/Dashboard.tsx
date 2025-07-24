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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-green-900 text-white flex items-center justify-between px-6 shadow">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl p-2 bg-transparent rounded hover:bg-green-800 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white text-green-900 w-8 h-8 rounded flex items-center justify-center text-base font-bold shadow-sm">
              🏠
            </div>
            <span className="text-lg font-semibold tracking-wide">Smart Village</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ${sidebarCollapsed ? '-translate-x-64' : 'translate-x-0'}`}
      >
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 text-lg mb-0">Super Admin Panel</h3>
          <p className="text-xs text-gray-500 mt-1">ระบบจัดการหมู่บ้าน</p>
        </div>
        <nav className="py-2 flex flex-col gap-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-blue-900 bg-blue-100 border-r-4 border-blue-500 font-medium text-sm rounded-r transition-colors">
            <span className="w-4 text-center">📊</span>
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-blue-700 hover:bg-blue-50 text-sm rounded-r transition-colors">
            <span className="w-4 text-center">👥</span>
            <span>User Management</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-blue-700 hover:bg-blue-50 text-sm rounded-r transition-colors">
            <span className="w-4 text-center">📍</span>
            <span>Village Management</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-blue-700 hover:bg-blue-50 text-sm rounded-r transition-colors">
            <span className="w-4 text-center">🛡️</span>
            <span>VillageAdmin Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-blue-700 hover:bg-blue-50 text-sm rounded-r transition-colors">
            <span className="w-4 text-center">🧮</span>
            <span>VillageAccounting Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-blue-700 hover:bg-blue-50 text-sm rounded-r transition-colors">
            <span className="w-4 text-center">📈</span>
            <span>Monitoring & Analytics</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-blue-700 hover:bg-blue-50 text-sm rounded-r transition-colors">
            <span className="w-4 text-center">⚙️</span>
            <span>System Configuration</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-16 pb-6 px-6 min-h-[calc(100vh-4rem)] ${sidebarCollapsed ? 'ml-0' : 'ml-64'}`}
      >
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
          <p className="text-gray-500">ภาพรวมระบบ Smart Village Management System</p>
        </div>

        {/* Dashboard Cards - 4 Cards แนวนอน */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* ผู้ใช้งานทั้งหมด */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: 0 }}>ผู้ใช้งานทั้งหมด</h3>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#3b82f6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                👥
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Village Admin</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>32 คน</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Village Accounting</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>15 คน</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>รวมทั้งหมด</span>
                <span style={{ fontWeight: 'bold', color: '#059669' }}>47 คน</span>
              </div>
            </div>
          </div>

          {/* หมู่บ้านในระบบ */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: 0 }}>หมู่บ้านในระบบ</h3>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#10b981',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🏠
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>หมู่บ้านที่ลงทะเบียน</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>24 แห่ง</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>ทรัพย์สินทั้งหมด</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>2,847 หน่วย</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>อัตราการใช้งาน</span>
                <span style={{ fontWeight: 'bold', color: '#059669' }}>96.2%</span>
              </div>
            </div>
          </div>

          {/* ระบบการเงิน */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: 0 }}>ระบบการเงิน</h3>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#8b5cf6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                📈
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>รายได้เดือนนี้</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>฿2.4M</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>ค่าใช้จ่าย</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>฿180K</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>อัตราการออม</span>
                <span style={{ fontWeight: 'bold', color: '#059669' }}>92.5%</span>
              </div>
            </div>
          </div>

          {/* ระบบรักษาความปลอดภัย */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: 0 }}>ระบบรักษาความปลอดภัย</h3>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#f59e0b',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🛡️
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>การเข้า-ออกวันนี้</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>1,247 ครั้ง</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>แขกที่มาเยือน</span>
                <span style={{ fontWeight: '600', color: '#374151' }}>89 คน</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>สถานะระบบ</span>
                <span style={{ fontWeight: 'bold', color: '#059669' }}>ปกติ</span>
              </div>
            </div>
          </div>
        </div>

        {/* การดำเนินการด่วน */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          marginBottom: '32px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>การดำเนินการด่วน</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              <span style={{ color: '#6b7280' }}>👤</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>เพิ่มผู้ใช้งานใหม่</span>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              <span style={{ color: '#6b7280' }}>➕</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>เพิ่มหมู่บ้านใหม่</span>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              <span style={{ color: '#6b7280' }}>📄</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>ดูรายงานระบบ</span>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              <span style={{ color: '#6b7280' }}>⚙️</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>ตั้งค่าระบบ</span>
            </button>
          </div>
        </div>

        {/* กิจกรรมล่าสุด */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>กิจกรรมล่าสุด</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                👤
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', margin: 0 }}>เพิ่มผู้ใช้งาน Village Admin ใหม่ที่หมู่บ้าน "บ้านสวนดอก"</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>5 นาทีที่แล้ว</p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                🏠
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', margin: 0 }}>อัปเดตข้อมูลหมู่บ้าน "บ้าน หรือ วิลล์ วิลเลจ" เรียบร้อยแล้ว</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>15 นาทีที่แล้ว</p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#f3e8ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                📊
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', margin: 0 }}>สร้างรายงานการเงินประจำเดือนสำเร็จแล้ว</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>1 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


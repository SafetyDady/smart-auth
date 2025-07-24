# 🏠 Smart Village Management System

ระบบจัดการหมู่บ้านอัจฉริยะ พร้อมระบบรักษาความปลอดภัยและการจัดการผู้ใช้งาน

## ✨ Features

### 🔐 Authentication System
- **Login/Logout** - ระบบเข้าสู่ระบบที่ปลอดภัย
- **JWT Token** - การรักษาความปลอดภัยด้วย JWT
- **Role-based Access** - การจัดการสิทธิ์ตามบทบาท (Super Admin, Village Admin, Village Accounting)

### 👤 User Management
- **Profile Management** - จัดการข้อมูลส่วนตัว
- **Change Password** - เปลี่ยนรหัสผ่าน
- **Edit Profile** - แก้ไขข้อมูลโปรไฟล์

### 📊 Super Admin Dashboard
- **Dashboard Overview** - ภาพรวมของระบบ
- **User Statistics** - สถิติผู้ใช้งาน
- **Village Management** - จัดการหมู่บ้าน
- **Financial System** - ระบบการเงิน
- **Security Monitoring** - ติดตามความปลอดภัย

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM สำหรับฐานข้อมูล
- **SQLite** - ฐานข้อมูล
- **JWT** - JSON Web Tokens
- **Bcrypt** - การเข้ารหัสรหัสผ่าน

### Frontend
- **React 18** - JavaScript library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool
- **React Router** - Client-side routing

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm หรือ yarn

### Backend Setup
```bash
cd backend

# สร้าง virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# ติดตั้ง dependencies
pip install -r requirements.txt
# หรือใช้ poetry
poetry install

# รัน backend server
uvicorn src.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend

# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev
```

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - เข้าสู่ระบบ
- `GET /api/v1/auth/me` - ดูข้อมูลผู้ใช้ปัจจุบัน
- `POST /api/v1/auth/change-password` - เปลี่ยนรหัสผ่าน

## 🔑 Default Users

### Super Admin
- **Username:** `superadmin`
- **Password:** `123456`
- **Role:** Super Admin

### Village Admin (ตัวอย่าง)
- **Username:** `villageadmin`
- **Password:** `village123`
- **Role:** Village Admin

## 🗂️ Project Structure

```
smart-village-auth/
├── backend/                 # FastAPI backend
│   ├── src/
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication logic
│   │   ├── models/         # Database models
│   │   └── main.py         # FastAPI app
│   ├── poetry.lock
│   └── pyproject.toml
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── 07_SystemDesign/        # Design documents
```

## 🎨 UI/UX Design

- **Modern Dashboard** - ออกแบบ Dashboard ที่ทันสมัย
- **Responsive Design** - รองรับทุกอุปกรณ์
- **Tailwind CSS** - ใช้ Utility-first CSS
- **Thai Language Support** - รองรับภาษาไทย

## 📱 Screenshots

### Login Page
- หน้าเข้าสู่ระบบที่สวยงาม
- รองรับการจดจำการเข้าสู่ระบบ
- ระบบลืมรหัสผ่าน

### Dashboard
- ภาพรวมของระบบ
- การ์ดสถิติต่างๆ
- เมนูการดำเนินการด่วน
- กิจกรรมล่าสุด

## 🔒 Security Features

- **JWT Authentication** - รักษาความปลอดภัยด้วย JWT
- **Password Hashing** - เข้ารหัสรหัสผ่านด้วย bcrypt
- **Role-based Access Control** - จัดการสิทธิ์ตามบทบาท
- **Session Management** - จัดการเซสชันผู้ใช้

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**SafetyDady**
- GitHub: [@SafetyDady](https://github.com/SafetyDady)

## 🙏 Acknowledgments

- FastAPI team for the amazing framework
- React team for the powerful library
- Tailwind CSS team for the utility-first CSS framework

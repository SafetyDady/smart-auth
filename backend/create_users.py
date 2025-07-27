#!/usr/bin/env python3
"""
Script to create test users for Smart Village Auth System
"""

from src.database import SessionLocal, engine, Base
from src.models.user import User, UserRole
from src.auth.auth import get_password_hash

def create_database():
    """Create database tables"""
    Base.metadata.create_all(bind=engine)
    print("Database tables created!")

def create_test_users():
    """Create test users"""
    db = SessionLocal()
    
    try:
        # ลบ users เก่า (ถ้ามี)
        db.query(User).delete()
        
        # สร้าง users ใหม่
        users = [
            User(
                username='superadmin', 
                email='super@test.com', 
                hashed_password=get_password_hash('123456'), 
                full_name='Super Admin', 
                role=UserRole.SUPER_ADMIN, 
                is_active=True
            ),
            User(
                username='villageadmin', 
                email='village@test.com', 
                hashed_password=get_password_hash('123456'), 
                full_name='Village Admin', 
                role=UserRole.VILLAGE_ADMIN, 
                is_active=True
            ),
            User(
                username='accounting', 
                email='accounting@test.com', 
                hashed_password=get_password_hash('123456'), 
                full_name='Village Accounting', 
                role=UserRole.VILLAGE_ACCOUNTING, 
                is_active=True
            ),
            User(
                username='testuser1', 
                email='test1@example.com', 
                hashed_password=get_password_hash('123456'), 
                full_name='Test User 1', 
                role=UserRole.VILLAGE_ACCOUNTING, 
                is_active=True
            ),
            User(
                username='testuser2', 
                email='test2@example.com', 
                hashed_password=get_password_hash('123456'), 
                full_name='Test User 2', 
                role=UserRole.VILLAGE_ADMIN, 
                is_active=False
            ),
            User(
                username='johndoe', 
                email='john@example.com', 
                hashed_password=get_password_hash('123456'), 
                full_name='John Doe', 
                role=UserRole.VILLAGE_ACCOUNTING, 
                is_active=True
            )
        ]
        
        for user in users:
            db.add(user)
        db.commit()
        print("Test users created successfully!")
        
        # ตรวจสอบ users ที่สร้าง
        users = db.query(User).all()
        print("\nCreated users:")
        for user in users:
            print(f"- Username: {user.username}, Role: {user.role.value}, Full Name: {user.full_name}")
            
    except Exception as e:
        print(f"Error creating users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Creating Smart Village Auth Database...")
    create_database()
    create_test_users()
    print("Setup completed!")


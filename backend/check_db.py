import sqlite3

# เชื่อมต่อ Database
conn = sqlite3.connect('smart_village.db')
cursor = conn.cursor()

# ดูโครงสร้างตาราง
cursor.execute("SELECT sql FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()

print("=== Database Structure ===")
for table in tables:
    print(f"Table:\n{table[0]}\n")

# ดูข้อมูลผู้ใช้
cursor.execute("SELECT id, username, full_name, email, role, is_active, created_at FROM users")
users = cursor.fetchall()

print("=== User Data ===")
print(f"Total users: {len(users)}")
for user in users:
    print(f"ID: {user[0]}, Username: {user[1]}, Name: {user[2]}, Email: {user[3]}, Role: {user[4]}, Active: {user[5]}, Created: {user[6]}")

conn.close()

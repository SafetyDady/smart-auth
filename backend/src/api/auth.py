from fastapi import APIRouter, Depends, HTTPException, status, Body, Query
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List, Optional
from ..database import get_db
from ..models.user import User, UserRole
from ..auth.auth import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/auth", tags=["authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # ตรวจสอบ user ในฐานข้อมูล
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role.value, "full_name": user.full_name},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "username": user.username,
            "full_name": user.full_name,
            "role": user.role.value,
            "email": user.email
        }
    }

@router.get("/me")
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    from ..auth.auth import verify_token
    username = verify_token(token)
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "username": user.username,
        "full_name": user.full_name,
        "role": user.role.value,
        "email": user.email
    }


# เพิ่ม endpoint สำหรับเปลี่ยนรหัสผ่าน
from fastapi import Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

security = HTTPBearer()

@router.post("/change-password")
async def change_password(
    old_password: str = Body(...),
    new_password: str = Body(...),
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):
    from ..auth.auth import verify_token
    username = verify_token(credentials.credentials)
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_password(old_password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    user.hashed_password = get_password_hash(new_password)
    db.commit()
    return {"msg": "Password changed successfully"}

@router.put("/profile")
async def update_profile(
    full_name: str = Body(...),
    email: str = Body(...),
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):
    from ..auth.auth import verify_token
    username = verify_token(credentials.credentials)
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # ตรวจสอบ email ซ้ำ
    existing_user = db.query(User).filter(User.email == email, User.username != username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    user.full_name = full_name
    user.email = email
    db.commit()
    
    return {
        "msg": "Profile updated successfully",
        "user": {
            "username": user.username,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role.value
        }
    }

# Helper function to check if user is admin
def check_admin_permission(token: str, db: Session):
    from ..auth.auth import verify_token
    username = verify_token(token)
    user = db.query(User).filter(User.username == username).first()
    if not user or user.role not in [UserRole.SUPER_ADMIN, UserRole.VILLAGE_ADMIN]:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# User Management APIs
@router.get("/users")
async def get_all_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=100),
    search: Optional[str] = Query(None),
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):
    admin_user = check_admin_permission(credentials.credentials, db)
    
    query = db.query(User)
    
    # Search filter
    if search:
        query = query.filter(
            (User.username.contains(search)) |
            (User.full_name.contains(search)) |
            (User.email.contains(search))
        )
    
    total = query.count()
    users = query.offset(skip).limit(limit).all()
    
    return {
        "users": [
            {
                "id": user.id,
                "username": user.username,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role.value,
                "is_active": user.is_active,
                "created_at": user.created_at.isoformat() if user.created_at else None
            }
            for user in users
        ],
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.post("/users")
async def create_user(
    username: str = Body(...),
    full_name: str = Body(...),
    email: str = Body(...),
    password: str = Body(...),
    role: str = Body(...),
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):
    admin_user = check_admin_permission(credentials.credentials, db)
    
    # Validate role
    try:
        user_role = UserRole(role)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid role")
    
    # Check if username exists
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Check if email exists
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Create new user
    hashed_password = get_password_hash(password)
    new_user = User(
        username=username,
        full_name=full_name,
        email=email,
        hashed_password=hashed_password,
        role=user_role,
        is_active=True
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "msg": "User created successfully",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "role": new_user.role.value,
            "is_active": new_user.is_active
        }
    }

@router.put("/users/{user_id}")
async def update_user(
    user_id: int,
    full_name: str = Body(...),
    email: str = Body(...),
    role: str = Body(...),
    is_active: bool = Body(...),
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):
    admin_user = check_admin_permission(credentials.credentials, db)
    
    # Get user to update
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Validate role
    try:
        user_role = UserRole(role)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid role")
    
    # Check if email exists (exclude current user)
    existing_user = db.query(User).filter(User.email == email, User.id != user_id).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Update user
    user.full_name = full_name
    user.email = email
    user.role = user_role
    user.is_active = is_active
    
    db.commit()
    
    return {
        "msg": "User updated successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role.value,
            "is_active": user.is_active
        }
    }

@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):
    admin_user = check_admin_permission(credentials.credentials, db)
    
    # Get user to delete
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Prevent deleting yourself
    if user.username == admin_user.username:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")
    
    db.delete(user)
    db.commit()
    
    return {"msg": "User deleted successfully"}

@router.post("/users/{user_id}/reset-password")
async def reset_user_password(
    user_id: int,
    new_password: str = Body(...),
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):
    admin_user = check_admin_permission(credentials.credentials, db)
    
    # Get user
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update password
    user.hashed_password = get_password_hash(new_password)
    db.commit()
    
    return {"msg": "Password reset successfully"}

# 🎯 Simple Task for Manus

## What You Need to Do:
**Fix the ugly Dashboard UI to make it beautiful like the design file**

## Files to Change:
1. `frontend/src/components/Dashboard.tsx` - **This is the main file that's ugly**
2. Look at `07_SystemDesign/UI/02_SuperAdmin/super_admin_dashboard.html` - **This is how it should look**

## Login to Test:
```
URL: http://localhost:5173
Username: superadmin
Password: 123456
```

## Main Problem:
The Dashboard.tsx file has **MESSY CODE** like this:
```tsx
// This is BAD and ugly:
onMouseEnter={(e) => {
  e.currentTarget.style.background = '#1A2B48';
}}
style={{ background: '#F8F9FA' }}
```

## What We Want:
```tsx
// This is GOOD and clean:
className="dashboard-card hover:bg-navy hover:-translate-y-2"
```

## Colors to Use:
- Main color: `#1A2B48` (dark blue)
- Cards: white with shadows
- Icons: gradients (blue, green, purple, orange)

## Simple Steps:
1. **Remove all `style={{}}` and `onMouseEnter/onMouseLeave`**
2. **Use only Tailwind CSS classes**
3. **Make it look like the design file**
4. **Keep the login/logout working**

## That's It!
Don't overthink it. Just make the Dashboard pretty! 🎨

# ⚡ Quick Start Checklist - Authentication System

## Pre-Flight Check (Do This First!)

### Backend Prerequisites
- [ ] Navigate to `backend` folder
- [ ] Check `.env` file exists with:
  - [ ] `MONGO_URL=` your MongoDB connection string
  - [ ] `TOKEN_KEY=your_super_secret_jwt_key_2024`
  - [ ] `PORT=3000`

### Frontend Prerequisites  
- [ ] Navigate to `dashboard` folder
- [ ] `package.json` has these dependencies:
  - [ ] `"react-cookie": "^4.1.1"`
  - [ ] `"react-toastify": "^10.0.3"`
  - [ ] `"axios": "^1.13.4"`
  - [ ] `"react-router-dom": "^7.13.0"`

---

## Installation Steps

### Step 1: Backend Setup
```bash
cd backend
npm install
```
✅ Wait for installation to complete

### Step 2: Frontend Setup
```bash
cd dashboard
npm install
```
✅ Wait for installation to complete

---

## Running the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm start
```

Expected output:
```
✅ Connected to MongoDB
✅ Server running on http://localhost:3000
✅ Routes registered: /signup, /login, /verify
```

### Terminal 2 - Start Frontend
```bash
cd dashboard
npm start
```

Expected output:
```
✅ Compiled successfully
✅ Local: http://localhost:3000
✅ Browser opens automatically
```

---

## Testing the Authentication System

### Test 1: Signup Flow ✅
1. App opens → See Login page
2. Click "Sign Up" button
3. Fill form:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
4. Click "Sign Up"
5. ✅ See toast: "User SignUp Successful"
6. ✅ Auto-redirected to Dashboard
7. ✅ See Holdings, Orders, Positions

### Test 2: Logout Flow ✅
1. Click profile avatar (top-right) - Should show "ZU" avatar
2. Click "Logout" button
3. ✅ See toast: "Logged out successfully"
4. ✅ Redirected to Login page

### Test 3: Login Flow ✅
1. On Login page
2. Fill form:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Login"
4. ✅ See toast: "User Login Successful"
5. ✅ Redirected to Dashboard
6. ✅ Token verified automatically

### Test 4: Session Persistence ✅
1. Logged in on Dashboard
2. Press F5 (Page Refresh)
3. ✅ Home.js verifies token with /verify endpoint
4. ✅ Stays on Dashboard (no redirect)
5. ✅ Holdings and data still visible

### Test 5: Protected Routes ✅
1. Logout from Dashboard
2. Open DevTools (F12) → Console tab
3. Manually navigate to dashboard:
   ```javascript
   window.location.href = 'http://localhost:3000/dashboard'
   ```
4. ✅ Immediately redirects back to /login
5. ✅ Cannot access dashboard without token

### Test 6: Token Verification ✅
1. Logged in on Dashboard
2. Open DevTools (F12) → Application → Cookies
3. Delete "token" cookie
4. Press F5 (Refresh page)
5. ✅ /verify endpoint detects missing token
6. ✅ Redirected to /login

---

## Verifying Backend Integration

### Check Database Users
1. Login to MongoDB Atlas (your cluster)
2. Navigate to your database
3. Check `users` collection
4. ✅ Should see created user documents

### Check API Endpoints

Open Postman or Terminal and test:

```bash
# Test Signup
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com","username":"testuser2","password":"password123"}'

# Test Login  
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test Verify (with token cookie)
curl -X POST http://localhost:3000/verify \
  -H "Cookie: token=YOUR_TOKEN_HERE"
```

---

## Troubleshooting Guide

### ❌ "Cannot connect to localhost:3000"
**Solution:**
- [ ] Ensure backend is running (`npm start` in backend folder)
- [ ] Check port 3000 is not blocked
- [ ] Try accessing `http://localhost:3000` directly in browser

### ❌ "MONGO_URL is undefined"
**Solution:**
- [ ] Open `backend/.env`
- [ ] Add/verify: `MONGO_URL=mongodb+srv://...`
- [ ] Restart backend server

### ❌ "TOKEN_KEY is undefined"
**Solution:**
- [ ] Open `backend/.env`
- [ ] Add/verify: `TOKEN_KEY=your_super_secret_jwt_key_2024`
- [ ] Restart backend server

### ❌ "Wrong password error after signup"
**Solution:**
- [ ] Check browser console for errors
- [ ] Verify MongoDB is connected
- [ ] Check bcryptjs is installed: `npm list bcryptjs`

### ❌ "Cannot find module 'cookie-parser'"
**Solution:**
- [ ] In backend folder: `npm install cookie-parser`
- [ ] Restart backend

### ❌ "Cookies not saving"
**Solution:**
- [ ] Check frontend sends `{ withCredentials: true }` with axios
- [ ] Check backend CORS has `credentials: true`
- [ ] Check backend sends Set-Cookie header

### ❌ "Always redirects to login"
**Solution:**
- [ ] Check /verify endpoint is working
- [ ] Open DevTools → Network tab
- [ ] Check /verify POST request response
- [ ] Should return `{ status: true }` for valid token

### ❌ "Logout button not appearing"
**Solution:**
- [ ] Check Menu.js imports useCookies from react-cookie
- [ ] Check profile-dropdown CSS in index.css
- [ ] Try clicking profile avatar to toggle dropdown

---

## Performance Check

### Frontend Performance
```
✅ Page loads in < 3 seconds
✅ Token verification < 500ms
✅ No console errors
✅ React DevTools shows no unnecessary re-renders
```

### Backend Performance
```
✅ /login responds in < 200ms
✅ /signup responds in < 300ms (bcrypt hashing takes time)
✅ /verify responds in < 100ms
✅ MongoDB connection established
```

---

## Security Validation

### Check These Security Features
- [ ] Passwords are hashed (NOT stored in plain text)
  - Verify in MongoDB: user.password is long random string
- [ ] Tokens have expiry (3 days)
  - Check in SecretToken.js: `expiresIn: 3 * 24 * 60 * 60`
- [ ] CORS is restricted
  - Check in backend index.js: `origin: ["http://localhost:3000"]`
- [ ] Tokens in cookies
  - Check DevTools: Application → Cookies
- [ ] Protected routes exist
  - Cannot access /dashboard without token

---

## Multi-User Testing

### Test with 2 Different Users

**User 1:**
1. Signup: email1@test.com / user1 / pass123
2. Dashboard shows holdings for User 1
3. Buy stock: AAPL 100 shares
4. Verify in Holdings

**User 2:**
1. Logout User 1
2. Signup: email2@test.com / user2 / pass123
3. Dashboard shows EMPTY holdings (User 2 has none)
4. Buy different stock
5. Verify User 2's holdings are separate

**Switch back to User 1:**
1. Logout User 2
2. Login with User 1 credentials
3. ✅ See User 1's original holdings (AAPL 100)
4. ✅ User 2's data not visible

---

## Debugging Tips

### Enable Console Logging
Add to Home.js:
```javascript
useEffect(() => {
  console.log("Home mounted, checking token...");
  const verifyToken = async () => {
    try {
      console.log("Verifying token...");
      const { data } = await axios.post(
        "http://localhost:3000/verify",
        {},
        { withCredentials: true }
      );
      console.log("Verification response:", data);
      setIsAuthenticated(data.status);
    } catch (error) {
      console.error("Verification error:", error);
      navigate("/login");
    }
  };
  verifyToken();
}, []);
```

### Check Network Requests
1. DevTools → Network tab
2. Fill login form
3. Click Login
4. Look for:
   - [ ] POST /login request (should be 200 OK)
   - [ ] Response should have token in Set-Cookie
   - [ ] Redirect to /dashboard

### Check Cookies
1. DevTools → Application tab
2. Click Cookies → http://localhost:3000
3. Should see:
   - [ ] Name: `token`
   - [ ] Value: `eyJhbGciOi...` (long JWT string)
   - [ ] Expires: 3 days from now

---

## Next Steps After Testing

1. **Change TOKEN_KEY**: Replace with strong secret
   ```env
   TOKEN_KEY=MY_SUPER_SECRET_KEY_MIN_32_CHARACTERS_LONG
   ```

2. **Add Error Boundaries**: Prevent white screen crashes

3. **Implement Refresh Tokens**: For better security (optional)

4. **Add Email Verification**: For new signups (optional)

5. **Add Password Reset**: For forgotten passwords (optional)

6. **Enable HTTPS**: Before production deployment

---

## Final Verification Checklist

- [ ] Backend running on port 3000
- [ ] Frontend running on port 3000 (dev server)
- [ ] MongoDB connection established
- [ ] Signup flow works
- [ ] Login flow works
- [ ] Logout flow works
- [ ] Token verification works
- [ ] Page refresh maintains session
- [ ] Protected routes work
- [ ] No console errors
- [ ] Holdings/Orders visible after login
- [ ] Multiple users work independently

---

## 🎉 Ready to Go!

Once all checks pass, your authentication system is fully operational! 

```
✅ Users can register
✅ Users can login
✅ Users can logout
✅ Users cannot access dashboard without token
✅ Each user has isolated data
✅ Sessions persist across page refreshes
```

**Happy Trading! 📈**

---

## Getting Help

If something doesn't work:

1. **Check browser console** (F12)
   - Look for red error messages
   - Check Network tab for failed requests

2. **Check backend terminal**
   - Look for error messages
   - Verify "Connected to MongoDB"

3. **Verify .env file**
   - `MONGO_URL` is correct
   - `TOKEN_KEY` exists
   - `PORT=3000`

4. **Check dependencies**
   - Run `npm install` in both backend and dashboard

5. **Restart servers**
   - Stop both servers (Ctrl+C)
   - Start backend first
   - Start frontend second

6. **Clear browser cache**
   - DevTools → Application → Clear site data
   - Refresh page

**If all else fails, restart your computer and try again! 💻**

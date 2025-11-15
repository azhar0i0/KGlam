# 🌟 KGlam — Modern Salon Management System  
A complete, intuitive, and powerful solution for managing single or multi-branch salon businesses.

KGlam brings together salon operations, customer management, analytics, and user control into one elegant and fast dashboard. Built with modern technologies, KGlam helps salon owners track growth, streamline daily operations, and make better decisions — all in real time.

---

## 🚀 Core Highlights

### 🔐 User Authentication
- Secure sign-in for admin users.
- “Forgot Password” workflow with email recovery.
- Clean and modern login interface.

### 📊 Interactive Dashboard
- Real-time counters for:
  - Total Salons  
  - Total Customers  
  - Active Users  
- Dynamic activity graphs with range filters:
  - Weekly  
  - Monthly  
  - Last 6 Months  
  - Lifetime  
- Beautiful charts powered by Chart.js.

### 💇‍♀️ Salon Management
- View and modify salon profiles.
- Toggle Active/Deactivated status instantly.
- Fast, optimized salon search.
- Built-in pagination for easy browsing.
- Clean UI built for efficiency.

### 👩‍💼 Customer Management
- Manage customer records, roles, and statuses.
- Toggle Active/Deactivated state.
- Search by name, role, or email.
- Fast, responsive list view.

### 👤 Profile Management
- Update profile details (username, email).
- Change password with validation rules.
- Toast notifications for feedback.
- Secure and smooth UX.

### 📱 Fully Responsive
Designed with mobile-first principles.  
Whether you're on mobile, tablet, or desktop, KGlam stays elegant and functional.

---

## 🧰 Tech Stack

| Category | Technology |
|---------|------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Charts | Chart.js |
| Icons | Lucide React, Heroicons |
| State | React Hooks (useState, useMemo, useEffect) |
| Notifications | Custom Toast System |
| Auth | Mock authentication (demo mode) |

---

## 📂 Project Structure

```
KGlam/
├── public/
│   ├── index.html
│   └── assets/          # Static files like logos, images
├── src/
│   ├── assets/          # Project images, icons, etc.
│   ├── components/      # Reusable components (Layout, Toast, etc.)
│   ├── pages/           # Main pages (Dashboard, Salon Management, Customers, Profile)
│   ├── App.js           # Root React component
│   └── index.js         # Entry point of the app
└── package.json         # Project dependencies and scripts
```



---

## 💻 Installation & Setup

### Prerequisites
- Node.js 16+
- npm 7+

### Steps

#### 1. Clone repository
```bash
git clone https://github.com/azhar0i0/KGlam.git
cd KGlam
```

2. Install dependencies
```bash
npm install
```
3. Start development server
```bash
npm start
```

4. Open in browser
```bash
http://localhost:5173
```

🛠 Available Scripts
```bash
| Command         | Description             |
| --------------- | ----------------------- |
| `npm start`     | Launch dev server       |
| `npm run build` | Build production bundle |
| `npm test`      | Start test runner       |
| `npm run lint`  | Run ESLint              |
```

#### 🧑‍💻 Usage Guide

**1️⃣ Sign In**  
Use the demo credentials to access the admin panel:  
```bash
Email: admin@company.com
Password: admin.me
```

**2️⃣ Dashboard**  
- View quick stats: total salons, customers, and active users.  
- Analyze user activity with interactive charts.  
- Toggle chart range: Weekly, Monthly, 6 Months, Lifetime.

**3️⃣ Salon Management**  
- View and edit salon profiles.  
- Activate or deactivate salons easily.  
- Search and paginate salons efficiently.

**4️⃣ Customer Management**  
- Access the full customer list.  
- Search, filter, and manage customers quickly.  
- Toggle customer status (Active/Deactivated).

**5️⃣ Profile Settings**  
- Update your personal information.  
- Change your password securely.  
- Receive real-time success/error notifications via toast messages.

---

### 🎨 Customization

**✨ Styling**  
Tailor the app appearance by modifying `tailwind.config.js`:  
- Theme colors  
- Typography  
- Layout adjustments

**✨ Icons**  
Switch out Lucide/Heroicons for:  
- FontAwesome  
- Material Icons  
- Custom SVGs

**✨ Backend Integration**  
Currently using mock data. You can integrate:  
- REST APIs  
- Firebase  
- Node.js & Express  
- Laravel  
- Supabase

---

### 📝 Future Improvements
- Full API-based backend integration  
- JWT authentication and role-based access  
- Unit and integration testing  
- Dark mode toggle  

---

### 🤝 Contributing
We welcome contributions!  
**Steps to contribute:**  
```bash
# 1. Fork the repository
# 2. Create a new branch
git checkout -b feature-branch

# 3. Commit your changes
git commit -m "Add new feature"

# 4. Push to your fork
git push origin feature-branch
```
Submit a pull request and celebrate your contribution 🎉

---

### 💡 Acknowledgments
- **React.js** – Smooth, dynamic UI  
- **Tailwind CSS** – Modern, responsive front-end  
- **Chart.js** – Stunning, interactive data visualizations  


Lucide & Heroicons for modern icons



🚀 Manage Your Salon Business Smarter with KGlam
Everything you need — beautifully organized, fast, and powerful.

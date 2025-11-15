import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import {
    FaBuilding,
    FaUserFriends,
    FaUserCircle,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";
    import { MdDashboard } from "react-icons/md";
import SaloonLogo from "@assets/SaloonLogo.png";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // ---------------- NOTIFICATION SYSTEM ----------------
    const notifications = [
        { id: 1, text: "New booking received from John.", time: "2 min ago" },
        { id: 2, text: "Owner Alex updated a service.", time: "10 min ago" },
        { id: 3, text: "3 customers joined today.", time: "1 hr ago" },
    ];

    const [showNotifications, setShowNotifications] = useState(false);
    const [notiList, setNotiList] = useState(notifications);
    const [animatingId, setAnimatingId] = useState(null);

    const notificationRef = useRef();
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(e.target)
            ) {
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // -----------------------------------------------------

    const menuItems = [
        { path: "/dashboard", icon: <MdDashboard size={20} />, label: "Dashboard" },
        { path: "/management", icon: <FaBuilding size={20} />, label: "Management" },
        { path: "/customers", icon: <FaUserFriends size={20} />, label: "Customers" },
        { path: "/profile", icon: <FaUserCircle size={20} />, label: "Profile" },
    ];

    return (
        <div className="flex bg-gray-100 min-h-screen w-full font-sans overflow-hidden">
            {/* -------- Sidebar -------- */}
            <aside
                className={`fixed md:relative z-50 top-0 left-0 h-full bg-gray-100 transform transition-transform duration-300 ease-in-out 
                ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
                w-64 md:w-30 flex flex-col justify-between`}
            >
                <div className="flex items-center justify-center pt-4">
                    <img
                        src={SaloonLogo}
                        alt="Saloon Logo"
                        className="w-25 h-25 md:w-16 md:h-16 object-contain"
                    />
                </div>

                <nav className="flex flex-col items-start px-4 py-3 bg-white mx-4 rounded-xl md:mt-6 shadow-sm space-y-3
                    md:rounded-full md:py-8 md:px-5"
                >
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setMenuOpen(false);
                            }}
                            className={`flex items-center py-4 rounded-xl w-full md:justify-center sm:justify-start md:p-2 md:py-3 pl-10 transition-all ${
                                location.pathname === item.path
                                    ? "bg-[#01ABAB] text-white"
                                    : "text-gray-500 hover:bg-[#01ABAB]/10 hover:text-[#01ABAB]"
                            }`}
                        >
                            {item.icon}
                            {menuOpen && (
                                <span className="text-sm md:hidden block ml-2">{item.label}</span>
                            )}
                        </button>
                    ))}

                    <button
                        onClick={() => navigate("/signin")}
                        className="flex items-center gap-3 py-4 rounded-xl text-gray-500 hover:bg-[#01ABAB]/10 hover:text-[#01ABAB] w-full md:justify-center md:p-2 md:py-3 justify-start pl-10"
                    >
                        <FaSignOutAlt size={20} />
                        {menuOpen && <span className="text-sm md:hidden block">Sign Out</span>}
                    </button>
                </nav>

                {menuOpen && (
                    <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3 m-4 shadow-sm md:hidden">
                        <FaUserCircle className="w-10 h-10 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-800">Saloon Dashboard</p>
                            <p className="text-xs text-gray-400">Admin</p>
                        </div>
                    </div>
                )}
            </aside>

            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            {/* -------- Main Section -------- */}
            <main className="flex-1 flex flex-col md:ml-0">
                {/* Navbar */}
                <header className="flex justify-between items-center bg-gray-100 px-4 md:px-8 py-4 relative">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                        </button>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-6 relative">
                        {/* -------- UPDATED NOTIFICATION BLOCK -------- */}
                        <div className="relative hidden md:block" ref={notificationRef}>
                            <button
                                className="text-gray-500 hover:text-[#01ABAB] bg-white rounded-full p-2 relative"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.25A2.25 2.25 0 0112.75 19.5h-1.5a2.25 2.25 0 01-2.107-2.25
                                        m6.714 0a48.108 48.108 0 01-8.714 0m8.714 0A2.251 2.251
                                        0 0018 15V9.75A6.75 6.75 0 005.25 9.75V15a2.251 2.251 0
                                        001.5 2.25m8.107 0a48.108 48.108"
                                    />
                                </svg>

                                {notiList.length > 0 && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border border-gray-100 p-4 z-50 animate-fade-in">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-sm font-semibold text-gray-800">Notifications</h4>

                                        <button
                                            onClick={() => {
                                                notiList.forEach((n, idx) => {
                                                    setTimeout(() => {
                                                        setAnimatingId(n.id);
                                                        setTimeout(() => {
                                                            setNotiList((prev) =>
                                                                prev.filter((x) => x.id !== n.id)
                                                            );
                                                        }, 250);
                                                    }, idx * 150);
                                                });
                                            }}
                                            className="text-xs text-[#01ABAB] hover:underline"
                                        >
                                            Mark all as read
                                        </button>
                                    </div>

                                    <ul className="space-y-2 max-h-56 overflow-y-auto">
                                        {notiList.map((n) => (
                                            <li
                                                key={n.id}
                                                className={`p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all 
                                                    ${
                                                        animatingId === n.id
                                                            ? "animate-slide-out"
                                                            : ""
                                                    }`}
                                                onClick={() => {
                                                    setAnimatingId(n.id);
                                                    setTimeout(() => {
                                                        setNotiList((prev) =>
                                                            prev.filter((x) => x.id !== n.id)
                                                        );
                                                    }, 250);
                                                }}
                                            >
                                                <p className="text-sm text-gray-700">{n.text}</p>
                                                <p className="text-xs text-gray-400">{n.time}</p>
                                            </li>
                                        ))}

                                        {notiList.length === 0 && (
                                            <p className="text-center py-6 text-gray-400 text-sm">
                                                No new notifications
                                            </p>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {/* ------------------------------------------------ */}

                        {/* Profile */}
                        <Link
                            to="/profile"
                            className="hidden md:flex items-center space-x-3 bg-white rounded-full py-2 px-4 hover:bg-gray-50 transition-all duration-200"
                        >
                            <FaUserCircle className="w-10 h-10 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-800">Saloon Dashboard</p>
                                <p className="text-xs text-gray-400">Admin</p>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <section className="flex-1 overflow-y-auto px-4 md:px-8 py-6 bg-white rounded-3xl rounded-b-none md:mr-4 md:md-4">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Layout;

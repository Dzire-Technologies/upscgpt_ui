import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAppSettings from "src/store/authStore";
import { useTokenStore } from "src/store/authStore";
import { GetUserDetails } from "src/services/Auth";
import style from "./Dashboard.module.css";
import SideMenu from "./SideMenu";
import ChatHistorySideBar from "src/components/ChatBox/ChatHistorySideBar";
import { useChatHistory } from "src/context/ChatHistoryContext";

const DashboardLayout = () => {
    const { username, setUsername, authEnabled } = useAppSettings();
    const token = useTokenStore(state => state.token) || localStorage.getItem('x_token');
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { chatHistory } = useChatHistory();


    useEffect(() => {
        if (!token) {
            // Not authenticated — take them back to landing
            navigate("/");
            return;
        }

        let isMounted = true;

        (async () => {
            try {
                const profile = await GetUserDetails(token);
                if (isMounted && profile) {
                    setUser(profile);
                    setUsername(profile?.email || profile?.name || "User");
                }
            } catch (err) {
                console.error("Failed fetching profile in Dashboard:", err);
                // Don't navigate away on error, just log it
                // User might still have a valid token but backend is down
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [token, navigate, setUsername]);


    const toggleSidebar = () => setIsSidebarOpen(v => !v);


    return (
        <div className={style.DashboardLayout}>
            <div className={style.DashboardHeader}>
                <div className={style.HeaderLeft}>
                    <button
                        className={style.HamburgerMenu}
                        onClick={toggleSidebar}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21" stroke="black"/></svg>
                    </button>

                    <SideMenu username={username} authEnabled={authEnabled} />
                </div>
            </div>
            
            {isSidebarOpen && (
                <div className={style.SidebarOverlay} onClick={toggleSidebar} />
            )}
            
            <div className={style.DashboardBodyContainer}>
                <Outlet />
            </div>
        </div>
    );
};


export default DashboardLayout;

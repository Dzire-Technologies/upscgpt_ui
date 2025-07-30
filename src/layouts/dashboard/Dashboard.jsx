import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "src/integrations/supabase/client";
import useAppSettings from "src/store/authStore";
import style from "./Dashboard.module.css";
import SideMenu from "./SideMenu";
import ChatHistorySideBar from "src/components/ChatBox/ChatHistorySideBar";
import { useChatHistory } from "/src/context/ChatHistoryContext";

const DashboardLayout = () => {
  const { username, setUsername, authEnabled } = useAppSettings();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { chatHistory } = useChatHistory();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setUsername(session.user.email);
      } else {
        setUsername("None");
        navigate("/");
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setUsername(session.user.email);
      } else {
        setUsername("None");
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, setUsername]);

  // Show loading while checking auth
  if (session === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect will happen in useEffect
  if (!user) {
    return null;
  }

  return (
    <div className={style.DashboardLayout}>
      {/* Header */}
      <div className={style.DashboardHeader}>
        <div className={style.HeaderLeft}>
          <button
            className={style.HamburgerMenu}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 18H21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={style.GradientTitle}>UPSCGPT</div>
        </div>
      </div>

      {/* Main content area: sidebar + outlet */}
      <div className={style.MainContent}>
        <div
          className={`${style.SideMenuContainer} ${
            isSidebarOpen ? style.SideMenuOpen : ""
          }`}
        >
          <ChatHistorySideBar chatHistory={chatHistory} />
          <SideMenu username={username} authEnabled={authEnabled} />
        </div>
        {isSidebarOpen && (
          <div className={style.SidebarOverlay} onClick={toggleSidebar} />
        )}
        <div className={style.DashboardBodyContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

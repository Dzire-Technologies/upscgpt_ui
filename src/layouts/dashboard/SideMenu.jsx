import { useState, useEffect } from "react";
import style from "./Dashboard.module.css";
import bcloudLogo from "../../assets/logo/logo.svg";
import userIcon from "../../assets/icons/header-user-avatar.svg";
import logoutIcon from "../../assets/icons/Logout.svg";
import downArrowIcon from "../../assets/icons/chevron-right.svg";
import { NavLink , useNavigate } from "react-router-dom";
import userLogout from "../../assets/icons/menu-icons/log-out.svg";
import { storeToken, useTokenStore } from "src/store/authStore";
import { AuthLogoutService, GetUserDetails } from "src/services/Auth";

const SideMenu = ({ username, authEnabled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token) || localStorage.getItem("x_token");

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const profile = await GetUserDetails(token);
        setUser({
          email: profile?.email,
          picture: profile?.profile_pic || profile?.picture,
          name: profile?.name,
        });
      } catch (e) {
        // ignore
      }
    })();
  }, [token]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const onHandleLogout = async () => {
    try {
      await AuthLogoutService(token);
    } finally {
      localStorage.removeItem("x_token");
      storeToken("");
      navigate("/");
    }
  };

  const getDisplayName = (name) => {
    if (!name) return "none";
    if (name.length > 20) return name.slice(0, 17) + "...";
    return name;
  };

  return (
    <div className={style.SideMenu}>
      <div className={style.ProfileContainer}>
        <div className={style.ProfilePanel}>
          <div className={style.ProfileIcon}>
            <img
              src={user?.picture ? user.picture : userIcon}
              alt="User-Icon"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = userIcon;
              }}
            />
          </div>
          <div className={style.UsernameDiv}>{getDisplayName(user?.email || user?.name)}</div>
          <div className={style.LogoutIcon}>
            <img src={logoutIcon} alt="Logout" onClick={onHandleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

import { useState, useEffect } from "react";
import SideMenuRoutes from "./SideMenuRoutes";
import style from "./Dashboard.module.css";
import bcloudLogo from "../../assets/logo/logo.svg";
import userIcon from "../../assets/icons/header-user-avatar.svg";
import logoutIcon from "../../assets/icons/Logout.svg";
import downArrowIcon from "../../assets/icons/chevron-right.svg";
import { NavLink, useNavigate } from "react-router-dom";
import userLogout from "../../assets/icons/menu-icons/log-out.svg";
import { toast } from "react-toastify";
import { storeToken } from "src/store/authStore";
import { AuthLogoutService, GetUserDetails } from "src/services/Auth";

const SideMenu = ({ username, authEnabled }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 


    const UserNameDetails = [
        // {
        //     action:"profile",
        //     icon: userProfile,
        //     title: "Profile"
        // },
        {
            action:"logout",
            icon: userLogout,
            title: "Logout"
        }
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const onHandleLogout = () => {
        AuthLogoutService().then(() => {
            localStorage.removeItem("x_token");
            storeToken(null);
            })
            .catch((error) => {
            console.error("Logout failed:", error);
            });
    };

    const getDisplayName = (name) => {
        if (!name) return "none";
        if (name.length > 20) {
            return name.slice(0, 17) + "...";
        }
        return name;
    };

    const fetchUser = async () => {
        const supauser = await GetUserDetails();
        return supauser?.data?.user_metadata || null;
    };

    useEffect(() => {
        const getUser = async () => {
        const metadata = await fetchUser();
        setUser(metadata);
        };
        getUser();
    }, []);


    return (
        <div className={style.SideMenu}>
            <div className={style.ProfileContainer}>
                <div className={style.ProfilePanel}>
                    <div className={style.ProfileIcon}>
                        <img
                            src={user?.picture ? user.picture : userIcon}
                            alt="User-Icon"
                            onError={e => { e.target.onerror = null; e.target.src = userIcon; }}
                        />
                    </div>
                    <div className={style.UsernameDiv}>{getDisplayName(user?.email)}</div>
                    <div className={style.LogoutIcon}>
                        <img src={logoutIcon} alt="Logout" onClick={onHandleLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;

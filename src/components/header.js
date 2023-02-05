import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginPopup from "./login-popup";

import "./header.css"

function Header() {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Posts", path: "/posts" },
        { name: "Secret Page", path: "/secret-page" }
    ];

    const { value, login, logout } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openProfileMenu, setOpenProfileMenu] = useState(false)

    function closeModal() {
        setTimeout(() => {
            // попробовать использовать useRef
            // для смены состояния кнопки Log in
            //     color: rgba(0, 0, 0, 0.26);
            //     box-shadow: none;
            //     background-color: rgba(0, 0, 0, 0.12);
            login(() => setOpenModal(false))
        }, 1000)
    }

    function isActive({ isActive }) {
        return isActive ? "header__nav-link header__nav-link_active" : "header__nav-link"
    }

    return (
        <div className="header">
            <nav className="header__nav">
                {
                    navLinks.map(({ name, path }) => {
                        return (
                            <NavLink key={name} to={path} className={isActive}>{name}</NavLink>
                        )
                    })
                }
            </nav>
            {
                value 
                ? (
                    <div className="header__profile">
                        <div className="header__avatar" onClick={() => setOpenProfileMenu(!openProfileMenu)}>
                            { value.name.split(" ").reduce((str, item) => {
                                if (item.length < 2 || item === "Mrs." || item ==="Mr.")
                                    return str + ""
                                return str + item[0]
                            }, "")}
                        </div>
                        <ul className={openProfileMenu ? "header__profile-menu header__profile-menu_open" : "header__profile-menu"}>
                            <li className="header__profile-menu-item"><Link to="/profile" onClick={() => setOpenProfileMenu(false)}>{value.name}</Link></li>
                            <li className="header__profile-menu-item" onClick={() => { logout(); setOpenProfileMenu(false)}}>Log out</li>
                        </ul>
                    </div>
                )
                : <button className="header__button" type="button" onClick={() => setOpenModal(true)}>Log in</button>
            }
            {
                openModal && <LoginPopup login={login} closeModal={() => setOpenModal(false)} />
            }
        </div>
    )
}

export default Header
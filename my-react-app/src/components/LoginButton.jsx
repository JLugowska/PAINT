import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";
import "./css/UserMenu.css";


export default function LoginButton() {
    const [open, setOpen] = useState(false);
    const { logout, user } = useUser();
    const navigate = useNavigate();


    return (
        <div className="user-menu">
            <button onClick={() => navigate("/login")} className="menu-toggle">
                ☰ Zaloguj się
            </button>
        </div>
    );
}

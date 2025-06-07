
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./css/AdminMenu.css";
import {useClickOutside} from "./common/CommonHooks.jsx";

const PasswordChangeModal = ({ isOpen, onClose, onSubmit }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Hasła nie są zgodne");
            return;
        }
        onSubmit(currentPassword, newPassword);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Zmiana hasła</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Aktualne hasło:</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nowe hasło:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Potwierdź nowe hasło:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="submit-button">
                            Zmień hasło
                        </button>
                        <button type="button" onClick={onClose} className="cancel-button">
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function AdminMenu() {
    const [open, setOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const menuRef = useClickOutside(() => setOpen(false));
    const { logout, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handlePasswordChange = async (currentPassword, newPassword) => {
        try {
            // Add your password change API call here
            console.log("Password change requested", { currentPassword, newPassword });
            // Show success message
        } catch (error) {
            console.error("Error changing password:", error);
            // Show error message
        }
    };

    return (
        <>
            <div className="admin-menu" ref={menuRef}>
                <button onClick={() => setOpen(!open)} className="menu-toggle">
                    ☰ MENU
                </button>
                {open && (
                    <div className="menu-dropdown">
                        <button onClick={() => {
                            setIsPasswordModalOpen(true);
                            setOpen(false);
                        }}>
                            Zmień hasło
                        </button>
                        <button onClick={() => {
                            logout();
                            navigate("/");
                        }}>
                            Wyloguj
                        </button>
                    </div>
                )}
            </div>
            <PasswordChangeModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSubmit={handlePasswordChange}
            />
        </>
    );
}

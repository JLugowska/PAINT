
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./css/UserProfile.css";
import UserMenu from "./UserMenu.jsx";

export default function UserProfile() {
    const { user, updateUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        name: user?.name || "",
        surname: user?.surname || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        // Validate passwords if user is trying to change them
        if (formData.newPassword || formData.confirmPassword) {
            if (formData.newPassword !== formData.confirmPassword) {
                setMessage({ text: "Nowe hasła nie są identyczne", type: "error" });
                return;
            }
            if (!formData.currentPassword) {
                setMessage({ text: "Wymagane jest obecne hasło", type: "error" });
                return;
            }
        }

        try {
            // Update user information
            const success = await updateUser({
                ...formData,
                id: user.id
            });

            if (success) {
                setMessage({ text: "Profil został zaktualizowany", type: "success" });
                // Clear password fields
                setFormData(prev => ({
                    ...prev,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                }));
            } else {
                setMessage({ text: "Nie udało się zaktualizować profilu", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Wystąpił błąd podczas aktualizacji profilu", type: "error" });
        }
    };

    return (
        <div className="profile-container">
            <UserMenu />
            <h1>Edytuj profil</h1>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="username">Login</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            disabled
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Imię</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="surname">Nazwisko</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h2>Zmiana hasła</h2>
                <div className="form-group">
                    <label htmlFor="currentPassword">Obecne hasło</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Nowe hasło</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Potwierdź nowe hasło</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="save-button">
                        Zapisz zmiany
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate(-1)}
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
}
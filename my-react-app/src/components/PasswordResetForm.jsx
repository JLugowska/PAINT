import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./css/LoginForm.css";

export default function PasswordResetForm() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { resetPassword } = useUser();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Hasła nie są takie same.");
      return;
    }

    // Example: call resetPassword from context
    const result = await resetPassword({ username, newPassword });
    if (result?.success) {
      setSuccess("Hasło zostało zresetowane. Możesz się teraz zalogować.");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(result?.message || "Nie udało się zresetować hasła.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Resetowanie hasła</h2>

        {error && <p className="login-error">{error}</p>}
        {success && <p className="login-success">{success}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Login:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Nowe hasło:</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Potwierdź nowe hasło:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Zresetuj hasło
          </button>
        </form>

        <div className="login-links">
          <button className="link-button" onClick={() => navigate("/login")}>
            Powrót do logowania
          </button>
        </div>
      </div>
    </div>
  );
}
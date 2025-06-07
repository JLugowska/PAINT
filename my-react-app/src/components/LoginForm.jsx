import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProvider, useUser } from "../context/UserContext";
import "./css/LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({email, password});
    if (success) {
      if(user?.role=="admin"){
        navigate("/admin");
      }
      else{
      navigate("/dashboard");
      }
    } else {
      setError("Nieprawidłowy email lub hasło.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Logowanie</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Hasło:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="login-button">
            Zaloguj się
          </button>
        </form>

        <div className="login-links">
          <button className="link-button" onClick={() => navigate("/register")}>
            Zarejestruj się
          </button>
          <button className="link-button" onClick={() => navigate("/reset-password")}>
            Nie pamiętasz hasła?
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./LoginForm";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Hasła nie są takie same.");
      return;
    }

    // Walidacja adresu e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Wprowadź poprawny adres e-mail.");
    return;
  }

    const success = await register({ name, surname, email, password });
    if (success) {
    navigate("/login");
  } else {
    setError("Rejestracja nie powiodła się.");
  }
  };


  // Przykładowe "fake" rejestrowanie — tu można podpiąć API
  //   localStorage.setItem("user", JSON.stringify({ email }));
  //   navigate("/login"); // po rejestracji przenosi do logowania
  // };

  return (
    <div className="login-container">
       <div className="user-menu">
            <button onClick={() => navigate("/")} className="menu-toggle">
                ← Wróć
            </button>
        </div>
      <div className="login-box">
        <h2 className="login-title">Rejestracja</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Surname:</label>
            <input
              type="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="form-input"
            />
          </div>

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

          <div className="form-group">
            <label>Potwierdź hasło:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="login-button">
            Zarejestruj się
          </button>
        </form>

        <div className="login-links">
          <button className="link-button" onClick={() => navigate("/login")}>
            Masz już konto? Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}

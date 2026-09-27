import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { strings } from "../data/strings";
import Logo from "../components/Logo";

export default function Login() {
  const { lang } = useLanguage();
  const { loginPublic, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"public" | "admin">("public");

  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePublicLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginPublic(mobile, name);
    navigate("/dashboard");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginAdmin(email, password);
    if (result.ok) navigate("/dashboard");
    else setError(result.error || "Error");
  };

  return (
    <div className="container section login-page">
      <div className="login-card">
        <div className="login-card__brand">
          <Logo size={56} withText={false} />
          <h1>{strings.brand[lang]}</h1>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${tab === "public" ? "login-tab--active" : ""}`}
            onClick={() => { setTab("public"); setError(""); }}
            type="button"
          >
            <User size={16} /> {strings.auth.publicUser[lang]}
          </button>
          <button
            className={`login-tab ${tab === "admin" ? "login-tab--active" : ""}`}
            onClick={() => { setTab("admin"); setError(""); }}
            type="button"
          >
            <ShieldCheck size={16} /> {strings.auth.admin[lang]}
          </button>
        </div>

        {tab === "public" ? (
          <form className="login-form" onSubmit={handlePublicLogin}>
            <label className="form-field">
              <span>{lang === "hi" ? "आपका नाम" : "Your Name"}</span>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="form-field">
              <span>{strings.auth.mobile[lang]}</span>
              <input type="tel" required pattern="[0-9]{10}" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="9000000000" />
            </label>
            <button type="submit" className="btn btn--primary btn--lg">{strings.auth.loginBtn[lang]}</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleAdminLogin}>
            <label className="form-field">
              <span>{strings.auth.email[lang]}</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="form-field">
              <span>{strings.auth.password[lang]}</span>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn--primary btn--lg">{strings.auth.loginBtn[lang]}</button>
            <p className="login-demo-note">{strings.auth.demoNote[lang]}</p>
          </form>
        )}
      </div>
    </div>
  );
}

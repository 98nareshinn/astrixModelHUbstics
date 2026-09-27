import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Languages, Plus, LogOut, LayoutDashboard } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { strings } from "../data/strings";

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/", label: strings.nav.home[lang] },
    { to: "/properties", label: strings.nav.properties[lang] },
    { to: "/maps", label: strings.nav.maps[lang] },
    { to: "/services", label: strings.nav.services[lang] },
    { to: "/news", label: strings.nav.news[lang] },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <Logo size={40} />
        </Link>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}

          <div className="navbar__mobile-actions">
            <Link to="/upload" className="btn btn--primary btn--sm" onClick={() => setOpen(false)}>
              <Plus size={16} /> {strings.nav.postProperty[lang]}
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn--ghost btn--sm" onClick={() => setOpen(false)}>
                  <LayoutDashboard size={16} /> {strings.nav.dashboard[lang]}
                </Link>
                <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
                  <LogOut size={16} /> {strings.nav.logout[lang]}
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn--ghost btn--sm" onClick={() => setOpen(false)}>
                {strings.nav.login[lang]}
              </Link>
            )}
          </div>
        </nav>

        <div className="navbar__actions">
          <button className="icon-btn" onClick={toggleLang} aria-label="Toggle language" title={lang === "hi" ? "English" : "हिन्दी"}>
            <Languages size={18} />
            <span className="icon-btn__label">{lang === "hi" ? "EN" : "हि"}</span>
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link to="/upload" className="btn btn--primary btn--sm navbar__desktop-only">
            <Plus size={16} /> {strings.nav.postProperty[lang]}
          </Link>

          {user ? (
            <div className="navbar__desktop-only navbar__user-group">
              <Link to="/dashboard" className="btn btn--ghost btn--sm">
                <LayoutDashboard size={16} /> {strings.nav.dashboard[lang]}
              </Link>
              <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn--ghost btn--sm navbar__desktop-only">
              {strings.nav.login[lang]}
            </Link>
          )}

          <button className="icon-btn navbar__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

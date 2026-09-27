import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../data/strings";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo size={44} />
          <p className="footer__about">{strings.footer.about[lang]}</p>
        </div>

        <div className="footer__col">
          <h4>{strings.footer.quickLinks[lang]}</h4>
          <Link to="/properties">{strings.nav.properties[lang]}</Link>
          <Link to="/maps">{strings.nav.maps[lang]}</Link>
          <Link to="/services">{strings.nav.services[lang]}</Link>
          <Link to="/news">{strings.nav.news[lang]}</Link>
        </div>

        <div className="footer__col">
          <h4>{strings.footer.contact[lang]}</h4>
          <span className="footer__contact-line"><Phone size={14} /> +91 90000 00001</span>
          <span className="footer__contact-line"><Mail size={14} /> hello@bhoomisaathi.in</span>
          <span className="footer__contact-line"><MapPin size={14} /> Beawar, Ajmer, Rajasthan 305901</span>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {strings.brand[lang]} — {strings.footer.rights[lang]}</span>
      </div>
    </footer>
  );
}

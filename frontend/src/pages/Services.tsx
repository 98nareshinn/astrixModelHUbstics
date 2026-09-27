import { Link } from "react-router-dom";
import { Wrench, Zap, Sparkles, Users, FileText, MapPin, Ruler, Camera, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../data/strings";
import { services } from "../data/seed";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  wrench: Wrench,
  zap: Zap,
  sparkles: Sparkles,
  users: Users,
  "file-text": FileText,
  "map-pin": MapPin,
  ruler: Ruler,
  camera: Camera,
};

export default function Services() {
  const { lang } = useLanguage();

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{strings.services.title[lang]}</h1>
        <p>{strings.services.subtitle[lang]}</p>
      </div>

      <div className="service-grid">
        {services.map((s) => {
          const Icon = iconMap[s.icon] || Wrench;
          return (
            <Link to={`/services/${s.id}`} className="service-card" key={s.id}>
              <span className="service-card__icon"><Icon size={24} color="var(--accent)" /></span>
              <h3>{lang === "hi" ? s.nameHi : s.name}</h3>
              <p>{lang === "hi" ? s.descriptionHi : s.description}</p>
              <div className="service-card__footer">
                <span className="service-card__rating"><Star size={13} fill="var(--gold)" color="var(--gold)" /> {s.rating}</span>
                <span className="service-card__price">
                  {strings.common.from[lang]} ₹{s.priceFrom}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

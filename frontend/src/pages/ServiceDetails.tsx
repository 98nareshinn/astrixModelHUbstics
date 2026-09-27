import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Phone, Check, Wrench, Zap, Sparkles, Users, FileText, MapPin, Ruler, Camera } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../data/strings";
import { services } from "../data/seed";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  wrench: Wrench, zap: Zap, sparkles: Sparkles, users: Users,
  "file-text": FileText, "map-pin": MapPin, ruler: Ruler, camera: Camera,
};

export default function ServiceDetails() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [booked, setBooked] = useState(false);
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="container section">
        <p>{lang === "hi" ? "सर्विस नहीं मिली।" : "Service not found."}</p>
        <Link to="/services" className="btn btn--ghost btn--sm"><ArrowLeft size={16} /> {strings.common.back[lang]}</Link>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Wrench;

  return (
    <div className="container section">
      <Link to="/services" className="link-back"><ArrowLeft size={16} /> {strings.common.back[lang]}</Link>

      <div className="service-details">
        <div className="service-details__icon"><Icon size={40} color="var(--accent)" /></div>
        <h1>{lang === "hi" ? service.nameHi : service.name}</h1>
        <p className="service-details__desc">{lang === "hi" ? service.descriptionHi : service.description}</p>

        <div className="service-details__stats">
          <span><Star size={16} fill="var(--gold)" color="var(--gold)" /> {service.rating} ({service.bookings} {lang === "hi" ? "बुकिंग" : "bookings"})</span>
          <span>{strings.common.from[lang]} ₹{service.priceFrom}</span>
        </div>

        {booked ? (
          <div className="enquiry-card__success" style={{ marginTop: "1.5rem" }}>
            <Check size={20} color="var(--success)" />
            <p>{lang === "hi" ? "आपकी बुकिंग दर्ज हो गई! टीम जल्द संपर्क करेगी।" : "Your booking is confirmed! Our team will reach out shortly."}</p>
          </div>
        ) : (
          <div className="service-details__actions">
            <button className="btn btn--primary btn--lg" onClick={() => setBooked(true)}>{strings.services.bookNow[lang]}</button>
            <a href="tel:+919000000001" className="btn btn--outline btn--lg"><Phone size={16} /> {strings.property.call[lang]}</a>
          </div>
        )}
      </div>
    </div>
  );
}

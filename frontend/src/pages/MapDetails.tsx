import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPinned, Lock, Check, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../data/strings";
import { mapProducts } from "../data/seed";

export default function MapDetails() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [unlocked, setUnlocked] = useState(false);
  const map = mapProducts.find((m) => m.id === id);

  if (!map) {
    return (
      <div className="container section">
        <p>{lang === "hi" ? "नक्शा नहीं मिला।" : "Map not found."}</p>
        <Link to="/maps" className="btn btn--ghost btn--sm"><ArrowLeft size={16} /> {strings.common.back[lang]}</Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <Link to="/maps" className="link-back"><ArrowLeft size={16} /> {strings.common.back[lang]}</Link>

      <div className="map-details">
        <div className="map-details__preview">
          <MapPinned size={64} color="var(--accent)" opacity={0.5} />
          {!unlocked && (
            <div className="map-details__lock-overlay">
              <Lock size={28} />
            </div>
          )}
        </div>

        <div className="map-details__info">
          <h1>{lang === "hi" ? map.titleHi : map.title}</h1>
          <p>{map.description}</p>

          <div className="spec-grid">
            <div className="spec-item">
              <span className="spec-item__label">{lang === "hi" ? "इलाका" : "Area"}</span>
              <span className="spec-item__value">{map.area}</span>
            </div>
            <div className="spec-item">
              <span className="spec-item__label">{strings.maps.format[lang]}</span>
              <span className="spec-item__value"><FileText size={13} style={{ verticalAlign: "-2px" }} /> {map.format}</span>
            </div>
            <div className="spec-item">
              <span className="spec-item__label">{strings.maps.pages[lang]}</span>
              <span className="spec-item__value">{map.pages}</span>
            </div>
            <div className="spec-item">
              <span className="spec-item__label">{lang === "hi" ? "प्रिंट साइज़" : "Print Size"}</span>
              <span className="spec-item__value">{map.printSize}</span>
            </div>
          </div>

          {unlocked ? (
            <div className="enquiry-card__success">
              <Check size={20} color="var(--success)" />
              <p>{lang === "hi" ? "अनलॉक हो गया! (डेमो — असली डाउनलोड के लिए पेमेंट गेटवे जोड़ा जाएगा)" : "Unlocked! (Demo — a real payment gateway connects here in production)"}</p>
            </div>
          ) : (
            <button className="btn btn--gold btn--lg" onClick={() => setUnlocked(true)}>
              <Lock size={16} /> {strings.maps.unlock[lang]} — ₹{map.price}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { FileText, MapPinned } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../data/strings";
import { mapProducts } from "../data/seed";
import BeawarMap from "../components/BeawarMap";

export default function Maps() {
  const { lang } = useLanguage();

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{strings.maps.title[lang]}</h1>
        <p>{strings.maps.subtitle[lang]}</p>
      </div>

      <BeawarMap height={360} />

      <div className="section__head" style={{ marginTop: "2.5rem" }}>
        <h2>{lang === "hi" ? "उपलब्ध नक्शे" : "Available Maps"}</h2>
      </div>

      <div className="map-grid">
        {mapProducts.map((m) => (
          <Link to={`/maps/${m.id}`} className="map-card" key={m.id}>
            <span className="map-card__icon"><MapPinned size={26} color="var(--accent)" /></span>
            <h3>{lang === "hi" ? m.titleHi : m.title}</h3>
            <span className="map-card__area">{m.area} · {m.category}</span>
            <div className="map-card__meta">
              <span><FileText size={13} /> {m.format} · {m.pages}p</span>
              <span className="map-card__price">₹{m.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

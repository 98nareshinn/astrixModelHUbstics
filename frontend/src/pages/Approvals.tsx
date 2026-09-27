import { Navigate } from "react-router-dom";
import { Check, X, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { strings } from "../data/strings";
import { formatPrice } from "../utils/format";
import PropertyArt from "../components/PropertyArt";

export default function Approvals() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const { properties, approveProperty, rejectProperty } = useData();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;

  const pending = properties.filter((p) => p.status === "PENDING");

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{strings.approvals.title[lang]}</h1>
        <p>{pending.length} {lang === "hi" ? "समीक्षा के लिए प्रतीक्षारत" : "waiting for review"}</p>
      </div>

      {pending.length === 0 ? (
        <div className="empty-state">
          <p>{strings.approvals.noItems[lang]}</p>
        </div>
      ) : (
        <div className="approval-list">
          {pending.map((p) => (
            <div className="approval-row" key={p.id}>
              <div className="approval-row__art">
                <PropertyArt id={p.id} type={p.type} />
              </div>
              <div className="approval-row__body">
                <h3>{lang === "hi" ? p.titleHi : p.title}</h3>
                <span className="approval-row__meta">
                  <MapPin size={13} /> {p.area} · {strings.property.khasra[lang]}: {p.khasra}
                </span>
                <span className="approval-row__price">{formatPrice(p.price, p.listingType, lang)}</span>
                <span className="approval-row__by">{strings.property.postedBy[lang]}: {p.postedBy}</span>
              </div>
              <div className="approval-row__actions">
                <button className="btn btn--primary btn--sm" onClick={() => approveProperty(p.id)}>
                  <Check size={15} /> {strings.approvals.approve[lang]}
                </button>
                <button className="btn btn--outline btn--sm" onClick={() => rejectProperty(p.id)}>
                  <X size={15} /> {strings.approvals.reject[lang]}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { Navigate, Link } from "react-router-dom";
import { CheckCircle2, Clock, Mail, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { strings } from "../data/strings";
import { teamMembers } from "../data/seed";
import { formatDate } from "../utils/format";
import PropertyCard from "../components/PropertyCard";

export default function Dashboard() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const { properties, enquiries } = useData();

  if (!user) return <Navigate to="/login" replace />;

  const isAdmin = user.role === "admin";
  const myListings = properties.filter((p) => p.postedBy === user.name || (!isAdmin && p.postedByRole === "public"));
  const published = properties.filter((p) => p.status === "PUBLISHED");
  const pending = properties.filter((p) => p.status === "PENDING");

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{strings.dashboard.title[lang]}</h1>
        <p>{lang === "hi" ? "नमस्ते" : "Welcome"}, {user.name}</p>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <CheckCircle2 size={22} color="var(--success)" />
          <div>
            <span className="stat-card__num">{published.length}</span>
            <span className="stat-card__label">{strings.dashboard.published[lang]}</span>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={22} color="var(--gold)" />
          <div>
            <span className="stat-card__num">{pending.length}</span>
            <span className="stat-card__label">{strings.dashboard.pending[lang]}</span>
          </div>
        </div>
        <div className="stat-card">
          <Mail size={22} color="var(--accent)" />
          <div>
            <span className="stat-card__num">{enquiries.length}</span>
            <span className="stat-card__label">{strings.dashboard.enquiries[lang]}</span>
          </div>
        </div>
      </div>

      {isAdmin && (
        <>
          <div className="section__head">
            <h2>{strings.approvals.title[lang]}</h2>
            <Link to="/approvals" className="link-arrow">{strings.common.seeAll[lang]} <ArrowRight size={15} /></Link>
          </div>

          <div className="section__head" style={{ marginTop: "2rem" }}>
            <h2><Users size={18} style={{ verticalAlign: "-3px", marginRight: 6 }} />{strings.dashboard.team[lang]}</h2>
          </div>
          <div className="team-grid">
            {teamMembers.map((t) => (
              <div className="team-card" key={t.id}>
                <span className="team-card__avatar">{t.name.charAt(0)}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>

          {enquiries.length > 0 && (
            <>
              <div className="section__head" style={{ marginTop: "2rem" }}>
                <h2>{strings.dashboard.enquiries[lang]}</h2>
              </div>
              <div className="enquiry-table">
                {enquiries.map((e) => (
                  <div className="enquiry-row" key={e.id}>
                    <div>
                      <strong>{e.propertyTitle}</strong>
                      <span className="enquiry-row__khasra">{strings.property.khasra[lang]}: {e.khasra}</span>
                    </div>
                    <div>
                      <span>{e.name}</span>
                      <span>{e.mobile}</span>
                    </div>
                    <span className="enquiry-row__date">{formatDate(e.at.slice(0, 10), lang)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <div className="section__head" style={{ marginTop: "2rem" }}>
        <h2>{strings.dashboard.myListings[lang]}</h2>
      </div>
      {myListings.length === 0 ? (
        <div className="empty-state">
          <p>{lang === "hi" ? "अभी तक कोई लिस्टिंग नहीं।" : "No listings yet."}</p>
          <Link to="/upload" className="btn btn--primary btn--sm">{strings.nav.postProperty[lang]}</Link>
        </div>
      ) : (
        <div className="property-grid">
          {myListings.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}

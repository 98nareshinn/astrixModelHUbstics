import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Home as HomeIcon, Wrench, Newspaper, MapPin as PinIcon,
  BadgeCheck, Users, HandHeart, ArrowRight, Building2, Map as MapIcon,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useData } from "../context/DataContext";
import { strings } from "../data/strings";
import PropertyCard from "../components/PropertyCard";
import BeawarMap from "../components/BeawarMap";
import { newsItems } from "../data/seed";
import { formatDate } from "../utils/format";

export default function Home() {
  const { lang } = useLanguage();
  const { properties } = useData();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const published = properties.filter((p) => p.status === "PUBLISHED").slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  const quickLinks = [
    { to: "/properties", icon: HomeIcon, label: strings.nav.properties[lang], color: "var(--accent)" },
    { to: "/services", icon: Wrench, label: strings.nav.services[lang], color: "var(--terracotta)" },
    { to: "/news", icon: Newspaper, label: strings.nav.news[lang], color: "var(--success)" },
    { to: "/maps", icon: PinIcon, label: strings.nav.maps[lang], color: "var(--danger)" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax slice" className="hero__skyline">
            <path
              d="M0 420 L40 420 L40 360 L70 360 L70 400 L110 400 L110 320 L130 320 L130 280 L150 280 L150 320 L170 320 L170 400 L220 400 L220 340 L260 340 L260 300 L280 260 L300 300 L300 340 L340 340 L340 400 L400 400 L400 300 L430 300 L430 250 L460 250 L460 300 L490 300 L490 400 L560 400 L560 350 L600 350 L600 380 L650 380 L650 310 L680 280 L710 310 L710 380 L760 380 L760 400 L830 400 L830 330 L860 330 L860 280 L890 280 L890 330 L920 330 L920 400 L990 400 L990 340 L1030 340 L1030 300 L1060 260 L1090 300 L1090 340 L1130 340 L1130 400 L1200 400 L1200 500 L0 500 Z"
              fill="var(--bs-terracotta-400)"
              opacity="0.14"
            />
          </svg>
        </div>

        <div className="container hero__inner">
          <div className="hero__content">
            <span className="eyebrow"><PinIcon size={14} /> {strings.home.heroEyebrow[lang]}</span>
            <h1 className="hero__title">{strings.home.heroTitle[lang]}</h1>
            <p className="hero__subtitle">{strings.home.heroSubtitle[lang]}</p>

            <form className="hero__search" onSubmit={handleSearch}>
              <Search size={20} className="hero__search-icon" />
              <input
                type="text"
                placeholder={strings.home.searchPlaceholder[lang]}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn--primary">{strings.home.searchBtn[lang]}</button>
            </form>

            <div className="hero__ctas">
              <Link to="/upload" className="btn btn--gold">{strings.home.postCta[lang]}</Link>
              <Link to="/maps" className="btn btn--outline">{strings.home.mapCta[lang]}</Link>
            </div>
          </div>

          <div className="hero__map-preview">
            <BeawarMap height={340} />
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="container section">
        <div className="quick-links">
          {quickLinks.map((q) => (
            <Link to={q.to} key={q.to} className="quick-link-card">
              <span className="quick-link-card__icon" style={{ background: q.color }}>
                <q.icon size={22} color="white" />
              </span>
              <span>{q.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* LATEST PROPERTIES */}
      <section className="container section">
        <div className="section__head">
          <h2>{strings.home.latestProperties[lang]}</h2>
          <Link to="/properties" className="link-arrow">
            {strings.home.viewAll[lang]} <ArrowRight size={15} />
          </Link>
        </div>
        <div className="property-grid">
          {published.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title-center">{strings.home.whyUs[lang]}</h2>
          <div className="why-grid">
            {strings.whyCards.map((c, i) => {
              const icons = [BadgeCheck, Users, HandHeart];
              const Icon = icons[i];
              return (
                <div className="why-card" key={i}>
                  <Icon size={26} color="var(--accent)" />
                  <h3>{c.title[lang]}</h3>
                  <p>{c.body[lang]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="container section">
        <div className="services-teaser">
          <div className="services-teaser__text">
            <span className="eyebrow"><Wrench size={14} /> {strings.nav.services[lang]}</span>
            <h2>{strings.home.servicesTeaser[lang]}</h2>
            <Link to="/services" className="btn btn--primary">
              {strings.nav.services[lang]} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="services-teaser__icons">
            <Building2 size={28} />
            <Wrench size={28} />
            <MapIcon size={28} />
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <h2>{strings.home.localNews[lang]}</h2>
            <Link to="/news" className="link-arrow">
              {strings.common.seeAll[lang]} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="news-grid">
            {newsItems.slice(0, 3).map((n) => (
              <Link to="/news" key={n.id} className="news-card">
                <span className="news-card__cat">{n.category}</span>
                <h3>{lang === "hi" ? n.titleHi : n.title}</h3>
                <p>{lang === "hi" ? n.summaryHi : n.summary}</p>
                <span className="news-card__date">{formatDate(n.publishedAt, lang)} · {n.source}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

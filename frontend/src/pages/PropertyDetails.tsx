import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, Phone, MessageCircle, Share2, CalendarClock, BadgeCheck,
  Heart, Send, ArrowLeft, Check,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { strings } from "../data/strings";
import { formatPrice, formatDate } from "../utils/format";
import PropertyArt from "../components/PropertyArt";
import BeawarMap from "../components/BeawarMap";
import type { Enquiry } from "../data/types";

export default function PropertyDetails() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const { properties, addEnquiry, addComment, toggleLike } = useData();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="container section">
        <p>{lang === "hi" ? "प्रॉपर्टी नहीं मिली।" : "Property not found."}</p>
        <Link to="/properties" className="btn btn--ghost btn--sm"><ArrowLeft size={16} /> {strings.common.back[lang]}</Link>
      </div>
    );
  }

  const title = lang === "hi" ? property.titleHi : property.title;
  const description = lang === "hi" ? property.descriptionHi : property.description;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  const handleLike = () => {
    if (liked) return;
    toggleLike(property.id);
    setLiked(true);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enquiry: Enquiry = {
      id: `e-${Date.now()}`,
      propertyId: property.id,
      propertyTitle: title,
      khasra: property.khasra,
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      message: form.message,
      at: new Date().toISOString(),
    };
    addEnquiry(enquiry);
    setSubmitted(true);
    setForm({ name: "", mobile: "", email: "", message: "" });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(property.id, user?.name || (lang === "hi" ? "आगंतुक" : "Guest"), commentText.trim());
    setCommentText("");
  };

  const specs: [string, string][] = [
    [strings.property.khasra[lang], property.khasra],
    [strings.property.propertyNo[lang], property.propertyNo],
    [strings.property.size[lang], `${property.sizeSqft.toLocaleString("en-IN")} ${strings.common.sqft[lang]}`],
    [strings.property.facing[lang], property.facing],
    [strings.property.roadWidth[lang], `${property.roadWidthFt} ft`],
    [strings.property.landType[lang], property.landType],
  ];

  return (
    <div className="container section property-details">
      <Link to="/properties" className="link-back"><ArrowLeft size={16} /> {strings.common.back[lang]}</Link>

      <div className="property-details__grid">
        <div className="property-details__main">
          <div className="property-details__art">
            <PropertyArt id={property.id} type={property.type} />
            {property.verified && (
              <span className="property-card__verified property-card__verified--lg">
                <BadgeCheck size={16} /> {strings.property.verified[lang]}
              </span>
            )}
          </div>

          <div className="property-details__head">
            <div>
              <span className="eyebrow"><MapPin size={13} /> {property.area}, Beawar</span>
              <h1>{title}</h1>
              <p className="property-details__address">{property.address}</p>
            </div>
            <div className="property-details__price">{formatPrice(property.price, property.listingType, lang)}</div>
          </div>

          <div className="property-details__actions">
            <a href="tel:+919000000001" className="btn btn--primary btn--sm">
              <Phone size={15} /> {strings.property.call[lang]}
            </a>
            <a href="https://wa.me/919000000001" target="_blank" rel="noopener noreferrer" className="btn btn--gold btn--sm">
              <MessageCircle size={15} /> {strings.property.whatsapp[lang]}
            </a>
            <button className="btn btn--outline btn--sm" onClick={handleShare}>
              {copied ? <Check size={15} /> : <Share2 size={15} />} {copied ? (lang === "hi" ? "कॉपी हुआ" : "Copied") : strings.property.share[lang]}
            </button>
            <button className="btn btn--outline btn--sm" onClick={handleLike} disabled={liked}>
              <Heart size={15} fill={liked ? "var(--danger)" : "none"} color={liked ? "var(--danger)" : "currentColor"} /> {property.likes + (liked ? 1 : 0)}
            </button>
          </div>

          <div className="spec-grid">
            {specs.map(([label, value]) => (
              <div className="spec-item" key={label}>
                <span className="spec-item__label">{label}</span>
                <span className="spec-item__value">{value}</span>
              </div>
            ))}
          </div>

          <div className="property-details__section">
            <h2>{strings.property.description[lang]}</h2>
            <p>{description}</p>
          </div>

          {property.amenities.length > 0 && (
            <div className="property-details__section">
              <h2>{strings.property.amenities[lang]}</h2>
              <div className="chip-row">
                {property.amenities.map((a) => (
                  <span className="chip" key={a}>{a}</span>
                ))}
              </div>
            </div>
          )}

          <div className="property-details__section">
            <h2>{lang === "hi" ? "नक्शे पर स्थान" : "Location on map"}</h2>
            <BeawarMap lat={property.lat} lng={property.lng} height={280} label={title} />
          </div>

          <div className="property-details__section">
            <h2>{strings.property.comments[lang]} ({property.comments.length})</h2>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder={lang === "hi" ? "अपनी टिप्पणी लिखें..." : "Write a comment..."}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn btn--primary btn--sm"><Send size={14} /></button>
            </form>
            <div className="comment-list">
              {property.comments.map((c) => (
                <div className="comment-item" key={c.id}>
                  <span className="comment-item__author">{c.author}</span>
                  <p>{c.text}</p>
                  <span className="comment-item__date">{formatDate(c.at, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="property-details__sidebar">
          <div className="enquiry-card">
            <h3>{strings.property.sendEnquiry[lang]}</h3>
            <p className="enquiry-card__posted">{strings.property.postedBy[lang]}: {property.postedBy}</p>
            {submitted ? (
              <div className="enquiry-card__success">
                <Check size={20} color="var(--success)" />
                <p>{lang === "hi" ? "आपकी पूछताछ भेज दी गई है!" : "Your enquiry has been sent!"}</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="enquiry-form">
                <input
                  type="text"
                  placeholder={lang === "hi" ? "आपका नाम" : "Your name"}
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder={strings.auth.mobile[lang]}
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
                <input
                  type="email"
                  placeholder={strings.auth.email[lang]}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  placeholder={lang === "hi" ? "संदेश (वैकल्पिक)" : "Message (optional)"}
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button type="submit" className="btn btn--primary">{strings.property.sendEnquiry[lang]}</button>
              </form>
            )}
            <button className="btn btn--outline enquiry-card__visit-btn">
              <CalendarClock size={16} /> {strings.property.scheduleVisit[lang]}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

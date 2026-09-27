import { Link } from "react-router-dom";
import { MapPin, BadgeCheck, Heart, MessageCircle } from "lucide-react";
import type { Property } from "../data/types";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../data/strings";
import { formatPrice } from "../utils/format";
import PropertyArt from "./PropertyArt";

export default function PropertyCard({ property }: { property: Property }) {
  const { lang } = useLanguage();
  const title = lang === "hi" ? property.titleHi : property.title;

  return (
    <Link to={`/properties/${property.id}`} className="property-card">
      <div className="property-card__art">
        <PropertyArt id={property.id} type={property.type} />
        <span className="property-card__badge">
          {strings.listingTypes[property.listingType][lang]}
        </span>
        {property.verified && (
          <span className="property-card__verified" title={strings.property.verified[lang]}>
            <BadgeCheck size={14} /> {strings.property.verified[lang]}
          </span>
        )}
      </div>
      <div className="property-card__body">
        <div className="property-card__price">{formatPrice(property.price, property.listingType, lang)}</div>
        <h3 className="property-card__title">{title}</h3>
        <div className="property-card__loc">
          <MapPin size={14} /> {property.area}
        </div>
        <div className="property-card__meta">
          {property.khasra !== "—" && (
            <span>
              {strings.property.khasra[lang]}: {property.khasra}
            </span>
          )}
          <span>{property.sizeSqft.toLocaleString("en-IN")} {strings.common.sqft[lang]}</span>
        </div>
        <div className="property-card__footer">
          <span className="property-card__stat">
            <Heart size={13} /> {property.likes}
          </span>
          <span className="property-card__stat">
            <MessageCircle size={13} /> {property.comments.length}
          </span>
        </div>
      </div>
    </Link>
  );
}

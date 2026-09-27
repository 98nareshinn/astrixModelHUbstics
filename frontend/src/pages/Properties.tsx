import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useData } from "../context/DataContext";
import { strings } from "../data/strings";
import PropertyCard from "../components/PropertyCard";
import type { ListingType, PropertyType } from "../data/types";

export default function Properties() {
  const { lang } = useLanguage();
  const { properties } = useData();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [listingType, setListingType] = useState<ListingType | "all">("all");
  const [propType, setPropType] = useState<PropertyType | "all">("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (p.status !== "PUBLISHED") return false;
      if (listingType !== "all" && p.listingType !== listingType) return false;
      if (propType !== "all" && p.type !== propType) return false;
      if (verifiedOnly && !p.verified) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.title} ${p.titleHi} ${p.area} ${p.khasra} ${p.address}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [properties, listingType, propType, verifiedOnly, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams(query ? { q: query } : {});
  };

  const clear = () => {
    setListingType("all");
    setPropType("all");
    setVerifiedOnly(false);
    setQuery("");
    setParams({});
  };

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{strings.nav.properties[lang]}</h1>
        <p>{filtered.length} {lang === "hi" ? "प्रॉपर्टी मिलीं" : "properties found"}</p>
      </div>

      <form className="listing-search" onSubmit={handleSearch}>
        <Search size={18} />
        <input
          type="text"
          placeholder={strings.home.searchPlaceholder[lang]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setShowFilters((s) => !s)}>
          <SlidersHorizontal size={16} /> {strings.filters.title[lang]}
        </button>
        <button type="submit" className="btn btn--primary btn--sm">{strings.home.searchBtn[lang]}</button>
      </form>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>{strings.filters.listingType[lang]}</label>
            <div className="chip-row">
              {(["all", "sale", "rent", "lease"] as const).map((lt) => (
                <button
                  key={lt}
                  className={`chip ${listingType === lt ? "chip--active" : ""}`}
                  onClick={() => setListingType(lt)}
                  type="button"
                >
                  {lt === "all" ? (lang === "hi" ? "सभी" : "All") : strings.listingTypes[lt][lang]}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>{strings.filters.propertyType[lang]}</label>
            <div className="chip-row">
              <button
                className={`chip ${propType === "all" ? "chip--active" : ""}`}
                onClick={() => setPropType("all")}
                type="button"
              >
                {lang === "hi" ? "सभी" : "All"}
              </button>
              {Object.entries(strings.propertyTypes).map(([key, val]) => (
                <button
                  key={key}
                  className={`chip ${propType === key ? "chip--active" : ""}`}
                  onClick={() => setPropType(key as PropertyType)}
                  type="button"
                >
                  {val[lang]}
                </button>
              ))}
            </div>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} />
            {strings.filters.verifiedOnly[lang]}
          </label>

          <button className="btn btn--ghost btn--sm" onClick={clear} type="button">
            <X size={14} /> {strings.filters.clear[lang]}
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>{lang === "hi" ? "कोई प्रॉपर्टी नहीं मिली। फ़िल्टर बदलकर देखें।" : "No properties found. Try adjusting filters."}</p>
        </div>
      ) : (
        <div className="property-grid">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, ImagePlus, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { strings } from "../data/strings";
import type { Property, PropertyType, ListingType } from "../data/types";

const propertyTypeKeys = Object.keys(strings.propertyTypes) as PropertyType[];

export default function Upload() {
  const { lang } = useLanguage();
  const { addProperty } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "house" as PropertyType,
    listingType: "sale" as ListingType,
    price: "",
    khasra: "",
    area: "",
    address: "",
    sizeSqft: "",
    facing: "",
    description: "",
  });

  const isAdmin = user?.role === "admin";

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `p-${Date.now()}`;
    const newProperty: Property = {
      id,
      title: form.title,
      titleHi: form.title,
      type: form.type,
      listingType: form.listingType,
      price: Number(form.price) || 0,
      priceLabel: form.price,
      khasra: form.khasra || "—",
      propertyNo: `BS-PR-${Math.floor(1000 + Math.random() * 9000)}`,
      area: form.area,
      address: form.address,
      sizeSqft: Number(form.sizeSqft) || 0,
      facing: form.facing || "—",
      roadWidthFt: 20,
      landType: "आवासीय (Residential)",
      description: form.description,
      descriptionHi: form.description,
      amenities: [],
      images: [],
      status: isAdmin ? "PUBLISHED" : "PENDING",
      verified: isAdmin,
      postedBy: user?.name || (lang === "hi" ? "आगंतुक" : "Guest"),
      postedByRole: isAdmin ? "admin" : "public",
      postedAt: new Date().toISOString().slice(0, 10),
      lat: 26.1011 + (Math.random() - 0.5) * 0.03,
      lng: 74.3197 + (Math.random() - 0.5) * 0.03,
      likes: 0,
      comments: [],
    };
    addProperty(newProperty);
    setSubmitted(true);
    setTimeout(() => navigate(isAdmin ? `/properties/${id}` : "/dashboard"), 1400);
  };

  if (submitted) {
    return (
      <div className="container section upload-success">
        <Check size={48} color="var(--success)" />
        <h2>{lang === "hi" ? "सबमिट हो गया!" : "Submitted!"}</h2>
        <p>
          {isAdmin
            ? (lang === "hi" ? "आपकी प्रॉपर्टी लाइव हो गई है।" : "Your property is now live.")
            : (lang === "hi" ? "आपकी प्रॉपर्टी समीक्षा में भेज दी गई है।" : "Your property has been sent for review.")}
        </p>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{strings.upload.title[lang]}</h1>
        <p>{strings.upload.subtitle[lang]}</p>
      </div>

      {!isAdmin && (
        <div className="upload-steps">
          {[strings.upload.step1, strings.upload.step2, strings.upload.step3, strings.upload.step4].map((s, i) => (
            <div className="upload-step" key={i}>
              <span className="upload-step__num">{i + 1}</span>
              <span>{s[lang]}</span>
            </div>
          ))}
        </div>
      )}

      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            <span>{strings.upload.title_field[lang]}</span>
            <input type="text" required value={form.title} onChange={(e) => update("title", e.target.value)} />
          </label>

          <label className="form-field">
            <span>{strings.filters.propertyType[lang]}</span>
            <select value={form.type} onChange={(e) => update("type", e.target.value)}>
              {propertyTypeKeys.map((k) => (
                <option key={k} value={k}>{strings.propertyTypes[k][lang]}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>{strings.filters.listingType[lang]}</span>
            <select value={form.listingType} onChange={(e) => update("listingType", e.target.value)}>
              <option value="sale">{strings.listingTypes.sale[lang]}</option>
              <option value="rent">{strings.listingTypes.rent[lang]}</option>
              <option value="lease">{strings.listingTypes.lease[lang]}</option>
            </select>
          </label>

          <label className="form-field">
            <span>{strings.property.price[lang]} (₹)</span>
            <input type="number" required value={form.price} onChange={(e) => update("price", e.target.value)} />
          </label>

          <label className="form-field">
            <span>{strings.property.khasra[lang]}</span>
            <input type="text" value={form.khasra} onChange={(e) => update("khasra", e.target.value)} placeholder="e.g. 412/7" />
          </label>

          <label className="form-field">
            <span>{lang === "hi" ? "इलाका / कॉलोनी" : "Area / Colony"}</span>
            <input type="text" required value={form.area} onChange={(e) => update("area", e.target.value)} />
          </label>

          <label className="form-field form-field--full">
            <span>{lang === "hi" ? "पूरा पता" : "Full Address"}</span>
            <input type="text" required value={form.address} onChange={(e) => update("address", e.target.value)} />
          </label>

          <label className="form-field">
            <span>{strings.property.size[lang]} (sq.ft)</span>
            <input type="number" required value={form.sizeSqft} onChange={(e) => update("sizeSqft", e.target.value)} />
          </label>

          <label className="form-field">
            <span>{strings.property.facing[lang]}</span>
            <input type="text" value={form.facing} onChange={(e) => update("facing", e.target.value)} placeholder="e.g. East" />
          </label>

          <label className="form-field form-field--full">
            <span>{strings.property.description[lang]}</span>
            <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
          </label>
        </div>

        <div className="upload-photo-zone">
          <ImagePlus size={28} />
          <p>{lang === "hi" ? "फोटो अपलोड करें (डेमो में सक्षम नहीं)" : "Upload photos (disabled in demo)"}</p>
        </div>

        <button type="submit" className="btn btn--primary btn--lg">
          <UploadCloud size={18} /> {strings.upload.submit[lang]}
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { MapPin } from "lucide-react";

interface BeawarMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: number;
  label?: string;
}

// Beawar, Rajasthan bounding box for a city-level view
const CITY_BBOX = "74.2650,26.0650,74.3750,26.1400";

export default function BeawarMap({ lat, lng, zoom = 15, height = 320, label }: BeawarMapProps) {
  const [failed, setFailed] = useState(false);
  const hasPoint = typeof lat === "number" && typeof lng === "number";
  const marker = hasPoint ? `&marker=${lat},${lng}` : "";
  const bbox = hasPoint
    ? `${lng! - 0.01},${lat! - 0.008},${lng! + 0.01},${lat! + 0.008}`
    : CITY_BBOX;

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker}`;
  const externalLink = hasPoint
    ? `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`
    : `https://www.openstreetmap.org/#map=13/26.1011/74.3197`;

  if (failed) {
    return (
      <div className="beawar-map beawar-map--fallback" style={{ height }}>
        <MapPin size={28} />
        <span>{label || "Beawar, Rajasthan"}</span>
        <a href={externalLink} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
          Open map ↗
        </a>
      </div>
    );
  }

  return (
    <div className="beawar-map" style={{ height }}>
      <iframe
        title={label || "Beawar Map"}
        src={src}
        style={{ border: 0, width: "100%", height: "100%", borderRadius: "inherit" }}
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <a className="beawar-map__link" href={externalLink} target="_blank" rel="noopener noreferrer">
        Larger map ↗
      </a>
    </div>
  );
}

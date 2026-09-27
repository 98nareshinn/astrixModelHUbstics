import { useLanguage } from "../context/LanguageContext";
import { strings } from "../data/strings";

export default function Logo({ size = 40, withText = true }: { size?: number; withText?: boolean }) {
  const { lang } = useLanguage();
  return (
    <div className="logo-block">
      <img src="/logo.svg" width={size} height={size} alt="Bhoomi Saathi" className="logo-mark" />
      {withText && (
        <div className="logo-text">
          <span className="logo-brand">{strings.brand[lang]}</span>
          <span className="logo-tagline">{strings.taglineShort[lang]}</span>
        </div>
      )}
    </div>
  );
}

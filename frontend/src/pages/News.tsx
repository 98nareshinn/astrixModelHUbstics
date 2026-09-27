import { Newspaper } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../data/strings";
import { newsItems } from "../data/seed";
import { formatDate } from "../utils/format";

export default function News() {
  const { lang } = useLanguage();

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{strings.news.title[lang]}</h1>
        <p>{strings.news.subtitle[lang]}</p>
      </div>

      <div className="news-list">
        {newsItems.map((n) => (
          <article className="news-item" key={n.id}>
            <span className="news-item__icon"><Newspaper size={20} color="var(--accent)" /></span>
            <div className="news-item__body">
              <span className="news-card__cat">{n.category}</span>
              <h2>{lang === "hi" ? n.titleHi : n.title}</h2>
              <p>{lang === "hi" ? n.summaryHi : n.summary}</p>
              <span className="news-item__meta">{formatDate(n.publishedAt, lang)} · {strings.news.source[lang]}: {n.source}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

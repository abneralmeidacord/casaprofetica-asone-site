import Image from "next/image";
import Header from "@/components/Header";
import EditorialContent from "@/components/EditorialContent";
import "./OffersPage.css";

export default function OffersPage({ document }) {
  const { frontmatter, content } = document;

  return (
    <article className="offers-page">
      <section className="offers-page__hero" aria-labelledby="offers-title">
        <div className="offers-page__background" aria-hidden="true">
          <Image src={frontmatter.heroImage} alt="" fill priority sizes="100vw" />
        </div>
        <Header activePage="ofertas" />
        <div className="container offers-page__heading">
          <h1 id="offers-title">{frontmatter.homeTitle || frontmatter.title}</h1>
        </div>
      </section>

      <div className="offers-page__body">
        <div className="container">
          <div className="offers-page__intro">
            <p className="offers-page__lead">{frontmatter.lead}</p>
            <EditorialContent source={content} />
          </div>
          <section className="offers-page__contribution" aria-labelledby="contribution-title">
            <h2 id="contribution-title">{frontmatter.contributionTitle}</h2>
            <div className="offers-page__pix">
              <h3>Pix</h3>
              <p>{frontmatter.pixKey}</p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

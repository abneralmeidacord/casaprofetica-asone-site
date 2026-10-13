import Image from "next/image";
import Header from "@/components/Header";
import EditorialContent from "@/components/EditorialContent";
import "./AboutPage.css";

export default function AboutPage({ document }) {
  const { frontmatter } = document;

  return (
    <article className="about-page">
      <Header activePage="quem-somos" />
      <h1 className="sr-only">{frontmatter.title}</h1>
      <div className="container about-page__content">
        <Image
          className="about-page__image"
          src={frontmatter.visionImage}
          alt={frontmatter.visionAlt}
          width={1009}
          height={686}
          sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1073px) calc(100vw - 64px), 1009px"
          priority
        />
        <div className="about-page__sections">
          <section aria-labelledby="vision-title">
            <h2 id="vision-title">{frontmatter.visionTitle}</h2>
            <EditorialContent source={frontmatter.visionText} />
          </section>
          <section aria-labelledby="mission-title">
            <h2 id="mission-title">{frontmatter.missionTitle}</h2>
            <EditorialContent source={frontmatter.missionText} />
          </section>
        </div>
      </div>
    </article>
  );
}

import Image from "next/image";
import EditorialContent from "./EditorialContent";

export default function PastorCard({ document }) {
  const { frontmatter, content } = document;
  return (
    <article className="pastor-card">
      <Image
        className="pastor-card__portrait"
        src={frontmatter.image}
        alt={frontmatter.alt}
        width={840}
        height={1050}
        sizes="(max-width: 760px) 80vw, (max-width: 1100px) 30vw, 360px"
      />
      <div className="pastor-card__content">
        <h3>{frontmatter.name}</h3>
        <EditorialContent source={content} />
      </div>
    </article>
  );
}

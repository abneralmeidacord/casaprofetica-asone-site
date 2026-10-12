import Image from "next/image";

export default function ConnectCard({ document }) {
  const { frontmatter } = document;
  return (
    <article className="connect-card">
      <Image
        className="connect-card-image"
        src={frontmatter.image}
        alt={frontmatter.alt}
        width={360}
        height={200}
        objectFit="cover"
        style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}
      />
      <div className="connect-card-content">
        <h4>{frontmatter.name}</h4>
        <div className="connect-card-description">
          <p>{frontmatter.description}</p>
        </div>
      </div>
    </article>
  );
}

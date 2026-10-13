import Image from "next/image";
import Link from "next/link";
import { getConnectCategories } from "@/lib/connects.mjs";
import "./ConnectCard.css";

export default function ConnectCard({ document }) {
  const { frontmatter } = document;
  const cardCategories = getConnectCategories(frontmatter.category);
  return (
    <article className="connect-card">
      <Link href={`/connects/${document.slug}`} className="connect-card-link" aria-label={`Conhecer o Connect ${frontmatter.name}`}>
        <Image
          className="connect-card-image"
          src={frontmatter.image}
          alt={frontmatter.alt}
          width={360}
          height={200}
          style={{
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
          sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 45vw, 360px"
        />
        <div className="connect-card-content">
          <h4>{frontmatter.name}</h4>
          <div className="connect-card-description">
            <p>{frontmatter.description}</p>
          </div>
          <div className="connect-card-category-container">
            {cardCategories.map((category) => {
              const label = category;
              const color =
                label === "Jovens"
                  ? "var(--orange-asone)"
                  : label === "Adolescentes"
                    ? "var(--green)"
                    : label === "Jovens Adultos"
                      ? "var(--yellow-asone)"
                      : label === "Mulheres"
                        ? "var(--pink)"
                        : label === "Adultos"
                          ? "var(--black-asone)"
                          : label === "Famílias"
                            ? "var(--cyan)"
                            : "var(--gray-asone)";

              return (
                <p
                  key={category}
                  className="connect-card-category"
                  style={{ "--category-color": color }}
                >
                  {label}
                </p>
              );
            })}
          </div>
        </div>
      </Link>
    </article>
  );
}

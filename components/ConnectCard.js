import Image from "next/image";

const categories = {
  jvs: "Jovens",
  adls: "Adolescentes",
  young_adults: "Jovens Adultos",
  adults: "Adultos",
  family: "Famílias",
  women: "Mulheres",
  men: "Homens",
  children: "Crianças",
};

export default function ConnectCard({ document }) {
  const { frontmatter } = document;
  const cardCategories = Array.isArray(frontmatter.category)
    ? frontmatter.category
    : frontmatter.category
      ? [frontmatter.category]
      : [];
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
        <div className="connect-card-category-container">
          {cardCategories.map((category) => {
            const label = categories[category] || category;
            const color =
              label === "Jovens"
                ? "var(--orange-asone)"
                : label === "Adolescentes"
                  ? "#23CC4B"
                  : label === "Jovens Adultos"
                    ? "var(--yellow-asone)"
                    : label === "Mulheres"
                      ? "var(--pink)"
                      : label === "Adultos"
                        ? "var(--black-asone)"
                        : label === "Famílias"
                          ? "#00BEDD"
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
    </article>
  );
}

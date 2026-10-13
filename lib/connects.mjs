const categoryLabels = {
  jvs: "Jovens",
  adls: "Adolescentes",
  young_adults: "Jovens Adultos",
  adults: "Adultos",
  family: "Famílias",
  women: "Mulheres",
  men: "Homens",
  children: "Crianças",
};

function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase("pt-BR");
}

export function getConnectWhatsAppUrl(phone) {
  const number = String(phone ?? "").replace(/\D/g, "");
  return /^[1-9]\d{7,14}$/.test(number) ? `https://wa.me/${number}` : null;
}

export function getConnectCategories(category) {
  const values = Array.isArray(category) ? category : category ? [category] : [];
  return values.map((value) => categoryLabels[value] || value).filter(Boolean);
}

export function getConnectFilterOptions(documents) {
  const unique = (values) => [...new Set(values.filter((value) => value && value.trim()))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
  const days = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const frontmatters = documents.map(({ frontmatter }) => frontmatter);

  return {
    categories: unique(frontmatters.flatMap(({ category }) => getConnectCategories(category))),
    days: unique(frontmatters.map(({ day }) => day)).sort((a, b) => {
      const index = (day) => {
        const position = days.findIndex((value) => normalize(value) === normalize(day));
        return position === -1 ? days.length : position;
      };
      return index(a) - index(b) || a.localeCompare(b, "pt-BR");
    }),
    neighborhoods: unique(frontmatters.map(({ neighborhood }) => neighborhood)),
  };
}

export function filterConnects(documents, { query = "", category = "", day = "", neighborhood = "" } = {}) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);

  return documents.filter(({ frontmatter }) => {
    const categories = getConnectCategories(frontmatter.category);
    const searchText = normalize([
      frontmatter.name, frontmatter.description, ...categories,
      frontmatter.day, frontmatter.neighborhood,
    ].filter(Boolean).join(" "));

    return (!category || categories.some((value) => normalize(value) === normalize(category)))
      && (!day || normalize(frontmatter.day) === normalize(day))
      && (!neighborhood || normalize(frontmatter.neighborhood) === normalize(neighborhood))
      && terms.every((term) => searchText.includes(term));
  });
}

import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import EditorialContent from "@/components/EditorialContent";
import Connects from "./connects";
import OffersPage from "./OffersPage";
import AboutPage from "./AboutPage";
import { getContent, listContent } from "@/lib/content.mjs";
import "../../EditorialPage.css";
import "./ConnectsPage.css";

export async function generateStaticParams() {
  return (await listContent("paginas")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = await getContent("paginas", slug);
  return doc ? { title: doc.frontmatter.title, description: doc.frontmatter.lead } : { title: "Página não encontrada" };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const doc = await getContent("paginas", slug);
  if (!doc) notFound();
  if (slug === "quem-somos") return <AboutPage document={doc} />;
  if (slug === "ofertas") return <OffersPage document={doc} />;
  const isConnects = slug === "connects";
  return (
    <>
      <Header solid={!isConnects} light={isConnects} activePage={slug} />
      <article className={`${isConnects ? "connects-page" : "editorial-page"} container`}>
        {!isConnects && <Link href="/" className="back-link">← Voltar ao início</Link>}
        <h1>{doc.frontmatter.title}</h1>
        {!isConnects && <p className="lead">{doc.frontmatter.lead}</p>}
        <EditorialContent source={doc.content} />
        {isConnects && <Connects />}
      </article>
    </>
  );
}

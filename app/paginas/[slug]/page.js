import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import EditorialContent from "@/components/EditorialContent";
import { getContent, listContent } from "@/lib/content.mjs";

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
  return (
    <>
      <Header solid />
      <article className="editorial-page container">
        <Link href="/" className="back-link">← Voltar ao início</Link>
        <h1>{doc.frontmatter.title}</h1>
        <p className="lead">{doc.frontmatter.lead}</p>
        <EditorialContent source={doc.content} />
      </article>
    </>
  );
}

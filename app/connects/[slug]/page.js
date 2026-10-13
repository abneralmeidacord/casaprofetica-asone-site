import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import EditorialContent from "@/components/EditorialContent";
import { getContent, listContent } from "@/lib/content.mjs";
import { getConnectWhatsAppUrl } from "@/lib/connects.mjs";
import "./ConnectPage.css";

export async function generateStaticParams() {
  return (await listContent("connects")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = await getContent("connects", slug);
  return doc
    ? {
        title: `Connect ${doc.frontmatter.name}`,
        description: doc.frontmatter.description,
      }
    : { title: "Connect não encontrado" };
}

export default async function ConnectPage({ params }) {
  const { slug } = await params;
  const doc = await getContent("connects", slug);
  if (!doc) notFound();

  const { name, image, alt, whatsapp } = doc.frontmatter;
  const whatsappUrl = getConnectWhatsAppUrl(whatsapp);

  return (
    <div className="connect-detail-container">
      <Header light activePage="connects" />
      <article className="connect-detail container">
        <h1>Connect {name}</h1>
        <Image
          className="connect-detail__image"
          src={image}
          alt={alt || `Connect ${name}`}
          width={1120}
          height={480}
          objectFit="cover"
          sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1184px) calc(100vw - 64px), 1120px"
          priority
        />
        <div className="connect-detail-content">
          <EditorialContent source={doc.content} />
          {whatsappUrl && (
            <a
              className="connect-detail__button"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Se conectar ao Connect ${name} pelo WhatsApp (abre em nova aba)`}
            >
              Se Conectar
            </a>
          )}
        </div>
      </article>
    </div>
  );
}

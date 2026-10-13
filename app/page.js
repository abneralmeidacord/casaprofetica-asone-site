import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PastorCard from "@/components/PastorCard";
import EditorialContent from "@/components/EditorialContent";
import { getContent, listContent } from "@/lib/content.mjs";
import "./Home.css";

export async function generateMetadata() {
  const home = await getContent("paginas", "inicio");
  return home
    ? {
        title: { absolute: home.frontmatter.title },
        description: home.frontmatter.lead,
      }
    : {};
}

export default async function Home() {
  const [home, church, team, connects] = await Promise.all([
    getContent("paginas", "inicio"),
    getContent("paginas", "quem-somos"),
    listContent("equipe"),
    listContent("connects"),
  ]);
  if (!home || !church) notFound();
  const { frontmatter: info } = home;
  const pastors = [...team].sort(
    (a, b) =>
      (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999) ||
      a.slug.localeCompare(b.slug),
  );

  return (
    <div className="home">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__background" aria-hidden="true">
          <Image src={info.heroImage} alt="" fill priority sizes="100vw" />
        </div>
        <Header />
        <div className="hero__welcome">
          <p>{info.welcome}</p>
          <h1 id="home-title">
            <span className="hero__church-name">{info.churchName}</span>
            <span className="hero__brand-name">{info.brandName}</span>
          </h1>
        </div>
      </section>

      <section
        className="about home-section"
        id="quem-somos"
        aria-labelledby="about-title"
      >
        <Image
          className="about__watermark"
          src="/images/logos/Grafismo-branco-casa.png"
          alt=""
          width={800}
          height={800}
          aria-hidden="true"
        />
        <div className="container about__grid">
          <div className="section-heading">
            <h2 id="about-title">{church.frontmatter.homeTitle}</h2>
            <span className="section-tag">Sobre nós</span>
          </div>
          <div className="about__content">
            <EditorialContent source={church.content} />
            <Link href="/paginas/quem-somos" className="outline-button">
              Quem Somos
            </Link>
          </div>
        </div>
      </section>

      <section
        className="pastors home-section"
        id="pastores"
        aria-labelledby="pastors-title"
      >
        <div className="container">
          <div className="section-divider" aria-hidden="true">
            <Image
              src="/images/identidade/divisor.svg"
              alt=""
              width={360}
              height={5}
              unoptimized
            />
          </div>
          <div className="pastors__heading">
            <h2 id="pastors-title">{info.teamTitle}</h2>
            <span className="section-tag section-tag--vertical">Pastores</span>
          </div>
          <div className="pastors__list">
            {pastors.length ? (
              pastors.map((document) => (
                <PastorCard key={document.slug} document={document} />
              ))
            ) : (
              <p className="empty-state">Nenhum integrante cadastrado.</p>
            )}
          </div>
        </div>
      </section>

      <section
        className="visit home-section"
        id="localizacao"
        aria-labelledby="visit-title"
      >
        <div className="visit__background" aria-hidden="true">
          <Image src={info.locationImage} alt="" fill sizes="100vw" />
        </div>
        <div className="container visit__inner">
          <div className="section-divider" aria-hidden="true">
            <Image
              src="/images/identidade/divisor.svg"
              alt=""
              width={360}
              height={5}
              unoptimized
            />
          </div>
          <div className="visit__grid">
            <div className="visit__information">
              <h2 id="visit-title">{info.locationTitle}</h2>
              <span className="section-tag">Localização</span>
              <div className="visit__detail">
                <span className="visit__icon">
                  <Image
                    src="/images/identidade/relogio.svg"
                    alt=""
                    width={83.3334}
                    height={83.3334}
                    unoptimized
                  />
                </span>
                <p className="visit__schedule">{info.serviceSchedule}</p>
              </div>
              <div className="visit__detail">
                <span className="visit__icon">
                  <Image
                    src="/images/identidade/localizacao.svg"
                    alt=""
                    width={66.6667}
                    height={83.3333}
                    unoptimized
                  />
                </span>
                <address>{info.address}</address>
              </div>
            </div>
            <div className="visit__map">
              <div className="visit__map-image">
                {/*<Image
                  src={info.mapImage}
                  alt={info.mapAlt}
                  width={1167}
                  height={1041}
                  sizes="(max-width: 760px) 90vw, 584px"
                />*/}
                <iframe
                  title={info.mapAlt}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.797324477327!2d-44.7624639!3d-20.43242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa0930029aac857%3A0x7872e62610fcd7b1!2sCasa%20Prof%C3%A9tica%20AS%20ONE!5e0!3m2!1spt-BR!2sbr!4v1791687532159!5m2!1spt-BR!2sbr"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
              <a
                className="outline-button"
                href={info.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir no Maps
                <span className="sr-only"> (abre em uma nova aba)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

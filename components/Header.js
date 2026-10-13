import Image from "next/image";
import Link from "next/link";
import "./Header.css";

function NavigationLinks({ activePage }) {
  return <><Link href="/paginas/quem-somos" aria-current={activePage === "quem-somos" ? "page" : undefined}>QUEM SOMOS</Link><Link href="/paginas/ofertas" aria-current={activePage === "ofertas" ? "page" : undefined}>OFERTAS</Link><Link href="/paginas/connects" aria-current={activePage === "connects" ? "page" : undefined}>CONNECTS</Link></>;
}

export default function Header({ solid = false, light = false, activePage }) {
  return (
    <header className={`site-header${solid ? " site-header--solid" : ""}${light ? " site-header--light" : ""}`}>
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="Casa Profética AS ONE — início">
          <Image src={light ? "/images/logos/Grafismo-casa.png" : "/images/logos/Grafismo-branco-casa.png"} alt="" width={80} height={80} priority />
        </Link>
        <nav className="desktop-navigation" aria-label="Navegação principal"><NavigationLinks activePage={activePage} /></nav>
        {/*{light && <span className="site-header__language" title="Site em português do Brasil" aria-label="Português do Brasil">
          <Image src="/images/identidade/dark-globo.svg" alt="" width={40} height={40} unoptimized />
        </span>}
        <span className="site-header__language" title="Site em português do Brasil" aria-label="Português do Brasil">
          <Image src="/images/identidade/globo.svg" alt="" width={40} height={40} unoptimized />
        </span> 
        TERMINAR QUANDO TIVER O I18N*/}
        <details className="mobile-navigation">
          <summary>Menu</summary>
          <nav aria-label="Navegação principal no celular"><NavigationLinks activePage={activePage} /></nav>
        </details>
      </div>
    </header>
  );
}

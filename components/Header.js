import Image from "next/image";
import Link from "next/link";

function NavigationLinks() {
  return <><Link href="/paginas/quem-somos">QUEM SOMOS</Link><Link href="/paginas/ofertas">OFERTAS</Link><Link href="/paginas/connects">CONNECTS</Link></>;
}

export default function Header({ solid = false }) {
  return (
    <header className={`site-header${solid ? " site-header--solid" : ""}`}>
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="Casa Profética AS ONE — início">
          <Image src="/images/logos/Grafismo-branco-casa.png" alt="" width={80} height={80} priority />
        </Link>
        <nav className="desktop-navigation" aria-label="Navegação principal"><NavigationLinks /></nav>
        {/*<span className="site-header__language" title="Site em português do Brasil" aria-label="Português do Brasil">
          <Image src="/images/identidade/globo.svg" alt="" width={40} height={40} unoptimized />
        </span> 
        TERMINAR QUANDO TIVER O I18N*/}
        <details className="mobile-navigation">
          <summary>Menu</summary>
          <nav aria-label="Navegação principal no celular"><NavigationLinks /></nav>
        </details>
      </div>
    </header>
  );
}

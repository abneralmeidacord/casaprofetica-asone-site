import { getContent } from "@/lib/content.mjs";
import "./globals.css";

export async function generateMetadata() {
  const home = await getContent("paginas", "inicio");
  const title = home?.frontmatter.title || "Casa Profética AS ONE";
  return { title: { default: title, template: `%s | ${title}` }, description: home?.frontmatter.lead };
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <main id="conteudo" tabIndex={-1}>{children}</main>
      </body>
    </html>
  );
}

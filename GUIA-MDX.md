# Continuando o site da Casa Profética AS ONE

A home está em `app/page.js` e abre em `/`. Seu layout segue o frame **Main** do Figma: boas-vindas, apresentação, pastores e localização. Os documentos abaixo fornecem o conteúdo; o React define a aparência.

| O que editar | Arquivo |
| --- | --- |
| Nome, boas-vindas, foto do culto, horários, endereço e mapa | `content/paginas/inicio.mdx` |
| Apresentação da igreja e título dessa seção na home | `content/paginas/quem-somos.mdx` |
| Nome, retrato e biografia do pastor Michel | `content/equipe/michel-almeida.mdx` |
| Nome, retrato e biografia da pastora Viviane | `content/equipe/viviane-cordeiro.mdx` |
| Texto inicial de ofertas | `content/paginas/ofertas.mdx` |
| Apresentação inicial dos Connects | `content/paginas/connects.mdx` |

Os três destinos do menu já abrem pela rota editorial compartilhada. Seus layouts específicos do Figma, a listagem de Connects e os filtros são os próximos passos. O exemplo `boas-vindas.mdx` foi preservado.

## 1. Entenda o percurso de um documento

```text
content/paginas/quem-somos.mdx
          ↓ getContent("paginas", "quem-somos")
lib/content.mjs → gray-matter separa frontmatter e corpo
          ↓
app/page.js OU app/paginas/[slug]/page.js
          ↓
props → componentes React → EditorialContent → MDXRemote
          ↓
HTML apresentado pelo navegador
```

O frontmatter fica entre `---` e guarda campos estruturados. O corpo é o texto depois do segundo `---`: Markdown com parágrafos, títulos, listas e imagens. Use Markdown no corpo para continuar compatível com a prévia do Webtech Editor.

```mdx
---
title: Nossa missão
lead: Conheça o propósito da nossa igreja.
---

## Caminhamos juntos

Escreva aqui o texto aprovado pela instituição.

- Um primeiro compromisso.
- Um segundo compromisso.
```

O React acessa `doc.frontmatter.title` e `doc.frontmatter.lead`. Para apresentar o corpo, usa `<EditorialContent source={doc.content} />`. Um campo novo no YAML só aparece na tela se algum componente o consumir.

## 2. Crie outra página usando o slug

1. Crie `content/paginas/nossa-missao.mdx` com o exemplo acima.
2. Com `npm run dev` aberto, acesse `http://localhost:3000/paginas/nossa-missao`.
3. Acrescente um link onde quiser mostrar essa página:

```jsx
import Link from "next/link";

<Link href="/paginas/nossa-missao">Nossa missão</Link>
```

**Slug** é o nome do arquivo sem a extensão: `nossa-missao`. A pasta `[slug]` captura esse trecho da URL. O Next entrega `params`, e a rota existente faz:

```jsx
const { slug } = await params;
const doc = await getContent("paginas", slug);
if (!doc) notFound();
```

Você não precisa criar outro `page.js` para cada documento. Um novo arquivo já ganha seu endereço pela rota existente; um link no menu precisa ser acrescentado manualmente. Use nomes minúsculos, sem acentos nem espaços, separados por hífens.

O documento `inicio.mdx` fornece os dados da home porque `app/page.js` o busca explicitamente. O nome do arquivo sozinho não determina que um documento será a página `/`.

## 3. Cadastre outra pessoa sem alterar o React

Crie `content/equipe/nome-da-pessoa.mdx`:

```mdx
---
name: Nome aprovado pela igreja
position: Função da pessoa
image: /images/equipe/nome-da-pessoa/retrato.webp
alt: Descrição adequada do retrato
order: 3
---

Escreva a biografia aprovada pela pessoa e pela instituição.

Um segundo parágrafo pode explicar sua atuação na comunidade.
```

Adicione o retrato real em `public/images/equipe/nome-da-pessoa/retrato.webp`. A home usa `listContent("equipe")` e cria um `PastorCard` por documento. Não há um array fixo com as duas pessoas: novos documentos aparecem automaticamente. `order` controla a sequência; sem esse campo, o documento fica depois dos que têm ordem definida.

Os retratos atuais têm proporção 4:5. Use essa proporção para manter o desenho dos cards; as imagens do protótipo já incluem a moldura e o nome. A biografia é o corpo Markdown, não um campo de texto dentro do componente.

## 4. Organize os Connects como uma coleção

Uma **coleção** agrupa documentos do mesmo tipo. `paginas` reúne páginas; `equipe` reúne pessoas. Para os Connects, crie a coleção `connects`. Acrescente este objeto ao array `collections` de `cms/estrutura.json`, preservando os objetos existentes:

```json
{
  "id": "connects",
  "label": "Connects",
  "folder": "content/connects",
  "extension": "mdx",
  "fields": [
    { "name": "name", "label": "Nome", "widget": "string" },
    { "name": "category", "label": "Público-alvo", "widget": "string" },
    { "name": "description", "label": "Resumo", "widget": "text" },
    { "name": "day", "label": "Dia da semana", "widget": "string" },
    { "name": "neighborhood", "label": "Bairro", "widget": "string" },
    { "name": "image", "label": "Imagem", "widget": "image" },
    { "name": "alt", "label": "Descrição da imagem", "widget": "string" },
    { "name": "body", "label": "Descrição completa", "widget": "markdown" }
  ]
}
```

Depois crie `content/connects/adls-e-jvs.mdx` e sua imagem correspondente. Exemplo baseado no texto do protótipo; complete o bairro com a informação aprovada:

```mdx
---
name: Adl’s e Jvs
category: Jovens e adolescentes
description: Reúne semanalmente aos sábados às 18h.
day: sábado
neighborhood: A confirmar
image: /images/connects/adls-e-jvs/capa.webp
alt: Descrição da fotografia do grupo
---

## Sobre o grupo

Grupo de jovens e adolescentes que querem ser incendiados pelo Senhor.

Nos reunimos semanalmente aos sábados às 18h.
```

Use um arquivo por grupo. Os demais nomes, categorias e horários estão no seu Figma; confira os dados com a instituição antes de completar os documentos.

## 5. Faça a listagem e os detalhes

Crie `app/connects/page.js` para a listagem. Leia os documentos no servidor e passe cada um por props para um componente reutilizável:

```jsx
import Link from "next/link";
import { listContent } from "@/lib/content.mjs";

function ConnectCard({ document }) {
  const { slug, frontmatter } = document;
  return (
    <article>
      <h2><Link href={`/connects/${slug}`}>{frontmatter.name}</Link></h2>
      <p>{frontmatter.description}</p>
      <p>{frontmatter.category}</p>
    </article>
  );
}

export default async function ConnectsPage() {
  const groups = await listContent("connects");
  return (
    <section>
      <h1>Connects</h1>
      {groups.length
        ? groups.map(document => <ConnectCard key={document.slug} document={document} />)
        : <p>Nenhum Connect cadastrado.</p>}
    </section>
  );
}
```

Esse é o exemplo mínimo do fluxo de dados. Acrescente `Header`, imagens com `next/image` e classes CSS para chegar ao seu protótipo.

Crie `app/connects/[slug]/page.js` para os detalhes:

```jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import EditorialContent from "@/components/EditorialContent";
import { getContent, listContent } from "@/lib/content.mjs";

export async function generateStaticParams() {
  return (await listContent("connects")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = await getContent("connects", slug);
  return doc
    ? { title: doc.frontmatter.name, description: doc.frontmatter.description }
    : { title: "Connect não encontrado" };
}

export default async function ConnectPage({ params }) {
  const { slug } = await params;
  const doc = await getContent("connects", slug);
  if (!doc) notFound();

  return (
    <>
      <Header solid />
      <article className="editorial-page container">
        <Link href="/connects">← Voltar aos Connects</Link>
        <h1>{doc.frontmatter.name}</h1>
        <p className="lead">{doc.frontmatter.description}</p>
        <Image src={doc.frontmatter.image} alt={doc.frontmatter.alt}
          width={1119} height={478} sizes="(max-width: 760px) 90vw, 1119px" />
        <EditorialContent source={doc.content} />
      </article>
    </>
  );
}
```

Quando `/connects` estiver pronta, altere o link de Connects em `components/Header.js` de `/paginas/connects` para `/connects`.

Para implementar os filtros, crie um componente com `"use client"` e use `useState` para nome, público-alvo, dia e bairro. A página no servidor continua chamando `listContent`; passe apenas `{ slug, ...frontmatter }` ao componente cliente. Ele pode usar `filter()` e renderizar os cards. Não importe `lib/content.mjs` no cliente: ele lê o disco e usa `server-only`.

## 6. Continue as demais telas do Figma

1. **Quem somos:** o texto já está em MDX. Para um layout exclusivo, crie `app/quem-somos/page.js`, leia `getContent("paginas", "quem-somos")` e implemente imagem de visão, missão e os títulos do Figma. Separe visão e missão em documentos próprios se quiser mostrar seus corpos em posições diferentes. Atualize os links do cabeçalho e da home para `/quem-somos`.
2. **Ofertas:** crie `app/ofertas/page.js`, leia o documento existente e monte o hero e a seção de contribuição do protótipo. A chave Pix veio do seu Figma; revise-a com a igreja. Mantenha os dados de contribuição no MDX e atualize o link do cabeçalho.
3. **Connects:** siga as etapas 4 e 5; depois acrescente imagens, filtros acessíveis com `label` e os detalhes do grupo.
4. **Equipe:** adicione pessoas autorizadas e mantenha cada biografia no corpo de um MDX. Se a coleção passar a incluir outras funções, troque `teamTitle` em `inicio.mdx` e o rótulo “Pastores” no componente.

## 7. Imagens e atualização

| Conceito | Exemplo |
| --- | --- |
| Coleção | `equipe` |
| Slug | `michel-almeida` |
| Documento | `content/equipe/michel-almeida.mdx` |
| Rota editorial | `/paginas/quem-somos` |
| Arquivo de imagem | `public/images/equipe/michel-almeida/retrato.png` |
| URL da imagem | `/images/equipe/michel-almeida/retrato.png` |

Não coloque `public` ou `@` no caminho da imagem exibida no navegador. Use a extensão real. URLs de exportação do Figma expiram: as imagens da home foram baixadas para o projeto.

O `estrutura.json` descreve coleções e campos para o Webtech Editor; não cria layouts, filtros ou rotas automaticamente. Novos campos podem ser opcionais dependendo do documento; esta base não valida o frontmatter por completo.

Em desenvolvimento, salve os arquivos com `npm run dev` aberto e recarregue. Em produção, o conteúdo é pré-renderizado: refaça o build e reinicie o servidor. No Webtech Editor, salvar rascunho e publicar são etapas diferentes; publicar altera o GitHub, e a aplicação precisa de um novo build/deploy. O checkout local também precisa receber os arquivos atualizados.

## 8. Confira o objetivo da atividade

O professor autorizou a troca da instituição. O desafio original pede três produtos, três integrantes, detalhes de produtos e teste de adição de documentos. A home do seu Figma tem **dois pastores e nenhum catálogo**; implementar esse desenho não conclui todos esses critérios.

Uma adaptação possível para combinar com a igreja é usar **Connects no lugar de produtos**, com pelo menos três grupos e páginas `/connects/[slug]`, e completar a equipe com uma terceira pessoa autorizada. O professor precisa definir se essa equivalência e os novos nomes de coleção atendem à avaliação. Se ele exigir o contrato original, mantenha `produtos` e `/produtos/[slug]`, mesmo que o conteúdo represente iniciativas da igreja.

Faça o teste decisivo após completar as coleções: crie um novo grupo e uma nova pessoa apenas com MDX e imagens; confirme que aparecem sem alterar o JSX. Mude nome e biografia, remova os documentos de teste e confira o resultado. Teste ainda coleções vazias, slug inexistente, teclado e larguras de 390 e 1280 px.

```bash
npm run dev
npm run check
```

Documente a entrega em `ENTREGA.md` com as capturas, os resultados e as pendências. O `README.md` e o `DESAFIO.md` originais continuam como referência da atividade.

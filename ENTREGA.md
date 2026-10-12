# Entrega parcial — Home da Casa Profética AS ONE

## Escopo

Implementação da página inicial `/` a partir do frame **Main** do [protótipo AS ONE](https://www.figma.com/design/ndyRMOm8ULTqfcphmlcYB6/AS-ONE---SITE?node-id=20-4), adaptando a instituição com autorização informada pelo aluno. O nome Casa Profética AS ONE foi confirmado pelo aluno.

A home tem boas-vindas, apresentação da igreja, dois pastores e localização com link para o Google Maps. As imagens e ícones vieram do Figma; o grafismo branco já existente no projeto foi reutilizado após confirmar que é o mesmo arquivo. Montserrat é carregada pelo CSS global.

Textos institucionais, títulos da home, horários, endereço e caminhos das fotografias vêm de `content/paginas/`. Cada pastor tem um documento em `content/equipe/`, e seu corpo Markdown é renderizado com `EditorialContent`. A coleção aceita novas pessoas sem alterar a lista em React.

O menu abre três páginas editoriais iniciais: `/paginas/quem-somos`, `/paginas/ofertas` e `/paginas/connects`. Elas usam a rota genérica existente; seus layouts específicos do Figma e os filtros de Connects ainda não foram implementados. O ícone de globo indica português; não há seletor de idioma.

## Execução

Use Node.js 22 ou superior. Para instalar as dependências em um novo checkout e abrir o desenvolvimento:

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. Para validar e executar a versão de produção:

```bash
npm run check
npm start
```

Pare o servidor de desenvolvimento antes de iniciar produção na mesma porta. Depois de alterar MDX em produção, faça outro build e reinicie o servidor.

## Verificações realizadas em 10/10/2026

- `npm run check`: passou, incluindo ESLint, os seis testes do leitor e o build de produção. A execução final não apresentou erros nem avisos de lint.
- Home em larguras CSS de 390, 800, 1280 e 1440 px: não houve rolagem horizontal.
- Comparação com o Figma em desktop: quatro seções, fotos, grafismo, mapa e ícones conferidos. Os retratos mantêm proporção 4:5; os SVGs mantêm suas dimensões originais.
- Todos os dez arquivos de imagem/ícone usados na home existem localmente e não estão vazios. Todas as imagens renderizadas foram carregadas no navegador.
- Menu no celular: abre e fecha com Enter; navegação para Connects confirmada.
- Os três destinos do menu retornaram HTTP 200.
- `/paginas/arquivo-inexistente` retornou HTTP 404.
- Teste de conteúdo: um MDX temporário de equipe apareceu com nome e biografia na home sem alterar o React. Ao remover o documento, a entrada desapareceu. O arquivo temporário foi removido.
- Equipe vazia: a home retornou HTTP 200 e mostrou “Nenhum integrante cadastrado.” Os dois documentos foram restaurados após a verificação.

Capturas da implementação:

- [Desktop — home completa](docs/capturas/home-desktop.png)
- [Celular — home completa](docs/capturas/home-mobile.png)
- [Desktop — primeira seção](docs/capturas/home-hero.png)
- [Referência original do Figma](docs/capturas/figma-home.png)

As cores seguem a identidade do protótipo. A verificação de responsividade e teclado não representa uma auditoria completa de acessibilidade; o contraste das combinações de laranja e branco precisa ser revisado para a entrega final.

## Respostas sobre a arquitetura

1. **O que `estrutura.json` controla?** As coleções, suas pastas, extensão e os campos apresentados pelo editor. Layouts, links, filtros e rotas precisam ser implementados em React/Next.js.
2. **Coleção, slug, rota e imagens:** `equipe` é a coleção; `michel-almeida` é um slug. A rota é um endereço atendido por `app/`; ela não é criada pelo schema. A pasta `public/images/equipe/michel-almeida/` guarda o retrato, acessado por `/images/equipe/michel-almeida/retrato.png`.
3. **Frontmatter e corpo:** o YAML guarda dados como nome e imagem; o corpo Markdown guarda a biografia ou o texto editorial. `gray-matter` separa os dois, e `MDXRemote` renderiza o corpo.
4. **Por que no servidor?** O leitor precisa acessar o sistema de arquivos. Leitura e compilação MDX ficam nos Server Components; componentes cliente recebem dados para interações, como filtros.
5. **Do editor ao site:** salvar rascunho não publica. A publicação envia arquivos ao GitHub; o site apresenta a versão nova após build/deploy. O checkout local também precisa receber essas alterações.

## Pendências do desafio completo

Esta entrega cobre a home solicitada e sua base de conteúdo. O desafio original pede três produtos e três integrantes, catálogo na home e `/produtos/[slug]`; esses critérios ainda não estão concluídos.

Para a adaptação à igreja, a proposta é usar Connects como catálogo de grupos e completar a equipe com uma terceira pessoa autorizada. A equivalência e os nomes das coleções/rotas precisam corresponder ao que o professor aprovar. Não foram inventados dados de uma terceira pessoa.

Próximos passos: implementar listagem e detalhe dos Connects, seus filtros, os layouts completos de Quem somos e Ofertas e repetir o teste decisivo com novos documentos das duas coleções. O roteiro com exemplos está em [GUIA-MDX.md](GUIA-MDX.md).

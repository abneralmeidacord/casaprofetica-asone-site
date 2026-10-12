import { test } from "node:test";
import assert from "node:assert/strict";
import { filterConnects, getConnectFilterOptions } from "../lib/connects.mjs";

const documents = [
  { slug: "adls-jvs", frontmatter: { name: "Adl’s e Jvs", category: ["Jovens", "Adolescentes"], description: "Encontro às 18h", day: "sábado", neighborhood: "Centro" } },
  { slug: "raizes", frontmatter: { name: "Raízes", category: ["Jovens Adultos"], day: "quarta-feira", neighborhood: "Macacos" } },
  { slug: "resgate", frontmatter: { name: "Resgate", category: "family", day: "terça-feira", neighborhood: "Santa Inês" } },
  { slug: "edificados", frontmatter: { name: "Edificados", category: ["Famílias"], day: "quarta-feira", neighborhood: "Centro" } },
  { slug: "sem-dados", frontmatter: { name: "Novo grupo", neighborhood: "" } },
];
const slugs = (results) => results.map(({ slug }) => slug);

test("busca ignora acentos e maiúsculas e combina palavras de campos diferentes", () => {
  assert.deepEqual(slugs(filterConnects(documents, { query: "  RAIZES  " })), ["raizes"]);
  assert.deepEqual(slugs(filterConnects(documents, { query: "familias santa ines" })), ["resgate"]);
  assert.deepEqual(slugs(filterConnects(documents, { query: "18h adolescentes" })), ["adls-jvs"]);
  assert.deepEqual(filterConnects(documents, { query: "inexistente" }), []);
});

test("público-alvo encontra qualquer categoria do card e aceita códigos antigos", () => {
  assert.deepEqual(slugs(filterConnects(documents, { category: "Adolescentes" })), ["adls-jvs"]);
  assert.deepEqual(slugs(filterConnects(documents, { category: "Jovens" })), ["adls-jvs"]);
  assert.deepEqual(slugs(filterConnects(documents, { category: "Famílias" })), ["resgate", "edificados"]);
});

test("busca e os três filtros precisam coincidir no mesmo connect", () => {
  assert.deepEqual(slugs(filterConnects(documents, { query: "edif", category: "Famílias", day: "quarta-feira", neighborhood: "Centro" })), ["edificados"]);
  assert.deepEqual(filterConnects(documents, { category: "Famílias", day: "terça-feira", neighborhood: "Centro" }), []);
  assert.deepEqual(slugs(filterConnects(documents, { day: "sabado", neighborhood: "centro" })), ["adls-jvs"]);
});

test("opções vêm dos metadados, sem repetições ou bairros vazios e com dias em ordem", () => {
  const options = getConnectFilterOptions(documents);
  assert.deepEqual(options.categories, ["Adolescentes", "Famílias", "Jovens", "Jovens Adultos"]);
  assert.deepEqual(options.days, ["terça-feira", "quarta-feira", "sábado"]);
  assert.deepEqual(options.neighborhoods, ["Centro", "Macacos", "Santa Inês"]);
});

test("limpar os critérios recupera todos os documentos e lista vazia é aceita", () => {
  assert.deepEqual(filterConnects(documents, { query: "  ", category: "", day: "", neighborhood: "" }), documents);
  assert.deepEqual(filterConnects([]), []);
  assert.deepEqual(getConnectFilterOptions([]), { categories: [], days: [], neighborhoods: [] });
});

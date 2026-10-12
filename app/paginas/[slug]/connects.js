import ConnectFilters from "@/components/ConnectFilters";
import { listContent } from "@/lib/content.mjs";

export default async function Connects() {
  const documents = await listContent("connects");
  return <ConnectFilters documents={documents.map(({ slug, frontmatter }) => ({ slug, frontmatter }))} />;
}

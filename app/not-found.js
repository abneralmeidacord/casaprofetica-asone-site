import Link from "next/link";
import Header from "@/components/Header";
import "./EditorialPage.css";

export default function NotFound() {
  return <><Header solid /><div className="editorial-page container"><h1>Página não encontrada</h1><p>O endereço que você procurou não está disponível.</p><Link href="/">Voltar ao início</Link></div></>;
}

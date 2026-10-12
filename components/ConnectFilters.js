"use client";

import { useId, useState } from "react";
import Image from "next/image";
import ConnectCard from "@/components/ConnectCard";
import { filterConnects, getConnectFilterOptions } from "@/lib/connects.mjs";

export default function ConnectFilters({ documents }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [day, setDay] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const options = getConnectFilterOptions(documents);
  const results = filterConnects(documents, { query, category, day, neighborhood });
  const hasFilters = Boolean(query || category || day || neighborhood);

  function clearFilters() {
    setQuery("");
    setCategory("");
    setDay("");
    setNeighborhood("");
  }

  return (
    <div className="connects-container">
      <form className="connects-filters" role="search" onSubmit={(event) => event.preventDefault()}>
        <div className="connects-search">
          <label className="sr-only" htmlFor={`${id}-search`}>Buscar connect</label>
          <div className="connects-search-input">
            <Image src="/images/identidade/busca.svg" alt="" width={25} height={20} unoptimized />
            <input
              id={`${id}-search`}
              type="search"
              placeholder="Pesquisar pelo nome..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-controls={`${id}-results`}
            />
          </div>
        </div>
        <div className="connects-filter">
          <label className="sr-only" htmlFor={`${id}-category`}>Público-alvo</label>
          <select id={`${id}-category`} className={!category ? "connects-filter-placeholder" : undefined} value={category} onChange={(event) => setCategory(event.target.value)} aria-controls={`${id}-results`}>
            <option value="">Público-alvo</option>
            {options.categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <Image src="/images/identidade/seta.svg" alt="" width={25} height={20} unoptimized />
        </div>
        <div className="connects-filter">
          <label className="sr-only" htmlFor={`${id}-day`}>Dia da semana</label>
          <select id={`${id}-day`} className={!day ? "connects-filter-placeholder" : undefined} value={day} onChange={(event) => setDay(event.target.value)} aria-controls={`${id}-results`}>
            <option value="">Dia da semana</option>
            {options.days.map((value) => <option key={value} value={value}>{value.charAt(0).toLocaleUpperCase("pt-BR") + value.slice(1)}</option>)}
          </select>
          <Image src="/images/identidade/seta.svg" alt="" width={25} height={20} unoptimized />
        </div>
        <div className="connects-filter">
          <label className="sr-only" htmlFor={`${id}-neighborhood`}>Bairro</label>
          <select id={`${id}-neighborhood`} className={!neighborhood ? "connects-filter-placeholder" : undefined} value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} aria-controls={`${id}-results`}>
            <option value="">Bairro</option>
            {options.neighborhoods.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <Image src="/images/identidade/seta.svg" alt="" width={25} height={20} unoptimized />
        </div>
      </form>
      <div className={hasFilters ? "connects-results-summary" : "sr-only"}>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {results.length} {results.length === 1 ? "connect encontrado" : "connects encontrados"}
        </p>
        {hasFilters && <button type="button" className="connects-clear" onClick={clearFilters}>Limpar filtros</button>}
      </div>
      <div id={`${id}-results`} className="connects-grid">
        {results.length ? results.map((document) => <ConnectCard key={document.slug} document={document} />) : (
          <p className="connects-empty">
            {documents.length ? "Nenhum connect encontrado. Tente outra busca ou limpe os filtros." : "Nenhum connect cadastrado ainda."}
          </p>
        )}
      </div>
    </div>
  );
}
